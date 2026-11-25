import type { PhpNode, PhpRuleMatcher, ScanMatch, ScanRule } from '../schema.ts';
import {
  calledFunctionName,
  calledMethodName,
  enclosingFunction,
  lineOf,
  nameText,
  shortName,
  stringValue,
  walk,
} from '../scanners/php.ts';
import { GUIDE_IDS, PENDING_GUIDE_HASH } from './guide-ids.ts';

/** Functions whose return value is safe markup or plain text. */
const SAFE_FUNCTIONS = new Set([
  't',
  'check_markup',
  'count',
  'intval',
  'floatval',
  'number_format',
  'format_plural',
]);

/** Methods whose return value is safe markup (translation, escaping, rendering). */
const SAFE_METHODS = new Set([
  't',
  'formatPlural',
  'translate',
  'escape',
  'filter',
  'filterAdmin',
  'render',
  'renderInIsolation',
  'renderPlain',
  'renderRoot',
  'toString', // Link::toString(), Url::toString() produce escaped output / URLs
  'toRenderable',
  'format', // date.formatter
  'formatInterval',
  'formatDiff',
  'id',
  'count',
]);

/** Static class calls that sanitize: Html::escape(), Xss::filter(), Markup is NOT here. */
const SAFE_STATIC_CLASSES = new Set(['Html', 'Xss', 'PlainTextOutput', 'ByteSizeMarkup', 'FormattableMarkup', 'TranslatableMarkup', 'PluralTranslatableMarkup', 'Number']);

/** Methods that return user-controlled text. */
const TAINTED_METHODS = new Set([
  'label',
  'getTitle',
  'getDisplayName',
  'getAccountName',
  'getEmail',
  'getValue',
  'getValues',
  'getUserInput',
  'getString',
  'get',
  'getParameter',
  'getQueryString',
  'getContent',
]);

/**
 * `tainted`: the value comes from entity data, form state or request input.
 * `composite`: markup is built around the value (concatenation,
 * interpolation, sprintf, Markup::create, t() concatenation). A bare
 * variable of unknown origin is neither, and is not reported.
 */
type Verdict =
  | { readonly unsafe: true; readonly reason: string; readonly tainted: boolean; readonly composite: boolean }
  | { readonly unsafe: false };
const SAFE: Verdict = { unsafe: false };

function untraced(reason: string): Verdict {
  return { unsafe: true, reason, tainted: false, composite: false };
}
function taint(reason: string): Verdict {
  return { unsafe: true, reason, tainted: true, composite: false };
}
function wrap(v: Verdict, reason: string, composite: boolean): Verdict {
  return v.unsafe ? { unsafe: true, reason, tainted: v.tainted, composite: v.composite || composite } : SAFE;
}

interface Analysis {
  readonly assignments: ReadonlyMap<string, readonly PhpNode[]>;
  readonly params: ReadonlySet<string>;
}

function analyseFunction(fn: PhpNode | null): Analysis {
  const assignments = new Map<string, PhpNode[]>();
  const params = new Set<string>();
  if (!fn) return { assignments, params };
  for (const p of (fn.arguments as readonly PhpNode[] | undefined) ?? []) {
    const n = nameText(p.name);
    if (n) params.add(n);
  }
  walk(fn, (node) => {
    if (node !== fn && (node.kind === 'closure' || node.kind === 'function' || node.kind === 'method')) return false;
    if (node.kind === 'assign') {
      const left = node.left as PhpNode;
      if (left.kind === 'variable' && typeof left.name === 'string') {
        const list = assignments.get(left.name) ?? [];
        // `.=` appends: both the old value and the right side matter.
        list.push(node.right as PhpNode);
        assignments.set(left.name, list);
      }
    }
  });
  return { assignments, params };
}

