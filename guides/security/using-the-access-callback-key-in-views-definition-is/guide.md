---
name: using-the-access-callback-key-in-views-definition-is
title: "Using the 'access callback' key in views definition is deprecated"
description: "Using the 'access callback' key in views definition is deprecated"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3539918
change-record-nid: 3539918
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3539917](https://www.drupal.org/node/3539917)

Using the 'access callback' key in the definition of views handlers is now deprecated.

If you need to modify access rules then create a custom handler and override the access method.

Once this is removed the access will return false by default.

*Source: [Using the 'access callback' key in views definition is deprecated](https://www.drupal.org/node/3539918), a Drupal core change record by [nicxvan](https://www.drupal.org/user/531480) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
