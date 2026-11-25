# Expectations: Keep CSS and JS aggregates for ten days across cache clears

Checks read the site settings through Drush and the settings.php file.

Source: the change record [node/3557835](https://www.drupal.org/node/3557835), imported as the guide `new-asset-garbage-collection-threshold`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `threshold` | MUST | Outcome | Settings::get('asset_gc_threshold') is 864000 seconds (ten days). |
| `in-settings-php` | MUST | Outcome | The value is set in web/sites/default/settings.php. |