function classify(expr: PhpNode | null | undefined, analysis: Analysis, depth = 0): Verdict {
  if (!expr || depth > 6) return SAFE;
  switch (expr.kind) {
    case 'string':
    case 'nowdoc':
    case 'number':
    case 'boolean':
    case 'nullkeyword':
    case 'magic':
      return SAFE;
    case 'cast':
      return ['int', 'float', 'bool'].includes(String(expr.type)) ? SAFE : classify(expr.expr as PhpNode, analysis, depth + 1);
    case 'encapsed': {
      for (const part of (expr.value as readonly PhpNode[]) ?? []) {
        const inner = part.kind === 'encapsedpart' ? (part.expression as PhpNode) : part;
        const v = classify(inner, analysis, depth + 1);
        if (v.unsafe) return wrap(v, v.reason, true);
      }
      return SAFE;
    }
    case 'bin': {
      if (expr.type !== '.' && expr.type !== '??') return SAFE;
      const l = classify(expr.left as PhpNode, analysis, depth + 1);
      const r = l.unsafe ? l : classify(expr.right as PhpNode, analysis, depth + 1);
      return wrap(r, r.unsafe ? r.reason : '', expr.type === '.');
    }
    case 'retif': {
      const t = classify((expr.trueExpr as PhpNode) ?? (expr.test as PhpNode), analysis, depth + 1);
      return t.unsafe ? t : classify(expr.falseExpr as PhpNode, analysis, depth + 1);
    }
    case 'variable': {
      const name = typeof expr.name === 'string' ? expr.name : null;
      if (!name) return untraced('a variable variable');
      if (name === 'this') return SAFE;
      const assigned = analysis.assignments.get(name);
      if (assigned && assigned.length > 0 && !analysis.params.has(name)) {
        for (const a of assigned) {
          const v = classify(a, analysis, depth + 1);
          if (v.unsafe) return wrap(v, `$${name}, which holds ${v.reason}`, false);
        }
        return SAFE;
      }
      return untraced(`$${name}`);
    }
    case 'offsetlookup': {
      const base = expr.what as PhpNode;
      const baseName = base.kind === 'variable' ? String(base.name) : null;
      if (baseName && ['_GET', '_POST', '_REQUEST', '_COOKIE', '_SERVER'].includes(baseName)) return taint(`$${baseName}[]`);
      // $element['#prefix'], $form['#id']: render-array properties set by code.
      if ((stringValue(expr.offset) ?? '').startsWith('#')) return SAFE;
      const v = classify(base, analysis, depth + 1);
      return wrap(v, v.unsafe ? `an element of ${v.reason}` : '', false);
    }
    case 'propertylookup':
    case 'nullsafepropertylookup': {
      // $entity->field->value, $node->title->value, $item->value
      const prop = nameText(expr.offset);
      if (prop === 'value' || prop === 'title' || prop === 'name' || prop === 'body') return taint(`the ->${prop} property`);
      return SAFE;
    }
    case 'call': {
      const fn = calledFunctionName(expr)?.toLowerCase();
      const args = (expr.arguments as readonly PhpNode[] | undefined) ?? [];
      if (fn) {
        if (fn === 't') return classifyTranslatable(args[0], analysis, depth);
        if (SAFE_FUNCTIONS.has(fn)) return SAFE;
        if (['sprintf', 'implode', 'join', 'str_replace', 'strtr', 'trim', 'ucfirst', 'strtoupper', 'strtolower', 'substr', 'nl2br', 'strip_tags'].includes(fn)) {
          for (const a of args) {
            const v = classify(a, analysis, depth + 1);
            if (v.unsafe) return wrap(v, `${fn}() of ${v.reason}`, ['sprintf', 'implode', 'join', 'str_replace', 'strtr'].includes(fn));
          }
          return SAFE;
        }
        return SAFE; // Unknown function: not enough evidence.
      }
      const method = calledMethodName(expr);
      const what = expr.what as PhpNode;
      if (what.kind === 'staticlookup') {
        const cls = shortName(nameText(what.what));
        if (cls === 'Markup' && method === 'create') {
          const v = classify(args[0], analysis, depth + 1);
          return wrap(v, v.unsafe ? `Markup::create() of ${v.reason}, which marks it safe without escaping` : '', true);
        }
        if (cls && SAFE_STATIC_CLASSES.has(cls)) return SAFE;
        return SAFE;
      }
      if (method === 't' || method === 'translate') return classifyTranslatable(args[0], analysis, depth);
      if (method && SAFE_METHODS.has(method)) return SAFE;
      if (method && TAINTED_METHODS.has(method)) return taint(`->${method}()`);
      return SAFE;
    }
    case 'new': {
      const cls = shortName(nameText(expr.what));
      if (cls === 'TranslatableMarkup' || cls === 'FormattableMarkup') {
        return classifyTranslatable(((expr.arguments as readonly PhpNode[]) ?? [])[0], analysis, depth);
      }
      return SAFE;
    }
    default:
      return SAFE;
  }
}

