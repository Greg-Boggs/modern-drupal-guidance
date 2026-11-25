import { Node, SyntaxKind, type CallExpression, type Expression } from 'ts-morph';
import type {
  JsRuleMatcher,
  PhpRuleMatcher,
  ScanMatch,
  ScanRule,
  TwigRuleMatcher,
  VerifierRubric,
  YamlRuleMatcher,
} from '../schema.ts';
import { lineOf, walk } from '../scanners/php.ts';
import { GUIDE_IDS, PENDING_GUIDE_HASH } from './guide-ids.ts';

/** core/jquery.once: deprecated in 9.3, removed in 10.0 (data/drupal/deprecations.json). */
export const JQUERY_ONCE_LIBRARY = 'core/jquery.once';

const LIBRARY_MESSAGE =
  "core/jquery.once was removed in Drupal 10.0; depend on core/once and call once('id', selector, context) in a Drupal behavior.";

// ---------------------------------------------------------------------------
// JS: $(...).once(), .removeOnce(), .findOnce(), jQuery.once()
// ---------------------------------------------------------------------------

const JQUERY_IDENTIFIERS = new Set(['$', 'jQuery']);

/** Walks a call/property chain down to its root expression. */
function chainRoot(expr: Expression): Expression {
  let current: Expression = expr;
  for (;;) {
    if (Node.isCallExpression(current)) current = current.getExpression();
    else if (Node.isPropertyAccessExpression(current)) current = current.getExpression();
    else if (Node.isElementAccessExpression(current)) current = current.getExpression();
    else if (Node.isParenthesizedExpression(current)) current = current.getExpression();
    else return current;
  }
}

function isJqueryChain(receiver: Expression): boolean {
  const root = chainRoot(receiver);
  return Node.isIdentifier(root) && JQUERY_IDENTIFIERS.has(root.getText());
}

function jqueryOnceCall(call: CallExpression): string | null {
  const callee = call.getExpression();
  if (!Node.isPropertyAccessExpression(callee)) return null;
  const method = callee.getName();
  if (method === 'removeOnce' || method === 'findOnce') return method;
  if (method !== 'once') return null;
  const receiver = callee.getExpression();
  // jQuery.once(...) / $.once(...)
  if (Node.isIdentifier(receiver) && JQUERY_IDENTIFIERS.has(receiver.getText())) return 'once';
  // $(selector).once(...), $(context).find(x).once(...)
  if (isJqueryChain(receiver)) return 'once';
  // Unknown receiver: jQuery Once takes an optional id and no callback;
  // EventEmitter#once / Socket#once take (event, listener).
  const args = call.getArguments();
  if (args.length === 0) return 'once';
  if (args.length === 1 && Node.isStringLiteral(args[0])) return 'once';
  return null;
}

const jsMatcher: JsRuleMatcher = {
  kind: 'js',
  fastTokens: ['.once(', '.removeOnce(', '.findOnce('],
  matchFile(sourceFile): ScanMatch[] {
    const matches: ScanMatch[] = [];
    for (const call of sourceFile.getDescendantsOfKind(SyntaxKind.CallExpression)) {
      const method = jqueryOnceCall(call);
      if (!method) continue;
      const callee = call.getExpression();
      const nameNode = Node.isPropertyAccessExpression(callee) ? callee.getNameNode() : callee;
      const replacement = method === 'once' ? "once('id', elements, context)" : method === 'removeOnce' ? "once.remove('id', elements)" : "once.find('id', context)";
      matches.push({
        line: nameNode.getStartLineNumber(),
        subPattern: `jquery-${method}`,
        message: `jQuery Once .${method}() comes from the removed core/jquery.once library; use the core/once API: ${replacement}, which returns plain DOM elements.`,
      });
    }
    return matches;
  },
};

// ---------------------------------------------------------------------------
// YAML: core/jquery.once in *.libraries.yml and *.info.yml
// ---------------------------------------------------------------------------

const yamlMatcher: YamlRuleMatcher = {
  kind: 'yaml',
  fileSuffixes: ['.libraries.yml', '.info.yml'],
  fastTokens: ['jquery.once'],
  matchDocument(doc): ScanMatch[] {
    return doc
      .scalars()
      .filter((s) => s.value === JQUERY_ONCE_LIBRARY)
      .map((s) => ({ line: s.line, subPattern: String(s.path[1] ?? s.path[0] ?? 'library'), message: LIBRARY_MESSAGE }));
  },
};

