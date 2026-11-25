---
name: form-api-callbacks-now-support-callables-supported-by-the
title: "Form API callbacks now support callables supported by the CallableResolver"
description: "Form API callbacks now support callables supported by the CallableResolver"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3548821
change-record-nid: 3548821
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3536726](https://www.drupal.org/node/3536726)

Form callbacks such as validate or submit callbacks now support any callables that `Drupal\Core\Utility\CallableResolver` supports.

These callbacks can now live in services and will support dependency injection.

Note that the callback no longer needs to be static.

Before:

```php
$form['#submit'][] = [FileFormHooks::class, 'settingsSubmit'];
...

public static function settingsSubmit(array &$form, FormStateInterface $form_state): void {
```

After:

```php
$form['#submit'][] = static::class . ':settingsSubmit';
...

public function settingsSubmit(array &$form, FormStateInterface $form_state): void {
```

In this example, the callable string is `Drupal\file\Hook\FileFormHooks:settingsSubmit` where `Drupal\file\Hook\FileFormHooks` is a registered service name.

**Note**

It first checks if the service container is available and uses the callable resolver service to get the callable from the definition. Otherwise, it returns the definition as is.

**⚠️ Warning**\
Using `$this` as a pointer for form callback `[$this, 'someMethod']` is an antipattern and should be avoided as the form will be serialized.

*Source: [Form API callbacks now support callables supported by the CallableResolver](https://www.drupal.org/node/3548821), a Drupal core change record by [nicxvan](https://www.drupal.org/user/531480) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
