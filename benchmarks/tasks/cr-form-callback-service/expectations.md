# Expectations: Form submit handler on an injected service

Checks build and submit the form programmatically through Drush and resolve its submit handlers with core's callable resolver.

Source: the change record [node/3548821](https://www.drupal.org/node/3548821), imported as the guide `form-api-callbacks-now-support-callables-supported-by-the`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `module-enabled` | MUST | Outcome | Module bench_feedback exists in web/modules/custom/bench_feedback and is enabled. |
| `service-injection` | MUST | Outcome | bench_feedback.recorder exists and its record() method is public and not static. |
| `handler-is-service` | MUST | Practice | The form's submit handlers include a "service:method" string that resolves to record() on the bench_feedback.recorder service. |
| `submit-saves` | MUST | Outcome | Submitting the form programmatically with message "Great site" stores it in state bench_feedback.last. |
| `no-this-callback` | MUST NOT | Practice | The module does not register [$this, ...] or a closure as a form callback. |
| `no-deprecated-api` | MUST NOT | Practice | The module uses no core API that data/drupal/deprecations.json lists as deprecated or removed. |