// ---------------------------------------------------------------------------
// Twig: attach_library('core/jquery.once')
// ---------------------------------------------------------------------------

const twigMatcher: TwigRuleMatcher = {
  kind: 'twig',
  fastTokens: ['jquery.once'],
  matchFile(template): ScanMatch[] {
    const re = /attach_library\s*\(\s*(['"])core\/jquery\.once\1\s*\)/;
    return template.tags
      .filter((t) => t.type !== 'comment' && re.test(t.inner))
      .map((t) => ({ line: t.line, subPattern: 'attach_library', message: LIBRARY_MESSAGE }));
  },
};

// ---------------------------------------------------------------------------
// PHP: '#attached' => ['library' => ['core/jquery.once']]
// ---------------------------------------------------------------------------

const phpMatcher: PhpRuleMatcher = {
  kind: 'php',
  fastTokens: ['jquery.once'],
  matchFile(program): ScanMatch[] {
    const matches: ScanMatch[] = [];
    walk(program, (node) => {
      if (node.kind === 'string' && node.value === JQUERY_ONCE_LIBRARY) {
        matches.push({ line: lineOf(node), subPattern: 'attached-library', message: LIBRARY_MESSAGE });
      }
    });
    return matches;
  },
};

const libraryRubric: VerifierRubric = {
  keepWhen: [
    'A library definition, #attached array or attach_library() call depends on core/jquery.once.',
    'The extension runs on Drupal 10 or later, where the library no longer exists and the dependency breaks the library.',
  ],
  dropWhen: [
    'The reference is inside a version check or a libraries-override that removes or replaces core/jquery.once for an older site.',
    'The extension still supports Drupal 9 only and the guide says to keep the dependency until it drops 9.x.',
    'The string is documentation or a test asserting the library is gone.',
  ],
};

export const jqueryOnceJsRule: ScanRule = {
  id: 'jquery-once-js',
  guideId: GUIDE_IDS.once,
  guideHash: PENDING_GUIDE_HASH,
  summary:
    "jQuery Once calls ($(el).once('id'), .removeOnce(), .findOnce()) should use the core/once API inside Drupal behaviors.",
  matcher: jsMatcher,
  verifierRubric: {
    keepWhen: [
      "A jQuery collection calls .once('id'), .once(), .removeOnce('id') or .findOnce('id'), usually inside Drupal.behaviors.*.attach.",
      'The code is Drupal front-end JavaScript that runs on Drupal 10 or later, where core/jquery.once was removed.',
    ],
    dropWhen: [
      "The call is EventEmitter-style .once('event', handler) on a Node stream, socket, emitter, Backbone or similar object, not jQuery.",
      "The code already calls the core/once function directly: once('id', selector, context), once.remove(), once.find().",
      'The file is a vendored copy of jQuery Once itself or a third-party library.',
    ],
  },
};

export const jqueryOnceLibraryYamlRule: ScanRule = {
  id: 'jquery-once-library-yaml',
  guideId: GUIDE_IDS.once,
  guideHash: PENDING_GUIDE_HASH,
  summary: 'Library definitions that depend on core/jquery.once, removed in Drupal 10.0; depend on core/once.',
  matcher: yamlMatcher,
  verifierRubric: libraryRubric,
};

export const jqueryOnceLibraryTwigRule: ScanRule = {
  id: 'jquery-once-library-twig',
  guideId: GUIDE_IDS.once,
  guideHash: PENDING_GUIDE_HASH,
  summary: "Templates that call attach_library('core/jquery.once'), removed in Drupal 10.0; attach a library that depends on core/once.",
  matcher: twigMatcher,
  verifierRubric: libraryRubric,
};

export const jqueryOnceLibraryPhpRule: ScanRule = {
  id: 'jquery-once-library-php',
  guideId: GUIDE_IDS.once,
  guideHash: PENDING_GUIDE_HASH,
  summary: "Render arrays that attach core/jquery.once, removed in Drupal 10.0; attach a library that depends on core/once.",
  matcher: phpMatcher,
  verifierRubric: libraryRubric,
};

export default [jqueryOnceJsRule, jqueryOnceLibraryYamlRule, jqueryOnceLibraryTwigRule, jqueryOnceLibraryPhpRule];
