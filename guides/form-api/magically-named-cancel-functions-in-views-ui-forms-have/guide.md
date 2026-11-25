---
name: magically-named-cancel-functions-in-views-ui-forms-have
title: "Magically named cancel functions in Views UI forms have been deprecated"
description: "Magically named cancel functions in Views UI forms have been deprecated"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3536715
change-record-nid: 3536715
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3536204](https://www.drupal.org/node/3536204)

Previously forms that call `\Drupal\views_ui\ViewsUI::getStandardButtons()` could have a custom cancel submit handler automatically applied if it was named `$form_id . '_cancel'`. If this function did not exist the cancel button would use `ViewUI::standardCancel()` instead.

These magically named cancel functions have been deprecated. Specify a submit handler in a class method instead.

**Before:**

```php
<?php

function my_form_id_cancel($form, FormStateInterface $form_state) {
  // Custom handler.
}

class MyForm extends ViewsFormBase {

  public function buildForm(array $form, FormStateInterface $form_state) {
    $view->getStandardButtons($form, $form_state, 'my_form_id');
  }

}
?>
```

**After:**

```php
<?php
class MyForm extends ViewsFormBase {

  public function buildForm(array $form, FormStateInterface $form_state) {
    $view->getStandardButtons($form, $form_state, 'my_form_id');
    $form['actions']['cancel']['#submit'] = [[$this, 'cancelSubmit']],
  }

  public function cancelSubmit($form, FormStateInterface $form_state) {
    // Custom handler.
  }

}
?>
```

*Source: [Magically named cancel functions in Views UI forms have been deprecated](https://www.drupal.org/node/3536715), a Drupal core change record by [nicxvan](https://www.drupal.org/user/531480) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
