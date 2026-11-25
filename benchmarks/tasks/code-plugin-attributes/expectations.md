# Expectations: Configurable greeting block plugin

Checks use the block plugin manager through Drush, fetch the front page and run the `plugin-attributes` legacy-scan rules.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `module-enabled` | MUST | Outcome | `web/modules/custom/bench_block/bench_block.info.yml` exists and the module is enabled. |
| `definition` | MUST | Outcome | The block plugin manager has a definition `bench_greeting` with the admin label "Bench greeting". |
| `attribute` | MUST | Practice | A class in `src/Plugin/Block/` declares the plugin with the `#[Block(...)]` attribute. |
| `config-form` | MUST | Outcome | The plugin's `blockForm()` has a text field; saving "Howdy, bench" in it through `blockSubmit()` makes `build()` render "Howdy, bench". |
| `renders` | MUST | Outcome | An enabled `block.block.*` config places `bench_greeting` in Olivero's `content` region, and the front page shows "Hello from the benchmark". |
| `no-legacy-pattern` | MUST NOT | Practice | The `plugin-attributes` legacy-scan rules find an `@Block` docblock annotation in the module. |
| `no-deprecated-api` | MUST NOT | Practice | The module uses an API that `data/drupal/deprecations.json` lists as deprecated or removed. |
