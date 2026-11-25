---
name: drupal-core-utility-error-currenterrorhandler-is-deprecated
title: "\\Drupal\\Core\\Utility\\Error::currentErrorHandler is deprecated"
description: "\\Drupal\\Core\\Utility\\Error::currentErrorHandler is deprecated"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3529500
change-record-nid: 3529500
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3526515](https://www.drupal.org/node/3526515)

`\Drupal\Core\Utility\Error::currentErrorHandler is deprecated`, use [`get_error_handler()`](https://www.php.net/manual/en/function.get-error-handler.php)instead.

The `get_error_handler` function is added in PHP 8.5. Until Drupal requires PHP 8.5 a polyfill is provided via [`symfony/polyfill-php85`](https://github.com/symfony/polyfill-php85).

*Source: [\Drupal\Core\Utility\Error::currentErrorHandler is deprecated](https://www.drupal.org/node/3529500), a Drupal core change record by [mstrelan](https://www.drupal.org/user/314289) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
