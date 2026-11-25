# Expectations: Main menu without active-trail classes

Checks read the block configuration.

Source: the change record [node/3533514](https://www.drupal.org/node/3533514), imported as the guide `system-menu-blocks-have-configuration-option-for-add-a-css`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `ignore-trail` | MUST | Outcome | block.block.olivero_main_menu settings.ignore_active_trail is true. |
| `other-settings-kept` | MUST NOT | Outcome | The block's level, depth or expand_all_items changed from the base app (1, 2, true). |
