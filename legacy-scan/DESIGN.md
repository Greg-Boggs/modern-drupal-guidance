# Drupal legacy-scan: design

This directory holds the Drupal rule set for `legacy-scan` and a standalone runner for it. The rules use upstream's `ScanRule` contract (`id`, `guideId`, `guideHash`, `summary`, `matcher`, `verifierRubric` with `keepWhen` / `dropWhen`), so wave 2 can move them into `engine/src/legacy-scan` with a small amount of glue. Upstream here means `src/legacy-scan` in GoogleChrome/modern-web-guidance-src.

## Recommendation in one paragraph

Match patterns directly with parsers that run in Node. Do not wrap drupal-rector, phpstan-drupal or upgrade_status by default. Those tools need PHP, Composer and an installed Drupal codebase, and upgrade_status also needs a running site. They only report deprecations visible to the installed core version. Upstream's contract is a fast, zero-setup static matcher that agents run with `npx`, and about half of these rules are not deprecations at all. The rubric and the guide fill the gaps a pattern matcher leaves. The tools are still worth using: guides should tell agents to run drupal-rector for mechanical fixes, and an optional PHPStan adapter can come later (see "Wrapping existing tools").

## File types and how each is parsed

| Format | Files | Engine | Parser | Why this parser |
|---|---|---|---|---|
| PHP | `.php`, `.module`, `.inc`, `.install`, `.theme`, `.profile`, `.engine` | `php` | [`php-parser`](https://github.com/glayzzle/php-parser) 3.x, PHP 8 mode, with doc comments and positions | Pure JavaScript, no PHP runtime and no native build, so it meets upstream's format bar ("parsers we already ship" or equally cheap). It parses PHP 8 attributes (`#[Hook]`, `#[Block]`) and attaches docblocks to declarations, which annotation detection needs. It also parsed Drupal 7 core (263 files) with no errors. |
| Twig | `.twig` | `twig` | A small tag tokenizer (`scanners/twig.ts`) that splits `{{ }}`, `{% %}` and `{# #}`, skips quoted strings and `{% verbatim %}`, and keeps lines | The one Twig rule only needs to look inside tags, and comments must never match. A full Twig AST would mean a new dependency (twig.js) for one rule. Upstream marks `.twig` as `unsupported`, so this adds a format. |
| YAML | `.yml`, `.yaml`; each matcher lists the suffixes it reads (`.info.yml`, `.libraries.yml`) | `yaml` | [`yaml`](https://eemeli.org/yaml/) 2.x `parseDocument` with a `LineCounter` | Gives both plain data (`toJS()`) and the source line of any key or value. Drupal YAML is plain YAML 1.2. |
| JavaScript | `.js`, `.mjs`, `.cjs`, `.ts` (not `.min.js`) | `js` | `ts-morph`, same as upstream | The JS rules are plain upstream `JsRuleMatcher`s, so on integration the engine's own JS scanner runs them unchanged. |

The scanner does not read `composer.json`, CSS or HTML. A later dependency rule could flag old `drupal/core` constraints in `composer.json`. The runner skips `vendor/`, `node_modules/`, `core/`, `contrib/`, `libraries/`, `files/`, build output and VCS directories. The `core/` match is case-sensitive, so a `src/Core/` namespace is still scanned. `tests/`, `docs/`, `examples/` and `fixtures/` are skipped unless you pass `--include-docs-and-tests`, as upstream does.

### Per-file context

Every matcher gets the file path, its content, a `fileKind` (`module`, `theme`, `profile`, `install`, `inc`, `class`, `other`) and an `extensionName` taken from the file name prefix: `foo.module`, `foo.views.inc` and `foo.info.yml` all give `foo`. This keeps upstream's one-file-at-a-time model. The cost is that a rule cannot read the extension's `core_version_requirement` while it looks at a `.module` file. Version-dependent decisions, such as whether OOP hooks are available yet, go into the rubric for the coding agent to check.

## Wrapping existing tools versus matching directly

| | Direct matchers (chosen) | Wrap drupal-rector / phpstan-drupal / upgrade_status |
|---|---|---|
| Setup | `npx`, Node only. Works on a lone module checkout. | PHP 8.x, Composer, the tools installed in the project, a full Drupal codebase with autoloading. upgrade_status also needs an installed site and a database. |
| Speed | 4,835 contrib files in about 6 s. | phpstan-drupal on a site takes minutes and needs memory tuning. |
| Version independence | Rules state the replacement whatever core is installed. A Drupal 10 site still learns what Drupal 11 removed. | Deprecation reports only cover what the *installed* core marks `@deprecated`. |
| Coverage of this rule set | Covers all of it. | Covers removed functions, `db_*`, `jquery.once` and some annotations. It does not cover OOP hooks before they are deprecated, cache metadata, `#markup` XSS or `core_version_requirement` ranges. phpstan-drupal does have a `\Drupal` calls in classes rule. |
| Guide mapping and rubric | Built in: every rule names a `guideId` and carries `keepWhen`/`dropWhen`. | Would mean parsing free-text messages and mapping them to guides, which breaks when the tools change their wording. |
| Precision | Syntax only, no types: `$x->load()` could be any object. | Type-aware, with exact resolution of classes and methods. |
| Fixes | None: the agent edits the code, guided by the guide. | drupal-rector rewrites the code automatically. |

So, in order of priority:

1. Ship the direct matchers as the default (this directory).
2. Make the removed-function tables data-driven. `rules/removed-apis.ts` and `rules/database-api.ts` already take their `removedIn` versions from `data/drupal/deprecations.json` (1,823 entries). In wave 2 they can be generated from it, filtered by `type: function` and `priority`.
3. Later, add an optional adapter: when `vendor/bin/phpstan` and phpstan-drupal are present and the user passes a flag such as `--with-phpstan`, run it with `--error-format=json` and map each deprecation message to a guide through the deprecation symbol in `data/drupal/deprecations.json`. Keep it out of the default path.
4. Have guides recommend drupal-rector (`vendor/bin/rector process`) for mechanical rewrites, and this scanner for what it cannot fix.

## Rule schema and integration glue

`schema.ts` has two parts. Part A is a verbatim copy of upstream types (`VerifierRubric`, `ScanMatch`, `FastTokenSpec`, `JsRuleMatcher`, `ScanFinding`). Part B adds three matcher kinds:

```ts
interface PhpRuleMatcher  { kind: 'php';  fastTokens; matchFile(program: PhpNode, ctx): ScanMatch[] }
interface TwigRuleMatcher { kind: 'twig'; fastTokens; matchFile(template: TwigTemplateView, ctx): ScanMatch[] }
interface YamlRuleMatcher { kind: 'yaml'; fileSuffixes; fastTokens?; matchDocument(doc: YamlDocumentView, ctx): ScanMatch[] }
```

`fastTokens` has upstream semantics: a cheap substring filter that runs before any parsing, so most files are never parsed for most rules.

To integrate into `engine/src/legacy-scan` (wave 2):

1. Delete Part A of `schema.ts` and import those types from the engine. Add the three Part B interfaces to the engine's `schema.ts` and to its `RuleMatcher` union.
2. Copy `scanners/php.ts`, `twig.ts`, `yaml.ts` and `fast-tokens.ts` (or use the engine's `matchesFastTokens`) into `engine/src/legacy-scan/scanners/`. Copy `rules/` as it is.
3. In `scanners/format-registry.ts`, add engines `php`, `twig` and `yaml`, add a `drupal-php` entry for the PHP extensions above, move `.twig` out of `server-templates` into a supported `twig` entry, and add a `yaml` entry. Upstream treats `.php` as markup (Blade) with the `dom`/`js`/`css` engines. With the web guides deleted, `.php` should go to the `php` engine only.
4. In `scanners/index.ts` `scanFiles()`, dispatch `php`/`twig`/`yaml` rules to `scanPhpSource`/`scanTwigSource`/`scanYamlSource`, and record parse errors as visible skips (format-support.md, guarantee 4). Findings are built with the engine's existing `materializeFinding()`, so card IDs and context slices stay identical.
5. In `scanners/file-filter.ts`, add the Drupal non-project directories (`core`, `contrib`, `libraries`, `files`), matched case-sensitively.
6. Add `php-parser` and `yaml` to the engine's dependencies.
7. Register `RULE_MODULES` from `rules/index.ts` in the experimental tier, not `QUALIFIED_RULES`. None of these rules has been through held-out qualification yet.
8. Replace `PENDING_GUIDE_HASH` with `computeGuideHash()` over each guide's `guide.md`, and check each rule's `guideId` against the guides' `replaces` frontmatter (CONTRIBUTING.md says the scanner uses it for that).
9. The JSON output is upstream's `ScanJsonOutput` plus one optional field, `parseErrors`. The retrieve command reads `npx modern-drupal-guidance retrieve <id>`.

The standalone runner (`cli.ts`, `scanners/index.ts`, `scanners/repo.ts`) mirrors upstream's grouping, sorting, `note`, `--guide`, `--max-files` and `--include-docs-and-tests` behaviour, so its output can be diffed against the engine's after integration.

## Rules

Detection and update scope use upstream's Guide Triage axes (`schema.ts#Detection`, `#UpdateScope`).

| Rule id | Guide id | Engine | Detection | Update scope | Matches |
|---|---|---|---|---|---|
| `procedural-hook-implementation` | `oop-hooks` | php | structural-ast | cross-layer-refactor | `<ext>_<hook>()` functions in `.module`/`.theme`/`.profile`/`*.inc` that have an "Implements hook_X()" docblock or a known hook name. Sub-patterns: `module-hook`, `preprocess`, `theme-hook`. Also `hook_requirements()` and `hook_module_implements_alter()` without their `#[Legacy…]` attribute (deprecated in 11.3 and 11.2). Skips the hooks that core requires to stay procedural (list taken from `HookCollectorPass::checkForProceduralOnlyHooks()` in 11.4) and `#[LegacyHook]` shims. |
| `plugin-annotation` | `plugin-attributes` | php | direct-token | local-swap | A class docblock line `@Name(` where `Name` is one of the 56 core annotations that have an attribute class in 11.4. Maps renamed ones (`@MigrateProcessPlugin` to `#[MigrateProcess]`, `@SearchPlugin` to `#[Search]`). Skips classes that already carry the attribute. |
| `drupal-static-call-in-injectable-class` | `dependency-injection` | php | structural-ast | local-swap | `\Drupal::x()` in non-static methods of controllers, forms, DI-capable plugin bases, hook classes, event subscribers, Drush commands, classes in container-factory namespaces, or classes with constructor parameters. Skips entity, field item and typed data classes, tests, `__wakeup`/`__sleep`, `$x ?? \Drupal::…` fallbacks, `@trigger_error` constructor BC blocks, container checks and removed methods. |
| `removed-procedural-function` | `removed-procedural-apis` | php | direct-token | local-swap | Global calls to 57 removed functions (`drupal_set_message`, `entity_load`, `drupal_get_path`, `file_create_url`, `format_size`, `module_load_include`, `watchdog_exception`, `render`, …) and `\Drupal::l/url/entityManager`, each with its replacement and the removal version from `data/drupal/deprecations.json`. Six are labelled as Drupal 7 APIs. Skips method calls, declarations and `function_exists()` guards. |
| `db-procedural-function` | `database-api` | php | direct-token | local-swap | The 42 `db_*()` wrappers removed in 9.0 (`db_installer_object` in 11.0). Gives the `Connection` or `schema()` method to use instead. |
| `jquery-once-js` | `core-once-behaviors` | js | structural-ast | local-swap | `.removeOnce()`, `.findOnce()`, `$.once()`, `.once()` on a `$()`/`jQuery()` chain, and `.once()` or `.once('id')` on any other receiver. Skips `once()` from core/once and EventEmitter `.once(event, handler)`. |
| `jquery-once-library-yaml` | `core-once-behaviors` | yaml | direct-token | local-swap | The scalar `core/jquery.once` in `*.libraries.yml` or `*.info.yml`. |
| `jquery-once-library-twig` | `core-once-behaviors` | twig | direct-token | local-swap | `attach_library('core/jquery.once')` inside a Twig tag, not in a comment. |
| `jquery-once-library-php` | `core-once-behaviors` | php | direct-token | local-swap | The string literal `'core/jquery.once'` in PHP (`#attached`). |
| `core-version-requirement` | `core-version-requirement` | yaml | direct-token | local-swap | Module, theme and profile `.info.yml` files with no `core_version_requirement` (sub-pattern `missing`, or `core-key-only` when only `core: 8.x` is present), a constraint that does not allow the current major (`outdated`, evaluated by a small Composer-constraint parser in `rules/constraint.ts`), or a constraint the parser cannot read (`unparseable`). Exempts `version: VERSION` and `package: Testing`, as `InfoParserDynamic` does. The current major is `CURRENT_CORE_MAJOR` (11). |
| `render-array-without-cache-metadata` | `cache-metadata` | php | needs-verifier | local-swap | Block `build()` methods, and controller methods, that return a render array, read the current user, route, request, entities, config, state or time, and show no `#cache`, `CacheableMetadata`, `addCacheableDependency`, `#lazy_builder` or `getCache*()` override. Route reads are ignored in controllers, because dynamic page cache already varies by route. Controllers that return forms are skipped. |
| `markup-with-unsanitized-variable` | `render-array-xss` | php | needs-verifier | local-swap | `#markup`, `#prefix` or `#suffix` values that carry taint (entity labels and field values, `->getValue()`, request superglobals) or that build markup around untraced variables (concatenation, `"$var"` interpolation, `sprintf`, `Markup::create()`, `t()` built by concatenation). A light per-function dataflow follows `$var = …` assignments. Safe: literals, `t()` with placeholders, `TranslatableMarkup`, `Html::escape`, `Xss::filter`, renderer output, `(int)` casts and `$element['#…']` properties. A bare variable of unknown origin is not reported. |

## Known false-positive risks

- **Hooks.** A module helper with no docblock whose name collides with a known hook name (for example `mymod_node_load()` used as a loader). Callbacks with an "Implements hook_…" docblock copied from elsewhere. Sites still on core before 11.1 (module hooks), 11.2 (`module_implements_alter`) or 11.3 (themes, `hook_requirements`), where the finding is right but the fix is `#[LegacyHook]` plus the OOP method, not a removal. The rule cannot see the info file's constraint.
- **Plugin annotations.** A contrib plugin type whose annotation shares a short name with a core one but whose manager does not read attributes yet. Code that supports core below 10.2/10.3.
- **Dependency injection.** The "class with constructor parameters" and namespace heuristics can include value objects or classes Drupal never builds through the container. Contrib base classes and traits sometimes use `\Drupal::` on purpose, so subclasses do not have to change their constructors. Calls in methods that only run during install or update.
- **Removed functions.** A project or contrib module that defines its own function with a removed name. Bare `render()` and `file_validate()` are the most likely collisions. Drupal 7 code scanned on purpose.
- **db_\*.** Custom functions that reuse a core `db_*` name. Very rare, because the list is exact.
- **jQuery once.** `.once('name')` with a single string argument on a non-jQuery object that has its own `once` method. EventEmitter calls are excluded only when they pass a handler.
- **core_version_requirement.** Maintenance branches that deliberately target an older major. `CURRENT_CORE_MAJOR` is hard-coded to 11. Drupal 12 is in beta (data/drupal), so this value must come from `data/drupal/releases.json` before 12.0 ships. Until then, a module whose constraint is `^11` alone passes even after 12.0 is out. (`LEGACY_SCAN_CURRENT_CORE_MAJOR` overrides it for testing.)
- **Cache metadata.** The highest risk. The matcher looks for regex signals in the method body, so it fires when the data read never reaches the output, such as a config value that only decides a redirect. It also fires when metadata comes from a parent class or a helper method, or when the output is uncacheable anyway. On a 4,835-file contrib set it produced 5 findings, most of them disputable.
- **#markup XSS.** Variables that hold trusted markup assembled in another method, IDs or UUIDs interpolated into HTML comments, `->label()` of admin-only config entities, and `$config->get()` values. On the same contrib set it produced 19 findings, most of them labels or descriptions concatenated into HTML, which `#plain_text` or a placeholder would make safe.

## Calibration so far

These are rule-writing runs only. There is no held-out split yet, so no precision numbers are claimed.

| Corpus | Files | Findings | Parse errors |
|---|---|---|---|
| Custom modules and themes from local Drupal 10.6 and 11.4 site codebases | 1,541 | 267 | 0 |
| Drupal 11.4 contrib modules | 4,835 | 433 | 0 |
| Drupal 7 core `modules/` (parser stress test) | 263 | 3,225 | 0 |

Reviewing these runs led to two fixes. The XSS rule no longer reports bare variables or `$element['#prefix']` self-references, and no longer treats `getName()` or `getDescription()` as taint. The cache rule now skips controllers that return forms. Before the rules go into `QUALIFIED_RULES`, they need upstream's qualification process: a held-out split of Drupal repositories, Detection Eval Judge grading, and precision of at least 90% after the verifier.

## Tests

```bash
npm install
```

```bash
npm test
```

`npm test` compiles with `tsc`, which also typechecks, and runs `node --test` on `dist/`. The Node build on the development machine has no TypeScript type-stripping. On a Node build that has it, the sources also run directly (`node bin/main.ts`). Every rule has a `rules/<module>.test.ts` with true positives and look-alike negatives. `test/fixtures.test.ts` checks that `fixtures/legacy_example` triggers every rule, that `fixtures/modern_example` triggers none, and that the JSON matches upstream's `ScanJsonOutput` key for key.

## Guide ids

| Guide id | Status in `guides/` (2026-11-23) |
|---|---|
| `oop-hooks` | exists |
| `plugin-attributes` | exists |
| `dependency-injection` | exists |
| `cache-metadata` | exists |
| `removed-procedural-apis` | not yet |
| `database-api` | not yet |
| `core-once-behaviors` | not yet (the guides prompt calls the topic "core/once and Drupal behaviors") |
| `core-version-requirement` | not yet |
| `render-array-xss` | not yet |

Rename them in `rules/guide-ids.ts`, the only place they are defined.
