# Contributing guides

This is the authoring spec for everything under `guides/`. It covers what a guide is, the frontmatter schema, how to write the body for a coding agent, how to handle older supported Drupal core versions, the files that sit next to each guide, and the draft stages a guide moves through.

`guide.md` is the only file a coding agent sees at runtime. The search and retrieve commands, the MCP server and the agent skill all serve the built `guide.md` and nothing else. Every other file in a guide directory exists for reviewers and for the eval harness.

## Guide types

There are two kinds of guide.

| Kind | Path | Purpose |
|---|---|---|
| Discipline guide | `guides/<category>/<category>/guide.md` | Orients an agent to a whole category: the mental model, the rules that apply to every task in it, and links to the use-case guides. |
| Use-case guide | `guides/<category>/<slug>/guide.md` | Teaches one task an agent is asked to do, such as "implement a hook" or "add cache tags to a block", completely enough that the agent needs nothing else. |

A guide's slug is unique across all categories, not just within one.

## Categories

Every guide belongs to exactly one category. Pick the category by the developer's task, not by the API it uses. A guide about caching a block's output goes in `caching-and-performance` even though it touches a block plugin.

| Slug | Covers |
|---|---|
| `module-development` | Writing custom modules: info files, hooks, services, plugins, routes, controllers, events and the dependency injection that ties them together. |
| `configuration-and-recipes` | Configuration management, config schema, config entities and Recipes that install and configure features with config actions. |
| `entities-and-fields` | Content and config entity types, bundle classes, base and configurable fields, field types, widgets and formatters, and entity queries. |
| `theming-and-components` | Themes, Twig templates, preprocess logic, asset libraries and Single Directory Components. |
| `front-end-javascript` | JavaScript that runs on Drupal pages: behaviors, `once()`, `drupalSettings`, the AJAX framework and progressive enhancement of server-rendered markup. |
| `form-api` | Building, validating and submitting forms with the Form API, config forms, `#states`, and AJAX-driven forms. |
| `caching-and-performance` | Render caching with cache tags, contexts and max-age, lazy builders and placeholders, cache bins, and page-level performance. |
| `security` | Access control, permissions, output escaping, CSRF protection, safe database queries and handling untrusted input. |
| `testing` | PHPUnit unit, kernel, functional and functional JavaScript tests, test traits, and running tests in CI. |
| `composer-and-tooling` | Composer project structure, managing core and contrib, patches, Drush, static analysis, coding standards and automated upgrades. |
| `migration` | The Migrate API: migration YAML, source, process and destination plugins, and moving content from older Drupal sites or other systems. |
| `headless-and-apis` | Exposing and consuming data over HTTP: JSON:API, REST resources, serialization, authentication and decoupled front ends. |

To add a category, add a row here with one sentence, create its discipline guide, and tell the engine owner so `engine/src/core/categories.ts` gets a title and position.

## File layout

```
guides/<category>/<slug>/
  guide.md          Required. The guidance agents read.
  expectations.md   Required for every published use-case guide. Testable outcomes.
  demo/             Required for every published use-case guide. A working reference extension.
    <machine_name>/ Exactly one module, theme or recipe directory.
```

### `demo/`

Upstream Modern Web Guidance ships a standalone `demo.html` for each guide. A Drupal pattern cannot run in a single file, so each guide ships a reference extension instead:

- **A module** for anything that runs PHP: `demo/mdg_<slug_with_underscores>/` with its `.info.yml` and the rest of the module. Example: `guides/module-development/oop-hooks/demo/mdg_oop_hooks/`.
- **A theme** for theme-only patterns, named the same way.
- **A recipe** for configuration and Recipes guides: `demo/mdg_<slug_with_underscores>/recipe.yml`.

Rules for `demo/`:

- The `mdg_` prefix keeps demo machine names out of the way of real projects.
- It must install (`drush pm:install`) or apply (`drush recipe` or `php core/scripts/drupal recipe`) on a clean site with the `minimal` profile at the lowest core version in the guide's `drupal-core` range and on the current release, with no errors, warnings or deprecation notices.
- It implements every outcome in `expectations.md`, so a reviewer can see each one working.
- It contains no code that the guide does not teach. Extra features make the demo harder to review and invite graders to test things the guide never asked for.
- Keep `core_version_requirement` in the demo's info file equal to the guide's `drupal-core` constraint.

Agents never see the demo. Never write "see the demo" in `guide.md`.

