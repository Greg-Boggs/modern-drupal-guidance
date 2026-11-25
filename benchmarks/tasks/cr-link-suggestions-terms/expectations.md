# Expectations: Offer tags as CKEditor link suggestions

Checks read entity bundle info through Drush.

Source: the change record [node/3524296](https://www.drupal.org/node/3524296), imported as the guide `a-new-entity-links-filter-format-and-ckeditor-5-plugin-has`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `module-enabled` | MUST | Outcome | Module bench_termlinks exists in web/modules/custom/bench_termlinks and is enabled. |
| `tags-suggested` | MUST | Outcome | Bundle info for taxonomy_term tags has ckeditor5_link_suggestions TRUE. |
| `others-unchanged` | MUST | Outcome | A second vocabulary created in the grader does not get link suggestions, and user accounts do not. |
| `no-legacy-pattern` | MUST NOT | Practice | No procedural hook implementations (legacy-scan oop-hooks rules). |
| `no-deprecated-api` | MUST NOT | Practice | The module uses no core API that data/drupal/deprecations.json lists as deprecated or removed. |
