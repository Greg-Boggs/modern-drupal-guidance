# Expectations: Lazy notice block that BigPipe must not stream

Checks build the block, call its lazy builder and run core's placeholder generator through Drush.

Source: the change record [node/3511562](https://www.drupal.org/node/3511562), imported as the guide `new-placeholder-strategy-denylist-key-for-render-arrays`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `module-enabled` | MUST | Outcome | Module bench_notice exists in web/modules/custom/bench_notice and is enabled. |
| `lazy-builder` | MUST | Outcome | build() returns a #lazy_builder element with #create_placeholder TRUE. |
| `renders` | MUST | Outcome | Calling the lazy builder callback renders "Scheduled maintenance on Sunday." |
| `denylist-bigpipe` | MUST | Practice | The element denies the BigPipe placeholder strategy (#placeholder_strategy_denylist has BigPipeStrategy::class => TRUE). |
| `placeholder-survives` | MUST | Outcome | The render pipeline keeps the denylist on the generated placeholder. |
| `no-deprecated-api` | MUST NOT | Practice | The module uses no core API that data/drupal/deprecations.json lists as deprecated or removed. |
