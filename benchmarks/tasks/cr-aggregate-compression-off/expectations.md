# Expectations: Stop writing precompressed CSS and JS aggregates

Checks read active configuration.

Source: the change record [node/3526344](https://www.drupal.org/node/3526344), imported as the guide `brotli-compression-support-added-for-css-and-javascript`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `css-off` | MUST | Outcome | system.performance css.compress is false. |
| `js-off` | MUST | Outcome | system.performance js.compress is false. |
| `no-legacy-keys` | MUST NOT | Practice | system.performance has the removed css.gzip or js.gzip keys. |
| `aggregation-unchanged` | MUST NOT | Outcome | CSS or JS aggregation (preprocess) was changed from the base app's setting (off). |
