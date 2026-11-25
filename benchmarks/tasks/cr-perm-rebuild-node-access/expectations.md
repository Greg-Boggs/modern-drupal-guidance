# Expectations: Let site managers rebuild content access

Checks read the role configuration and check route access for a test user through Drush.

Source: the change record [node/3521446](https://www.drupal.org/node/3521446), imported as the guide `access-to-rebuild-node-permissions-now-requires-the-rebuild`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `role` | MUST | Outcome | The role site_manager exists with the label "Site manager". |
| `route-access` | MUST | Outcome | A user with only the site_manager role passes access for the node.configure_rebuild_confirm route. |
| `no-admin` | MUST NOT | Outcome | The site_manager role has administer nodes or bypass node access. |
