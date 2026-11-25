# Expectations: Hooks for article titles and module help

Checks run Drupal through Drush, read the module's files and run the `oop-hooks` legacy-scan rules.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `module-enabled` | MUST | Outcome | `web/modules/custom/bench_hooks/bench_hooks.info.yml` exists and the module is enabled. |
| `article-title` | MUST | Outcome | Saving an article titled `  hello drupal world ` stores `Hello Drupal World`. |
| `page-title` | MUST | Outcome | With the module enabled, saving a basic page titled `  hello drupal page ` stores the title unchanged. |
| `help` | MUST | Outcome | Invoking `hook_help` for `help.page.bench_hooks` returns text containing "Bench hooks tidies article titles." |
| `hook-attribute` | MUST | Practice | A class in `src/Hook/` implements hooks with the `#[Hook(...)]` attribute. |
| `no-legacy-pattern` | MUST NOT | Practice | The `oop-hooks` legacy-scan rules find a procedural hook implementation in the module. |
| `no-deprecated-api` | MUST NOT | Practice | The module uses an API that `data/drupal/deprecations.json` lists as deprecated or removed. |
