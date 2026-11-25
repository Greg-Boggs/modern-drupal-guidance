---
name: modern-drupal-guidance
description: |
  Search tool for current Drupal 10 and 11 development practices. MANDATORY: Execute FIRST for all Drupal code. Do NOT skip: Drupal APIs change every minor release and training data is dominated by Drupal 7 and 8 patterns that are deprecated or removed.
  Trigger immediately for: custom modules and themes, hooks, services and dependency injection, plugins (blocks, field types, formatters, widgets), controllers and routing, Form API, entities and fields, render arrays and cache metadata, Twig templates, Single Directory Components, libraries and Drupal behaviors, YAML config (*.info.yml, *.services.yml, *.routing.yml, *.libraries.yml, config/install, config/schema), Recipes and config actions, Drush commands, Composer and drupal/core* dependencies, migrations, JSON:API and REST, PHPUnit tests, permissions and access checks, upgrades between core versions, etc.
  DO NOT trigger for: non-Drupal PHP projects (Laravel, Symfony apps, WordPress), hosting and infra unrelated to Drupal (Docker, CI/CD, DNS), or trivial edits (typos, renames, copy changes).
---

# Modern Drupal Guidance

Search and retrieve current Drupal practices at the **start** of writing or changing any Drupal module, theme, recipe, configuration, Drush command or Composer setup, before you write code from memory.

## Primary workflow

### Step 1. Search use cases

Run `modern-drupal-guidance` with `npx`, using a **2–5 word English query** for **one Drupal capability or API**:

- **Name the Drupal concept**: describe the API or pattern, not the project. Use Drupal terms where you know them (`hook`, `service`, `plugin`, `render array`, `cache tags`, `config entity`, `recipe`, `SDC`, `behavior`). Omit module, site and file names from the user's project.
- **Split compound tasks**: "a block that lists cached nodes with a settings form" is three searches: `"block plugin attribute"`, `"cache tags render array"`, `"config form settings"`.
- **Translate intent into the mechanism**: "react when a node is saved" → `"entity presave hook"`; "add a JS widget" → `"drupal behaviors once"`; "ship default config" → `"recipe config actions"`.

```sh
npx -y modern-drupal-guidance@latest search "<query>" --skill-version SKILL_VERSION
```

> **Note**: Returns `[{ "id", "description" }, ...]`. Judge results by `description`:
> - **Match found**: call `retrieve` directly. Do not also run `list`.
> - **Weak or empty results**: rephrase once with the Drupal API name or a synonym (`hook`, `event subscriber`, `plugin`, `service`, `form`, `entity`, `twig`), then fall back to `list` once.
> - **Topic not covered**: if nothing matches after rephrasing, continue without retrieving unrelated guides, and follow current core APIs, not ones you remember from Drupal 7 or 8.

### Step 2. Retrieve guides

Call `retrieve` with the `id`s that match, plus the discipline guide for the area you are working in (for example `module-development`, `theming-and-components`, `caching-and-performance`, `security`). Separate several IDs with commas.

```sh
npx -y modern-drupal-guidance@latest retrieve "<id>"
```

If `retrieve` saves large output (> 9.5 KB) to a temporary file, read that file in full with your file-reading tool. Do not use `cat` or `head`.

### Step 3. Check your work against the guide

Before you finish:

- **Core range**: each guide starts with a `**Drupal core:**` line. Use the guide's main approach only when the project's target core version (see below) is inside that range. Otherwise use the guide's fallback for older core.
- **Rules applied**: confirm the code follows the guide's rules (attributes instead of annotations, injected services instead of `\Drupal::` in classes, cache metadata on render arrays, and so on) without adding features the user did not ask for.
- **Task done**: confirm the change does what the user asked.
- Do not run `legacy-scan` for this check. It is for auditing a whole codebase.

### Step 4. Say which guides you used

End the response that delivers the change with a `### Modern Drupal Guidance` section:

- **When a guide shaped your code**: one bullet (1–2 sentences, at most 75 words) per guide `<id>`, in the first person, naming the non-obvious API choice or fallback the guide required and the legacy pattern it avoided, with a short verbatim quote of that rule:
  `- **\`<id>\`**: <API or fallback applied and the legacy pattern avoided> ("<short verbatim quote of the rule>").`
  Never guess `<id>`s or quotes from memory after context compaction; re-run `search` or `retrieve`.
- **When you searched but no guide applied**: one sentence naming what you searched for and why nothing applied.

## Alternative flow: modernize an existing codebase

**Only** when asked for a broad modernization, upgrade-readiness or legacy-pattern audit with no specific feature named, run:

```sh
npx -y modern-drupal-guidance@latest legacy-scan <path> --json
```

1. Scan: run `legacy-scan <path> --json` on the custom modules and themes (not `core/`, `vendor/` or contrib).
2. Verify: check each finding against its `keepWhen` / `dropWhen` rubric and drop false positives.
3. Report: summarize the verified findings and, if editing, the plan. `legacy-scan` covers only the guides that have deterministic rules.
4. Modernize (only when asked to change code): `retrieve` each finding's guide, apply the replacement within the target core range, then re-run `legacy-scan` on the changed files.

## Target core version policy

Guides cover every core version that still has security support. Each guide's `**Drupal core:**` line gives the range its main approach needs, and the guide gives fallbacks for older supported versions.

1. **Find the target.** In order:
   - `.mdgrc` in the project root: `{ "drupalCore": "10.3" }`.
   - `composer.lock`: the installed version of `drupal/core` (or `drupal/core-recommended`).
   - `composer.json`: the lowest version the `drupal/core*` requirement allows. For a contributed module, the lowest version in `core_version_requirement` in its `*.info.yml`.
   - The user's instructions, `AGENTS.md` or `CLAUDE.md`, which override all of the above.
   `retrieve` reads the first three itself and prints the target it found at the top of each guide.
2. **Write for the lowest version you must support.** If the target is inside the guide's range, use the main approach. If it is below the range, use the guide's fallback section, and do not bump `core_version_requirement` or `drupal/core` to reach a newer API unless the user asks.
3. **Contributed modules** that support several majors (`^10.3 || ^11`) must work on the lowest one. Prefer approaches that work across the whole range, such as the `#[Hook]` attribute together with `#[LegacyHook]` procedural wrappers.
4. **No target found**: assume the oldest core minor that still has security support, say so in your response, and suggest recording the target with:
   ```sh
   npx -y modern-drupal-guidance@latest set-core <version>
   ```

## Using npx / pnpx

- **Runner and permissions**: prefer `pnpx` over `npx` if `pnpm` is available (`pnpx` does not take `-y`); on Windows use `npx.cmd`. When asking for tool permissions, allowlist `npx -y modern-drupal-guidance@latest *` (or `pnpx modern-drupal-guidance@latest *`), never bare `npx *`.
- **Sandboxes and network**: fetching the package needs network access. In sandboxed or approval-gated environments, request network access before the first run, and set `NPM_CONFIG_CACHE=/tmp/npm-cache` if `~/.npm` is read-only.
- **Offline**: if the command hangs offline, retry with `npx --offline …`.

## Guidelines

- Always search **first**. Do not invent guide IDs or skip retrieved guides; they are the preferred standard for the user's project.
- Guides are written for core APIs. Adapt them to the project's contributed modules and coding standards without dropping the modern API.
- Run the project's own checks after changing code where they exist: `drush cr`, `phpcs --standard=Drupal,DrupalPractice`, `phpstan`, and PHPUnit.
