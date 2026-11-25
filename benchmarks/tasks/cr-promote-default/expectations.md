# Expectations: News items promoted by default

Checks read active configuration and create an unsaved node through Drush.

Source: the change record [node/3517642](https://www.drupal.org/node/3517642), imported as the guide `promoted-to-front-page-now-defaults-to-false-for-new`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `type` | MUST | Outcome | The node type news exists with the label "News". |
| `default-promoted` | MUST | Outcome | A new news node created without a promote value is promoted. |
| `on-form` | MUST | Outcome | The default form display of news includes the promote field. |
