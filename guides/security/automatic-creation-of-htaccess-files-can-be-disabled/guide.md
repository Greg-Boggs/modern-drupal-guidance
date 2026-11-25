---
name: automatic-creation-of-htaccess-files-can-be-disabled
title: "Automatic creation of .htaccess files can be disabled"
description: "Automatic creation of .htaccess files can be disabled"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3525119
change-record-nid: 3525119
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#360057](https://www.drupal.org/node/360057)

Sites not using the Apache HTTP server or that use a web server configuration that protects writable file directories can disable the creation of the `.htaccess`.

To disable file creation `auto_create_htaccess` must be set to `FALSE` in the site `settings.php` file.

#### Example

`$settings['auto_create_htaccess'] = FALSE`

If disabled, make sure to follow the guide for [ensuring directories are secure and prevent scripts from being executed](https://www.drupal.org/docs/administering-a-drupal-site/security-in-drupal/securing-file-permissions-and-ownership).

*Source: [Automatic creation of .htaccess files can be disabled](https://www.drupal.org/node/3525119), a Drupal core change record by [kim.pepper](https://www.drupal.org/user/370574) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
