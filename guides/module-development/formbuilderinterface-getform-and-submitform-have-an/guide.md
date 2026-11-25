---
name: formbuilderinterface-getform-and-submitform-have-an
title: "FormBuilderInterface::getForm() and ::submitForm() have an additional variadic argument"
description: "FormBuilderInterface::getForm() and ::submitForm() have an additional variadic argument"
drupal-core: ">=11.0"
source-url: https://www.drupal.org/node/3432087
change-record-nid: 3432087
introduced-in-version: "11.0.0"
introduced-in-branch: "11.0.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.0.x\
Introduced in version: 11.0.0\
Issue links: [#3431285](https://www.drupal.org/node/3431285)

FormBuilderInterface::getForm() and ::submitForm() now have their variadic argument explicited. Any implementation of the interface requires to comply to the new signature.

BEFORE

```php
public function getForm($form_arg);
public function submitForm($form_arg, FormStateInterface &$form_state);
```

AFTER

```php
public function getForm($form_arg, mixed ...$args);
public function submitForm($form_arg, FormStateInterface &$form_state, mixed ...$args);
```

*Source: [FormBuilderInterface::getForm() and ::submitForm() have an additional variadic argument](https://www.drupal.org/node/3432087), a Drupal core change record by [mondrake](https://www.drupal.org/user/1307444) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