### `expectations.md`

A bulleted list of checks that are true when an agent has implemented `guide.md` correctly. Each bullet becomes one must-pass test in the eval harness, so:

- Write one check per bullet, as a plain statement: "The hook class is in the `Drupal\<module>\Hook` namespace." Drop `MUST`, `DO`, `MANDATORY` and other imperative prefixes; those belong in `guide.md`.
- Make each bullet checkable without human judgment, either statically (PHP AST, YAML, Twig source, file layout) or at runtime (a `drush` command, an HTTP response, a response header, a rendered DOM, a PHPUnit test).
- Pair every negative check ("No `hook_` function remains in the `.module` file") with a positive one ("A method with `#[Hook('form_alter')]` exists"), so an untouched codebase cannot pass.
- Do not turn "prefer" or "optional" advice into a required check. Do not pin example values from snippets, such as a cache max-age of `3600`, unless the guide requires that value.
- Name accepted alternatives where several are valid: "Dependencies arrive through the constructor, either autowired or listed under `arguments` in `services.yml`."
- When the guide has an "Older supported core versions" section, write those checks as separate bullets that name the condition: "On core below 11.1, a procedural implementation marked `#[LegacyHook]` delegates to the hook class."
- Never use site-specific class names, IDs or paths. No links.

Discipline guides do not need `expectations.md`.

## Frontmatter

Every `guide.md` starts with YAML frontmatter. The engine, the site, the MCP server and the legacy scanner all read it.

```yaml
---
name: oop-hooks
description: Implement hooks as autowired class methods with the #[Hook] attribute instead of procedural functions in .module files.
drupal-core: ">=11.1"
replaces:
  - "Procedural hook_*() functions in .module files"
deprecated-apis:
  - api: "hook_module_implements_alter()"
    deprecated-in: "11.2.0"
    removed-in: "12.0.0"
    replacement: "#[Hook(order: ...)], #[ReorderHook]"
requires-modules: []
---
```

