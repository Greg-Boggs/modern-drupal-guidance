# Expectations: Form with constructor injection and no factory method

Checks fetch the form over HTTP, submit it through Drush and reflect on its class.

Source: the change record [node/3575184](https://www.drupal.org/node/3575184), imported as the guide `formbase-provides-create-factory-method-with-autowired`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `module-enabled` | MUST | Outcome | Module bench_autoform exists in web/modules/custom/bench_autoform and is enabled. |
| `page` | MUST | Outcome | GET /bench-autoform returns 200 with "Last saved: never" and a note field. |
| `submit` | MUST | Outcome | Submitting the form with note "Hi" stores it in state bench_autoform.last. |
| `inherited-create` | MUST | Practice | The form class does not declare create(); the method comes from core. |
| `no-static` | MUST NOT | Practice | The module calls \Drupal::. |
| `no-deprecated-api` | MUST NOT | Practice | The module uses no core API that data/drupal/deprecations.json lists as deprecated or removed. |
