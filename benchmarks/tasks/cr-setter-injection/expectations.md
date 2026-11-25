# Expectations: Controller with setter injection

Checks fetch the page over HTTP and reflect on the controller class through Drush.

Source: the change record [node/3566688](https://www.drupal.org/node/3566688), imported as the guide `autowiretrait-supports-setter-injection-with-the-required`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `module-enabled` | MUST | Outcome | Module bench_setter exists in web/modules/custom/bench_setter and is enabled. |
| `page` | MUST | Outcome | GET /bench-time returns 200 with "Request time: " followed by a timestamp. |
| `no-constructor` | MUST | Practice | The controller behind /bench-time declares neither __construct() nor create() and gets the time service through a setter with the #[Required] attribute. |
| `no-static` | MUST NOT | Practice | The module calls \Drupal::. |
| `no-deprecated-api` | MUST NOT | Practice | The module uses no core API that data/drupal/deprecations.json lists as deprecated or removed. |
