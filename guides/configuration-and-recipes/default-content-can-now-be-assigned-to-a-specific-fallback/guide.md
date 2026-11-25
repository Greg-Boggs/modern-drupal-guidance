---
name: default-content-can-now-be-assigned-to-a-specific-fallback
title: "Default content can now be assigned to a specific fallback user"
description: "Default content can now be assigned to a specific fallback user"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3513697
change-record-nid: 3513697
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3513053](https://www.drupal.org/node/3513053)

Previously, when importing default content using core's `Importer` class, content belonging to a non-existent user would be reassigned to the first available user with an administrative role.

It is now possible to explicitly set which user the content is assigned to, by passing it as a parameter to `Importer::importContent`:

```php
$fallback_author = User::load(40);
$finder = new Finder('/path/to/some/default/content');
\Drupal::service(Importer::class)->importContent($finder, account: $fallback_author);
```

If no account is passed to `importContent`, it will try to use the first available user with an administrative role, same as before.

*Source: [Default content can now be assigned to a specific fallback user](https://www.drupal.org/node/3513697), a Drupal core change record by [phenaproxima](https://www.drupal.org/user/205645) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
