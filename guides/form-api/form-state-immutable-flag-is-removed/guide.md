---
name: form-state-immutable-flag-is-removed
title: "Form state 'immutable' flag is removed"
description: "Form state 'immutable' flag is removed"
drupal-core: ">=11.1"
source-url: https://www.drupal.org/node/3470510
change-record-nid: 3470510
introduced-in-version: "11.1.0"
introduced-in-branch: "11.1.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.1.x\
Introduced in version: 11.1.0\
Issue links: [#2524408](https://www.drupal.org/node/2524408)

it is not be necessary to support marking form state as immutable because since [#2502785: Remove support for $form_state->setCached() for GET requests](https://www.drupal.org/project/drupal/issues/2502785) we'll never write to $form_state on GET requests.

Contrib and custom code should remove any code that set or checks the `immutable` flag. For example all the following code should be removed:

```php
$build_info = $form_state->getBuildInfo();
if (!empty($build_info['immutable'])) {
  // Do something...
}
```

```php
function my_module_form_alter(&$form, FormStateInterface $form_state) {
  $form_state->addBuildInfo('immutable', TRUE);
}
```

*Source: [Form state 'immutable' flag is removed](https://www.drupal.org/node/3470510), a Drupal core change record by [alexpott](https://www.drupal.org/user/157725) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