| Field | Required | Type | Rules |
|---|---|---|---|
| `name` | Always | string | Equals the directory name. Lowercase, hyphenated. Unique across all categories. |
| `description` | Use-case guides; recommended for discipline guides | string | One sentence in the form "Do the task with the modern approach (instead of the legacy one)". Search ranks on it, so name the task the way a developer would ask for it and name the legacy pattern it replaces. No site-specific class names. |
| `drupal-core` | Always | string, quoted | A Composer constraint for the core versions the guide's main approach works on, such as `">=11.1"` or `"^10.3 \|\| ^11"`. The lower bound is the first core release that ships every API the main approach uses. Verify it (see [Verifying claims](#verifying-claims)). Leave the range open-ended unless an API is removed in a later major. |
| `draft` | No | `stub`, `wip` or `blocked` | Present means the guide is not distributed. See [Draft stages](#draft-stages). |
| `draft-reason` | When `draft: blocked` | string | One line naming what blocks the guide, with the issue or change record URL. |
| `title` | No | string | Only when the H1 cannot carry the title. Prefer an H1. |
| `replaces` | No | list of strings | The legacy patterns, functions, annotations or services this guide steers agents away from, written the way they appear in code (`jQuery.once()`, `@Block annotation`, `\Drupal::service() in a service class`). Search indexes them, so an agent searching for the old API finds the new guide. The legacy scanner uses them to check that its rules point to the right guide. |
| `deprecated-apis` | No | list of maps | Each entry has `api`, `deprecated-in` and `removed-in` (core versions as `X.Y.Z`, exactly as the deprecation message in core says), and an optional `replacement`. Only list deprecations the guide addresses. Wave 2 checks these against `data/drupal/deprecations.json`. |
| `requires-modules` | No | list of strings | Core or contrib modules, beyond `system` and `user`, that the guide's code needs installed, such as `big_pipe` or `jsonapi`. Contrib modules use their project name and a constraint: `"drupal/webform:^6.3"`. |

Discipline guides need only `name` and `drupal-core`. Give them the widest range their advice applies to, usually the oldest supported release onward.

Stubs need `name`, `description`, `drupal-core` and `draft: stub`. A stub's `drupal-core` is still a claim; verify it like any other.

Do not add fields that are not in this table without updating this spec. The engine ignores unknown fields, so a misspelled field fails silently.

## Writing `guide.md` for a coding agent

### What the agent already knows

The agent knows PHP, Symfony basics, Twig syntax, YAML and a great deal of Drupal 7 and 8. Its knowledge of Drupal 10 and 11 is thin and mixed with older patterns. A guide teaches the correction: what to do instead of what the agent would write unprompted, and why.

- Cut what any agent already knows: what a hook is, how a render array nests, PHP syntax.
- Keep what it gets wrong: the attribute instead of the annotation, the constructor instead of `\Drupal::service()`, the cache context it forgets, the `once()` call it writes as `$.once()`.
- Keep conventions that are a choice among valid options, and say which one to pick.

### Body structure

A use-case guide follows this order. Omit a section that has nothing to say, but do not reorder.

1. **H1**: the task, in the developer's words. "Implement hooks with the `#[Hook]` attribute", not "Hooks".
2. **Overview**: two to five sentences: what the pattern is, why it is the right approach today, and which legacy pattern it replaces. Put `{{ DRUPAL_STATUS() }}` on its own line here. If a sibling guide covers a nearby task, say so before the first code block, with `{{ GUIDE_REF("slug") }}`, so an agent that retrieved the wrong guide can switch before it anchors on the wrong code.
3. **Implementation**: numbered steps, `###` per step. Each step gives the file path and complete code for that file or the relevant part of it.
4. **Rules**: a short list of `DO` / `DO NOT` lines for the mistakes agents make most often. Each line says why.
5. **Older supported core versions**: what to write when the project's core is below the guide's lower bound but still supported. See [Older supported core versions](#older-supported-core-versions).
6. **Verify**: commands that prove the code works: `drush` commands, a PHPUnit test to run, a header to look for.

A discipline guide is shorter on code and longer on orientation:

1. **H1**: the category name.
2. **Overview** with `{{ DRUPAL_STATUS() }}`.
3. **Core rules** that apply to every task in the category, each with one line of reasoning.
4. **Legacy patterns to replace**: a table of old pattern, replacement and the guide that covers it.
5. **Use-case guides**: a list of `{{ GUIDE_REF("slug") }}` lines with one sentence each, for published guides only.

### Code

- Every code block names its file in a comment on its first line (`// src/Hook/MyModuleHooks.php`, `# mymodule.services.yml`, `{# templates/... #}`), so the agent knows where the code goes.
- Use a consistent placeholder module name, `mymodule`, and a placeholder theme name, `mytheme`, so agents replace them reliably. Never use real contrib module names as placeholders.
- Code must be complete enough to run: `namespace`, `use` statements, `declare(strict_types=1);` in PHP files, and the class around the method. A snippet missing its `use` lines teaches the agent to guess them.
- Comments explain why, not what. If a value is an example, say so: `// Example value: pick a max-age that matches how often the feed changes.`
- PHP targets the minimum PHP version of the guide's lowest core version: constructor property promotion, `readonly`, typed properties, enums and attributes are all fine from Drupal 10 onward.
- Fence languages: `php`, `yaml`, `twig`, `js`, `json`, `bash`, `diff`.
- Do not paste long boilerplate. Show the method that matters and the class shell around it.

### Tone and formatting

- American English.
- No external links in the body. The agent cannot follow them and should not need to. Put change record links and other sources in `{# ... #}` maintainer comments, which the build strips.
- Use `MANDATORY`, `DO` and `DO NOT` only where breaking the rule breaks the code or opens a security hole. Overused, they stop meaning anything.
- Callouts use GitHub alert syntax: `> [!NOTE]`, `> [!TIP]`, `> [!IMPORTANT]`, `> [!WARNING]`, `> [!CAUTION]`, with the body on the following `>` lines. The validator rejects `> **Note:**`.
- HTML element names in prose go in backticks. The validator rejects raw HTML tags other than `kbd`, `br` and `wbr`.
- Every guide is self-contained. Do not rely on `GUIDE_REF` to supply something the agent needs for this task; inline it, or transclude shared text with `INCLUDE`.

### Twig and engine syntax

The engine's syntax overlaps Twig's:

- `{# ... #}` outside code is a maintainer comment and is stripped from the build. Inside fenced code blocks and inline code it is left alone, so Twig comments in Twig examples are safe.
- `{{ NAME(...) }}` with an uppercase name is a build macro. Twig function calls are lowercase (`{{ include(...) }}`), so they never match. Do not write a Twig example that calls an uppercase function.

### Build macros

| Macro | Use |
|---|---|
| `{{ DRUPAL_STATUS() }}` | Renders the guide's `drupal-core` range and the supported releases inside it. Put it in the overview. |
| `{{ DRUPAL_STATUS(">=11.3") }}` | Renders a different range, for a step or section that needs newer core than the rest of the guide. |
| `{{ GUIDE_REF("slug") }}` | Cross-reference to another published guide. For a guide that is still a draft, park the sentence in `{# PENDING_GUIDE_REF: ... {{ GUIDE_REF("slug") }} ... #}`; validation fails once that guide is published, which reminds you to unwrap it. |
| `{{ INCLUDE("path#section") }}` | Transcludes a file or one section of it, for text shared by several guides. |

Never hard-code a list of supported core releases in prose. Support windows change; `DRUPAL_STATUS` reads them from `data/drupal/` at build time.

## Older supported core versions

The `drupal-core` lower bound says where the main approach starts working. Projects on older supported releases, and contrib modules that support several majors, still need an answer. The "Older supported core versions" section gives it.

- Frame it by version, not by prose like "on older sites": "On core 10.3 to 11.0 ...", with `{{ DRUPAL_STATUS("<constraint>") }}` for the older range when that helps.
- Give the closest equivalent that works on the older release and produces the same result. For example, for OOP hooks: keep the class and add a one-line procedural function marked `#[LegacyHook]` that calls it, so the same code runs on 10.x and 11.1+.
- Say what the agent should do when it cannot tell which core the project uses: read `composer.lock` or `core/lib/Drupal.php` (`Drupal::VERSION`), or for a contrib module, the `core_version_requirement` in its info file.
- Do not cover releases that are no longer supported. If the lowest supported release already has the API, drop the section.
- Do not mix fallback code into the implementation steps. The main steps assume the guide's range.

When an approach changes inside the range (an API is added in 11.3 that improves on the 11.1 approach), teach the newer approach in the main steps only if the range starts at that version. Otherwise teach the approach that works across the whole range and add the newer option as an optional step gated with `{{ DRUPAL_STATUS(">=11.3") }}`.

## Verifying claims

Every API, attribute, class, service ID, hook name, YAML key and version number in a guide must be checked against one of these, in this order:

1. Drupal core source at a release tag (`git.drupalcode.org/project/drupal`, or the `drupal/core` package for that version).
2. A drupal.org change record.
3. api.drupal.org for the matching branch.

Do not infer a version from memory, a blog post or a contrib module. "Introduced in 11.1" means the `11.1.0` tag has it and `11.0.x` does not. Record where you checked in a maintainer comment next to the claim:

```markdown
{# Verified: core/lib/Drupal/Core/Hook/Attribute/Hook.php exists at 11.1.0, not at 11.0.0. CR: https://www.drupal.org/node/3442349 #}
```

If you cannot verify a claim, do not publish it. Either cut it, or keep the guide at `draft: wip` and list the claim in the PR description.

## Draft stages

A guide moves through four stages. The `draft` field records the first three; a published guide has no `draft` field.

| Stage | `draft` | What exists | Distributed? |
|---|---|---|---|
| 1. Stub | `stub` | Frontmatter only: `name`, `description`, `drupal-core`, `draft`. The use case is agreed and the version range is verified. A body is optional; if present, it holds only `{# ... #}` author notes. | No |
| 2. Work in progress | `wip` | A body being written. `expectations.md` and `demo/` may be incomplete. | No |
| 3. Blocked | `blocked` | Held back by a core issue, an unreleased API or an unresolved disagreement. Needs `draft-reason`. | No |
| 4. Published | none | `guide.md`, `expectations.md` and `demo/` complete; the demo installs cleanly at both ends of the range; validation passes. | Yes |

After publication the eval harness generates tasks and graders from `expectations.md` (upstream's Stage 3). Never change `guide.md` to fit a grader. If a grader checks something the guide does not ask for, fix the grader.

## Checklist before you open a pull request

- [ ] Frontmatter has every required field, `name` equals the directory, and `drupal-core` parses.
- [ ] Every API, service ID and version is verified, with a maintainer comment saying where.
- [ ] The body follows the section order above, has one H1, and has no external links.
- [ ] Every PHP, YAML and Twig block parses; every code block names its file.
- [ ] `demo/` installs or applies cleanly at the lowest and the current core version in range, with no deprecation notices.
- [ ] Every outcome the guide requires has a bullet in `expectations.md`, and the demo exercises it.
- [ ] `pnpm validate` passes in `engine/`.
