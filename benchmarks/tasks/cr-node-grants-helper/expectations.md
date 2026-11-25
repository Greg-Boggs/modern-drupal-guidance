# Expectations: Report a user's node access grants

Checks compare the service with core's node grants helper and node access handler through Drush.

Source: the change record [node/3578055](https://www.drupal.org/node/3578055), imported as the guide `node-access-grants-has-been-deprecated`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `module-enabled` | MUST | Outcome | Module bench_grantinfo exists in web/modules/custom/bench_grantinfo and is enabled. |
| `grants` | MUST | Outcome | grants('view', $user) equals core's NodeGrantsHelper::nodeAccessGrants('view', $user) for user 1 and for anonymous. |
| `view-all` | MUST | Outcome | canViewAll() matches the node access control handler's checkAllGrants() (TRUE on the base app with no node access modules). |
| `no-procedural` | MUST NOT | Practice | The module does not call node_access_grants() or node_access_view_all_nodes(). |
| `no-deprecated-api` | MUST NOT | Practice | The module uses no core API that data/drupal/deprecations.json lists as deprecated or removed. |
