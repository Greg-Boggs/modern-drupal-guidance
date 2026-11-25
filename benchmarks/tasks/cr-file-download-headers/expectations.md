# Expectations: HTTP headers for a file download

Checks call the service through Drush and compare its results with core.

Source: the change record [node/3494172](https://www.drupal.org/node/3494172), imported as the guide `file-get-content-headers-is-deprecated`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `module-enabled` | MUST | Outcome | Module bench_filehdr exists in web/modules/custom/bench_filehdr and is enabled. |
| `headers` | MUST | Outcome | forFile() equals File::getDownloadHeaders() for a text file, including Content-Type text/plain. |
| `no-legacy-api` | MUST NOT | Practice | The module does not call file_get_content_headers(). |
| `no-deprecated-api` | MUST NOT | Practice | The module uses no core API that data/drupal/deprecations.json lists as deprecated or removed. |
