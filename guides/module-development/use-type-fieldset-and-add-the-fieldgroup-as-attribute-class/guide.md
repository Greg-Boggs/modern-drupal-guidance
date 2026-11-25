---
name: use-type-fieldset-and-add-the-fieldgroup-as-attribute-class
title: "Use #type fieldset and add the fieldgroup as attribute class."
description: "Use #type fieldset and add the fieldgroup as attribute class."
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3515272
change-record-nid: 3515272
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3512254](https://www.drupal.org/node/3512254)

The use of `#type => 'fieldgroup'` in form elements to group form elements together is no more used. Use the 'fieldgroup' as a class in #attributes of form element and `#type => 'fieldset'`.\
Also need to add the `core/drupal.fieldgroup` library where #type fieldgroup was used in the form.

Before:

```php
    $form['site_information'] = [
      '#type' => 'fieldgroup',
      '#title' => $this->t('Site information'),
      '#access' => empty($install_state['config_install_path']),
    ];
```

After:

```php
    $form['#attached']['library'][] = 'core/drupal.fieldgroup';

    $form['site_information'] = [
      '#type' => 'fieldset',
      '#attributes' => ['class' => ['fieldgroup']],
      '#title' => $this->t('Site information'),
      '#access' => empty($install_state['config_install_path']),
    ];
```

*Source: [Use #type fieldset and add the fieldgroup as attribute class.](https://www.drupal.org/node/3515272), a Drupal core change record by [sayan_k_dutta](https://www.drupal.org/user/3820234) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