/** t('Hello @name', [...]) is safe; t("Hello $name") or t('Hi ' . $name) is not. */
function classifyTranslatable(first: PhpNode | undefined, analysis: Analysis, depth: number): Verdict {
  if (!first || stringValue(first) !== null) return SAFE;
  const v = classify(first, analysis, depth + 1);
  return wrap(v, v.unsafe ? `a translatable string built from ${v.reason} instead of a @placeholder` : '', true);
}

const MARKUP_KEYS = new Set(['#markup', '#prefix', '#suffix']);

const matcher: PhpRuleMatcher = {
  kind: 'php',
  fastTokens: ['#markup', '#prefix', '#suffix'],
  matchFile(program): ScanMatch[] {
    const matches: ScanMatch[] = [];
    const cache = new Map<PhpNode | null, Analysis>();
    const analysisFor = (ancestors: readonly PhpNode[]): Analysis => {
      const fn = enclosingFunction(ancestors);
      let a = cache.get(fn);
      if (!a) {
        a = analyseFunction(fn);
        cache.set(fn, a);
      }
      return a;
    };
    const report = (key: string, value: PhpNode, ancestors: readonly PhpNode[], at: PhpNode): void => {
      const verdict = classify(value, analysisFor(ancestors));
      if (!verdict.unsafe || (!verdict.tainted && !verdict.composite)) return;
      matches.push({
        line: lineOf(at),
        subPattern: key.slice(1),
        message: `${key} is built from ${verdict.reason}; #markup is only filtered with Xss::filterAdmin(), so pass untrusted text through #plain_text, a t() @placeholder, or an inline_template with {{ variables }} instead.`,
      });
    };
    walk(program, (node, ancestors) => {
      // ['#markup' => $value]
      if (node.kind === 'entry') {
        const key = stringValue(node.key);
        if (key && MARKUP_KEYS.has(key)) report(key, node.value as PhpNode, ancestors, node);
      }
      // $build['#markup'] = $value;  $build['x']['#markup'] .= $value;
      if (node.kind === 'assign') {
        const left = node.left as PhpNode;
        if (left.kind === 'offsetlookup') {
          const key = stringValue(left.offset);
          if (key && MARKUP_KEYS.has(key)) report(key, node.right as PhpNode, ancestors, node);
        }
      }
    });
    return matches;
  },
};

export const markupUnsanitizedVariableRule: ScanRule = {
  id: 'markup-with-unsanitized-variable',
  guideId: GUIDE_IDS.renderArrayXss,
  guideHash: PENDING_GUIDE_HASH,
  summary:
    '#markup, #prefix or #suffix built by concatenating or interpolating variables, entity values or request input instead of #plain_text, t() placeholders or Twig.',
  matcher,
  verifierRubric: {
    keepWhen: [
      "A render array's #markup, #prefix or #suffix is a concatenation, interpolated string, sprintf() or Markup::create() that includes a variable, a function parameter, entity field values (->label(), ->getTitle(), ->value), form state values or request input.",
      'The interpolated value can contain user-entered text, so the admin XSS filter applied to #markup still lets through markup and attributes the author did not intend.',
      "A t() / TranslatableMarkup string is built by concatenation or \"$var\" interpolation instead of an @placeholder.",
    ],
    dropWhen: [
      'Every variable in the expression is a constant, an integer, an ID, or a value already escaped with Html::escape(), produced by t() with placeholders, or rendered by the renderer service.',
      'The variable holds markup the module built itself from trusted pieces (for example the output of $renderer->render() assigned in another method) and no user input reaches it.',
      'The value is static HTML from the code (a wrapper div, an icon) with no variable parts.',
    ],
  },
};

export default [markupUnsanitizedVariableRule];
