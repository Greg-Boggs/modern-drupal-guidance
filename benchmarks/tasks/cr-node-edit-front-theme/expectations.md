# Expectations: Edit content in the front-end theme

Checks read configuration and the node.add route through Drush.

Source: the change record [node/3514929](https://www.drupal.org/node/3514929), imported as the guide `the-administration-theme-is-used-by-default-for-editing-and`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `setting` | MUST | Outcome | node.settings use_admin_theme is false. |
| `route-not-admin` | MUST | Outcome | The node.add route is no longer treated as an admin route by the admin context. |
| `admin-theme-kept` | MUST NOT | Outcome | system.theme admin was changed from claro. |
