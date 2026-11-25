# Expectations: Link suggestions for site content in Basic HTML

Checks read the text format configuration and filter a linked text through Drush.

Source: the change record [node/3524296](https://www.drupal.org/node/3524296), imported as the guide `a-new-entity-links-filter-format-and-ckeditor-5-plugin-has`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `filter-enabled` | MUST | Outcome | The entity_links filter is enabled on the basic_html text format. |
| `other-filters-kept` | MUST NOT | Outcome | filter_html was disabled on basic_html. |
| `renders-link` | MUST | Outcome | Text with an entity link to a node, filtered through basic_html, outputs a link to that node's current alias. |
| `no-custom-code` | MUST NOT | Outcome | No custom module code was written for it. |
