# Expectations: Generate one-time login links

Checks call the service through Drush and compare its results with core.

Source: the change record [node/3581062](https://www.drupal.org/node/3581062), imported as the guide `user-pass-rehash-user-cancel-url-user-mail-tokens-and-user`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `module-enabled` | MUST | Outcome | Module bench_login exists in web/modules/custom/bench_login and is enabled. |
| `valid` | MUST | Outcome | loginUrl() returns an absolute /user/reset/{uid}/{timestamp}/{hash} URL whose hash matches core's OneTimeAuthentication::generateHmac() for that user and timestamp. |
| `no-legacy-api` | MUST NOT | Practice | The module does not call user_pass_reset_url(), user_pass_rehash(), user_cancel_url() or user_mail_tokens(). |
| `no-deprecated-api` | MUST NOT | Practice | The module uses no core API that data/drupal/deprecations.json lists as deprecated or removed. |
