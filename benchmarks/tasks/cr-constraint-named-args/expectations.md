# Expectations: Validation constraint plugin with named arguments

Checks create and run the constraint through Drush.

Source: the change record [node/3554746](https://www.drupal.org/node/3554746), imported as the guide `constraint-plugins-must-use-named-arguments-instead-of-an`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `module-enabled` | MUST | Outcome | Module bench_zip exists in web/modules/custom/bench_zip and is enabled. |
| `validates` | MUST | Outcome | The BenchZip plugin accepts "12345" and rejects "1234a" with the default message. |
| `named-arguments` | MUST | Outcome | new BenchZipConstraint(message: 'Bad code') works and its violation message is "Bad code". |
| `has-constructor` | MUST | Practice | The constraint class declares its own constructor with a named $message parameter. |
| `no-annotation` | MUST NOT | Practice | The constraint uses an @Constraint annotation. |
| `no-deprecated-api` | MUST NOT | Practice | The module uses no core API that data/drupal/deprecations.json lists as deprecated or removed. |
