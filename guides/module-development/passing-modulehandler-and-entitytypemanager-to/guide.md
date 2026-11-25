---
name: passing-modulehandler-and-entitytypemanager-to
title: "Passing ModuleHandler and EntityTypeManager to CommentLinkBuilder is deprecated"
description: "Passing ModuleHandler and EntityTypeManager to CommentLinkBuilder is deprecated"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3544527
change-record-nid: 3544527
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3544308](https://www.drupal.org/node/3544308)

`\Drupal\comment\CommentLinkBuilder::__construct()` has been changed. Passing the `module_handler` and `entity_type.manager` services as parameters is now deprecated.

Before:

```php
new CommentLinkBuilder(
  \Drupal::service('current_user'),
  \Drupal::service('comment.manager'),
  \Drupal::service('module_handler'),
  \Drupal::service('string_translation'),
  \Drupal::service('entity_type.manager'),
);
```

After:

```php
new CommentLinkBuilder(
  \Drupal::service('current_user'),
  \Drupal::service('comment.manager'),
  \Drupal::service('string_translation'),
);
```

*Source: [Passing ModuleHandler and EntityTypeManager to CommentLinkBuilder is deprecated](https://www.drupal.org/node/3544527), a Drupal core change record by [mstrelan](https://www.drupal.org/user/314289) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
