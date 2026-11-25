# Expectations: Render-cacheable signup form

Checks build the form through Drush and fetch /signup over HTTP.

Source: the change record [node/3442559](https://www.drupal.org/node/3442559), imported as the guide `forms-can-be-opted-in-to-render-caching`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `module-enabled` | MUST | Outcome | Module bench_signup exists in web/modules/custom/bench_signup and is enabled. |
| `form` | MUST | Outcome | The /signup route builds form bench_signup_form with an email element and a submit button. |
| `max-age` | MUST | Outcome | The built form carries a top-level #cache max-age of 3600 seconds. |
| `token-cacheable` | MUST | Outcome | For an authenticated user the CSRF token element is not forced to max-age 0. |
| `page` | MUST | Outcome | GET /signup as an anonymous visitor returns 200 with the Email field and the Sign up button. |
| `no-deprecated-api` | MUST NOT | Practice | The module uses no core API that data/drupal/deprecations.json lists as deprecated or removed. |
