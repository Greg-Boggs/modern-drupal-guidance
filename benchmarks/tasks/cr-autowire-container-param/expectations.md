# Expectations: Controller that receives a container parameter

Checks fetch the page over HTTP and reflect on the controller class through Drush.

Source: the change record [node/3575335](https://www.drupal.org/node/3575335), imported as the guide `autowiretrait-and-autowiredinstancetrait-support-container`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `module-enabled` | MUST | Outcome | Module bench_param exists in web/modules/custom/bench_param and is enabled. |
| `page` | MUST | Outcome | GET /bench-site-path shows "Site path: sites/default". |
| `no-create` | MUST | Practice | The controller behind /bench-site-path does not declare create(), so core autowires its constructor. |
| `no-static` | MUST NOT | Practice | The module calls \Drupal::, reads the container, or reads Settings. |
| `no-deprecated-api` | MUST NOT | Practice | The module uses no core API that data/drupal/deprecations.json lists as deprecated or removed. |
