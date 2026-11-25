# Expectations: Stop Drupal writing .htaccess files

Checks read the site settings and call core's .htaccess writer through Drush.

Source: the change record [node/3525119](https://www.drupal.org/node/3525119), imported as the guide `automatic-creation-of-htaccess-files-can-be-disabled`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `setting` | MUST | Outcome | Settings::get('auto_create_htaccess') is FALSE. |
| `no-file-written` | MUST | Outcome | Asking core to protect a new directory under public:// writes no .htaccess file there. |
