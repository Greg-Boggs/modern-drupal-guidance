# Expectations: Hash passwords with bcrypt cost 12

Checks hash a password with core's password service and read container parameters through Drush.

Source: the change record [node/3581980](https://www.drupal.org/node/3581980), imported as the guide `password-hashing-is-configurable-using-kernel-parameters`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `hash` | MUST | Outcome | The password service hashes a new password with a $2y$12$ bcrypt hash, and the hash verifies. |
| `parameters` | MUST | Practice | The container parameter password.algorithm is "2y" (or PASSWORD_BCRYPT) and password.options has cost 12. |
| `no-service-override` | MUST NOT | Outcome | No custom module code was written, and core's password service is not redefined. |
| `no-password-service` | MUST NOT | Practice | web/sites/default/services.yml redefines the password service. |
