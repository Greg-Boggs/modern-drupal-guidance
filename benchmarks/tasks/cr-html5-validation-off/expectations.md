# Expectations: Turn off browser-native form validation site-wide

Checks read the site settings through Drush and fetch /user/login over HTTP.

Source: the change record [node/3537128](https://www.drupal.org/node/3537128), imported as the guide `html5-validation-will-be-disabled-in-drupal-12`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `setting` | MUST | Outcome | Settings::get('enable_html5_validation') is FALSE. |
| `novalidate` | MUST | Outcome | The user login form at /user/login is rendered with the novalidate attribute and its username field keeps required. |
| `no-custom-code` | MUST NOT | Outcome | No custom module code was written for it. |
