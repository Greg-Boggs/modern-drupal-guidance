# Expectations: Require preview for articles

Checks read the node type through Drush and its active configuration.

Source: the change record [node/3538666](https://www.drupal.org/node/3538666), imported as the guide `getpreviewmode-and-setpreviewmode-on-nodetypeinterface-now`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `required` | MUST | Outcome | NodeType article getPreviewMode(FALSE) is NodePreviewMode::Required. |
| `config` | MUST | Outcome | node.type.article preview_mode is 2 (required). |
