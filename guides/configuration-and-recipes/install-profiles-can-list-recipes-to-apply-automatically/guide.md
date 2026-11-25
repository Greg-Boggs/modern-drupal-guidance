---
name: install-profiles-can-list-recipes-to-apply-automatically
title: "Install profiles can list recipes to apply automatically"
description: "Install profiles can list recipes to apply automatically"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3612237
change-record-nid: 3612237
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#3605549](https://www.drupal.org/node/3605549)

It is now possible for install profiles to apply recipes, in addition to installing modules and themes, by listing the recipes in their info file:

```php
recipes:
  - core/recipes/article_content_type
  - core/recipes/document_media_type
```

At the moment, only core recipes are supported, but support will be added for installing recipes from the main recipes directory (usually a `recipes` directory next to the web root) as well.

*Source: [Install profiles can list recipes to apply automatically](https://www.drupal.org/node/3612237), a Drupal core change record by [phenaproxima](https://www.drupal.org/user/205645) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
