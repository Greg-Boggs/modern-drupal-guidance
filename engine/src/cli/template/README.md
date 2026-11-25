# Modern Drupal Guidance

Modern Drupal Guidance gives AI coding agents short, tested guides for current Drupal core APIs at the moment they write code. Without it, agents fall back on what dominates their training data: procedural hooks, plugin annotations, `\Drupal::` calls inside services, `drupal_set_message()`, `jQuery.once` and other APIs that are deprecated or removed. With it, they use what core provides today: OOP hooks with `#[Hook]`, PHP attributes, dependency injection, Single Directory Components, Recipes, cache metadata and the rest.

Requires Node.js 22 or later. Search runs locally, with no server and no API key.

## Install

```sh
npx modern-drupal-guidance@latest install
```

This installs the `modern-drupal-guidance` agent skill for the coding agents it finds (Claude Code, Codex, Cursor, Gemini CLI, GitHub Copilot and others). Pass `--agent <name>` and `-y` to skip the prompts.

The package also ships plugin manifests for agents that install plugins from a repository: `.claude-plugin/`, `.codex-plugin/`, `.cursor-plugin/`, `.github/plugin/`, `.grok-plugin/`, `gemini-extension.json`, `kimi.plugin.json` and `plugin.json`.

## Use it without installing

```sh
npx -y modern-drupal-guidance@latest search "block plugin attribute"
npx -y modern-drupal-guidance@latest retrieve "<id>"
npx -y modern-drupal-guidance@latest list
```

## Target core version

Guides state the Drupal core range they apply to and give fallbacks for older supported versions. `retrieve` tells the agent which applies to your project. It reads the target from `.mdgrc`, then `composer.lock`, then `composer.json`. To set it explicitly:

```sh
npx -y modern-drupal-guidance@latest set-core 10.3
```

## Commands

| Command | What it does |
|---|---|
| `search <query>` | Finds guides for a 2–5 word English query. Prints `[{ "id", "description" }]`. |
| `retrieve <ids>` | Prints one or more guides by ID. |
| `list` | Lists every guide as `[{ "id", "description" }]`. |
| `legacy-scan [path] [--json]` | Finds legacy Drupal patterns and names the guide that replaces each. |
| `set-core <version>` | Records the project's target Drupal core version in `.mdgrc`. |
| `target [--json]` | Shows the target core version `retrieve` will use and where it came from. |
| `install`, `update`, `uninstall` | Manage the agent skill. |

## License

Apache-2.0. Modern Drupal Guidance is a fork of Google Chrome's Modern Web Guidance; see `NOTICE`.
