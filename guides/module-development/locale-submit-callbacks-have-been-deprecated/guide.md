---
name: locale-submit-callbacks-have-been-deprecated
title: "Locale submit callbacks have been deprecated"
description: "Locale submit callbacks have been deprecated"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3595086
change-record-nid: 3595086
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#3595084](https://www.drupal.org/node/3595084)

The following functions have been deprecated.

- `locale_system_set_config_langcodes`
- `locale_system_update`
- `locale_system_remove`
- `locale_form_language_admin_add_form_alter_submit`
- `locale_form_language_admin_edit_form_alter_submit`

**Before:**\
`locale_system_set_config_langcodes`\
**After:**\
`\Drupal::service('locale.config_manager')->updateDefaultConfigLangcodes();`

The following callbacks have been moved to public methods on `LocaleFormHooks`, form callbacks should not be called directly.

- `locale_form_language_admin_add_form_alter_submit`
- `locale_form_language_admin_edit_form_alter_submit`

The following functions have no replacement:

- `locale_system_update`
- `locale_system_remove`

*Source: [Locale submit callbacks have been deprecated](https://www.drupal.org/node/3595086), a Drupal core change record by [nicxvan](https://www.drupal.org/user/531480) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
