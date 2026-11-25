/**
 * Rule schema for the Drupal legacy-scan rules.
 *
 * Part A is copied from upstream `src/legacy-scan/schema.ts`
 * (GoogleChrome/modern-web-guidance-src) with the same field names and
 * semantics. On integration into `engine/src/legacy-scan`, delete Part A and
 * import these types from the engine's `schema.ts` instead.
 *
 * Part B adds three matcher kinds the upstream engine does not have: `php`,
 * `twig` and `yaml`. Integration adds them to the engine's `RuleMatcher`
 * union and dispatches them from `scanFiles()`. See DESIGN.md, "Integration".
 */
import type { SourceFile } from 'ts-morph';

// ---------------------------------------------------------------------------
// Part A: upstream types (verbatim subset)
// ---------------------------------------------------------------------------

/**
 * Pairing of unambiguous keepWhen and dropWhen rules used by the LLM Verifier
 * (or the coding agent at runtime) to filter static matcher candidates.
 */
export interface VerifierRubric {
  readonly keepWhen: readonly string[];
  readonly dropWhen: readonly string[];
}

export interface ScanMatch {
  readonly line: number;
  readonly column?: number;
  readonly message: string;
  readonly isVendoredLibrary?: boolean;
  readonly subPattern?: string;
}

/**
 * Fast substring pre-filter evaluated before parsing:
 * - `readonly string[]`: at least ONE token must appear (`t1 OR t2`)
 * - `readonly (readonly string[])[]`: EVERY inner group must have >=1 match
 */
export type FastTokenSpec = readonly string[] | readonly (readonly string[])[];

export interface JsMatcherContext {
  readonly filePath: string;
  readonly fileContent: string;
}

export interface JsRuleMatcher {
  readonly kind: 'js';
  readonly fastTokens: FastTokenSpec;
  matchFile(sourceFile: SourceFile, ctx: JsMatcherContext): ScanMatch[];
}

export interface ScanFinding {
  readonly cardId: string;
  readonly ruleId: string;
  readonly guideId: string;
  readonly guideHash: string;
  readonly repo: string;
  readonly commit: string;
  readonly file: string;
  readonly line: number;
  readonly message: string;
  readonly codeSnippet: string;
  readonly contextSlice: string;
  readonly lineContent?: string;
  readonly isVendoredLibrary?: boolean;
  readonly subPattern?: string;
}

// ---------------------------------------------------------------------------
// Part B: Drupal matcher kinds
// ---------------------------------------------------------------------------

/** Kind of Drupal extension a file belongs to, inferred from its file name. */
export type DrupalExtensionFileKind =
  | 'module' // .module
  | 'theme' // .theme
  | 'profile' // .profile
  | 'install' // .install
  | 'inc' // .inc (e.g. mymodule.views.inc, mymodule.tokens.inc)
  | 'class' // .php
  | 'other';

export interface DrupalFileContext {
  readonly filePath: string;
  readonly fileContent: string;
  /**
   * Machine name of the extension the file belongs to, taken from the file
   * name prefix (`foo.module`, `foo.views.inc`, `foo.info.yml` -> `foo`).
   * Null for class files and anything without a Drupal prefix convention.
   */
  readonly extensionName: string | null;
  readonly fileKind: DrupalExtensionFileKind;
}

/**
 * Loose view of a `php-parser` (glayzzle) AST node. Parsed with
 * `{ php8: true, extractDoc: true, suppressErrors: true }` and
 * `{ withPositions: true }`.
 */
export interface PhpNode {
  readonly kind: string;
  readonly loc?: { readonly start: { readonly line: number; readonly column: number; readonly offset: number }; readonly end: { readonly line: number; readonly column: number; readonly offset: number } } | null;
  readonly leadingComments?: readonly PhpNode[];
  // php-parser nodes carry kind-specific fields; rules narrow on `kind`.
  readonly [field: string]: unknown;
}

export interface PhpMatcherContext extends DrupalFileContext {}

export interface PhpRuleMatcher {
  readonly kind: 'php';
  readonly fastTokens: FastTokenSpec;
  matchFile(program: PhpNode, ctx: PhpMatcherContext): ScanMatch[];
}

/** One `{{ }}`, `{% %}` or `{# #}` tag in a Twig template. */
export interface TwigTag {
  readonly type: 'output' | 'block' | 'comment';
  /** Text between the delimiters, whitespace-control dashes removed. */
  readonly inner: string;
  /** 1-based line of the opening delimiter. */
  readonly line: number;
  /** Offset of the opening delimiter in the file. */
  readonly offset: number;
}

export interface TwigTemplateView {
  readonly text: string;
  readonly tags: readonly TwigTag[];
  /** 1-based line of a file offset. */
  lineAt(offset: number): number;
}

export interface TwigMatcherContext extends DrupalFileContext {}

export interface TwigRuleMatcher {
  readonly kind: 'twig';
  readonly fastTokens: FastTokenSpec;
  matchFile(template: TwigTemplateView, ctx: TwigMatcherContext): ScanMatch[];
}

export type YamlPath = readonly (string | number)[];

export interface YamlDocumentView {
  /** Plain JS value of the document (`yaml` package `toJS()`), or null if empty. */
  readonly data: unknown;
  /** 1-based line of the value at `path`, or null when absent. */
  lineOf(path: YamlPath): number | null;
  /** 1-based line of the key at `path`, or null when absent. */
  keyLineOf(path: YamlPath): number | null;
  /** Every scalar in the document with its path and line. */
  scalars(): readonly { readonly path: YamlPath; readonly value: unknown; readonly line: number }[];
}

export interface YamlMatcherContext extends DrupalFileContext {}

export interface YamlRuleMatcher {
  readonly kind: 'yaml';
  /** File name suffixes this matcher reads, e.g. `['.info.yml']`. */
  readonly fileSuffixes: readonly string[];
  readonly fastTokens?: FastTokenSpec;
  matchDocument(doc: YamlDocumentView, ctx: YamlMatcherContext): ScanMatch[];
}

export type DrupalRuleMatcher = JsRuleMatcher | PhpRuleMatcher | TwigRuleMatcher | YamlRuleMatcher;

/**
 * Same contract as upstream `ScanRule`, with the matcher union widened to the
 * Drupal kinds.
 */
export interface ScanRule {
  readonly id: string;
  readonly guideId: string;
  readonly guideHash: string;
  readonly summary: string;
  readonly matcher: DrupalRuleMatcher;
  readonly verifierRubric: VerifierRubric;
}
