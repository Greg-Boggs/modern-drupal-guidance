---
name: form-select-options-and-form-get-options-have-been
title: "form_select_options() and form_get_options() have been deprecated"
description: "form_select_options() and form_get_options() have been deprecated"
drupal-core: ">=11.6"
source-url: https://www.drupal.org/node/3412600
change-record-nid: 3412600
introduced-in-version: "11.6.0"
introduced-in-branch: "11.6.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.6.x\
Introduced in version: 11.6.0\
Issue links: [#2448545](https://www.drupal.org/node/2448545)

`form_select_options()` is deprecated. Use \Drupal\Core\Form\FormOptionsHelper::formSelectOptions() instead.

`form_get_options()` is deprecated. It is not used by core and there is no direct replacement.

| Before | After |
| --- | --- |
| form_select_options() | \Drupal\Core\Form\FormOptionsHelper::formSelectOptions() |
| form_get_options() | No direct replacement |

*Source: [form_select_options() and form_get_options() have been deprecated](https://www.drupal.org/node/3412600), a Drupal core change record by [dimitriskr](https://www.drupal.org/user/3575407) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
