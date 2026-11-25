---
name: the-core-htaccess-no-longer-supports-statistics-module
title: "The core .htaccess no longer supports Statistics module"
description: "The core .htaccess no longer supports Statistics module"
drupal-core: ">=11.0"
source-url: https://www.drupal.org/node/3447819
change-record-nid: 3447819
introduced-in-version: "11.0.0-beta1"
introduced-in-branch: "11.0.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.0.x\
Introduced in version: 11.0.0-beta1\
Issue links: [#3341092](https://www.drupal.org/node/3341092)

The Statistics module has been removed from core and moved to a contrib project.

Sites that are using a customised `.htaccess` file should remove the following lines from it:

```php
# Allow access to Statistics module's custom front controller.
# Copy and adapt this rule to directly execute PHP files in contributed or
# custom modules or to run another PHP application in the same directory.
RewriteCond %{REQUEST_URI} !/core/modules/statistics/statistics\.php$
```

*Source: [The core .htaccess no longer supports Statistics module](https://www.drupal.org/node/3447819), a Drupal core change record by [longwave](https://www.drupal.org/user/246492) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
