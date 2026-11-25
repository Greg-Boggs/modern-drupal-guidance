# Expectations: Optional service decorator

Checks parse the services file and inspect the container through Drush.

Source: the change record [node/3477712](https://www.drupal.org/node/3477712), imported as the guide `service-decoration-behaviour-can-be-controlled-with`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `module-enabled` | MUST | Outcome | Module bench_decor exists in web/modules/custom/bench_decor and is enabled. |
| `definition` | MUST | Practice | bench_decor.services.yml defines bench_decor.ban_logger decorating ban.ip_manager with decoration_on_invalid: ignore. |
| `dropped` | MUST | Outcome | Without Ban installed, the container has no bench_decor.ban_logger and no ban.ip_manager service, and the site bootstraps. |
| `no-provider` | MUST NOT | Practice | The module adds a service provider or compiler pass. |
| `no-deprecated-api` | MUST NOT | Practice | The module uses no core API that data/drupal/deprecations.json lists as deprecated or removed. |
