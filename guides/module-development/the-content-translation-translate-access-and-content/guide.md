---
name: the-content-translation-translate-access-and-content
title: "The content_translation_translate_access() and _content_translation_install_field_storage_definitions() functions are deprecated"
description: "The content_translation_translate_access() and _content_translation_install_field_storage_definitions() functions are deprecated"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3567484
change-record-nid: 3567484
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3566890](https://www.drupal.org/node/3566890)

The `content_translation_translate_access()` function is deprecated and its logic was moved in the `content_translation.manager` service as a new `::access()` method.

### Before

```php
$comment = \Drupal\comment\Entity\Comment::load(123);

if (content_translation_translate_access($comment)) {
  // Do something...
}

...

_content_translation_install_field_storage_definitions($settings->getTargetEntityTypeId());
```

### After

```php
$comment = \Drupal\comment\Entity\Comment::load(123);

// In a real case scenario properly inject the content_translation.manager service.
if (\Drupal::service('content_translation.manager')->access($comment)) {
  // Do something...
}

...

$this->installFieldStorageDefinitions($settings->getTargetEntityTypeId());
```

The protected method `\Drupal\comment\CommentLazyBuilders::access()`, which was only a wrapper around `content_translation_translate_access()` was also deprecated.

*Source: [The content_translation_translate_access() and \_content_translation_install_field_storage_definitions() functions are deprecated](https://www.drupal.org/node/3567484), a Drupal core change record by [claudiu.cristea](https://www.drupal.org/user/56348) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
