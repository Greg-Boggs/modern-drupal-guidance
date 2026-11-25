# Expectations: Members-only access result with a reason

Checks call the access service through Drush for member, plain and blocked test users.

Source: the change record [node/3579037](https://www.drupal.org/node/3579037), imported as the guide `accessresult-allowedif-and-accessresult-forbiddenif-now`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `module-enabled` | MUST | Outcome | Module bench_members exists in web/modules/custom/bench_members and is enabled. |
| `member` | MUST | Outcome | An active account with the member role gets an allowed result. |
| `neutral-reason` | MUST | Outcome | An active account without the role gets a neutral result whose reason is "Only members can see this content." |
| `forbidden-reason` | MUST | Outcome | A blocked account without the role gets a forbidden result whose reason is "Blocked accounts cannot see member content." |
| `cacheability` | MUST | Outcome | The neutral result carries the user.roles cache context (or a broader user context). |
| `no-hand-built-neutral` | MUST NOT | Practice | The module does not build results with AccessResult::neutral(). |
| `no-deprecated-api` | MUST NOT | Practice | The module uses no core API that data/drupal/deprecations.json lists as deprecated or removed. |
