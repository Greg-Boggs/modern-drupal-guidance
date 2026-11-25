---
name: update-fetch-with-http-fallback-setting-is-deprecated
title: "update_fetch_with_http_fallback setting is deprecated"
description: "update_fetch_with_http_fallback setting is deprecated"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3591920
change-record-nid: 3591920
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#3591513](https://www.drupal.org/node/3591513)

The `update_fetch_with_http_fallback setting` is deprecated.

This setting allowed sites to fall back to HTTP when HTTPS requests to updates.drupal.org failed. Using HTTP for update requests exposes sites to potential man-in-the-middle attacks and should not be used. Sites that explicitly set `$settings['update_fetch_with_http_fallback'] = TRUE;` in `settings.php` should remove that line.

If your site relies on this setting because HTTPS connections to updates.drupal.org are failing, resolve the underlying SSL/TLS issue instead. See [https://www.drupal.org/docs/system-requirements/php-requirements#openssl](https://www.drupal.org/docs/system-requirements/php-requirements#openssl)

*Source: [update_fetch_with_http_fallback setting is deprecated](https://www.drupal.org/node/3591920), a Drupal core change record by [macsim](https://www.drupal.org/user/2664025) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
