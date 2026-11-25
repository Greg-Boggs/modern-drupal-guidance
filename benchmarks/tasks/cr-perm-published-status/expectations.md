# Expectations: Editors can publish without administering content

Checks read the role configuration and check field access for a test user through Drush.

Source: the change record [node/3528500](https://www.drupal.org/node/3528500), imported as the guide `new-permission-available-to-control-the-published-status-of`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `field-access` | MUST | Outcome | For a user with only content_editor, edit access to a page node's status field is allowed. |
| `no-admin` | MUST NOT | Outcome | content_editor has administer nodes or bypass node access. |
