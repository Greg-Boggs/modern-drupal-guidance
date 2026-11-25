# Expectations: Find nodes that use a file

Checks call the service through Drush and compare its results with core.

Source: the change record [node/3573884](https://www.drupal.org/node/3573884), imported as the guide `file-get-file-references-is-deprecated-in-favor-of-the`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `module-enabled` | MUST | Outcome | Module bench_fileuse exists in web/modules/custom/bench_fileuse and is enabled. |
| `image-field` | MUST | Outcome | nodeIds() returns the ID of an article that uses the file in its image field, and not an unrelated article. |
| `no-legacy-api` | MUST NOT | Practice | The module does not call file_get_file_references(). |
| `no-deprecated-api` | MUST NOT | Practice | The module uses no core API that data/drupal/deprecations.json lists as deprecated or removed. |
