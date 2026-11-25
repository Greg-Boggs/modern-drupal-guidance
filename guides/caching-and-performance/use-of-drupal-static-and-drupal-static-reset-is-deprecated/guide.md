---
name: use-of-drupal-static-and-drupal-static-reset-is-deprecated
title: "Use of drupal_static() and drupal_static_reset() is deprecated"
description: "Use of drupal_static() and drupal_static_reset() is deprecated"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/2661204
change-record-nid: 2661204
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#2260187](https://www.drupal.org/node/2260187), [#3037054](https://www.drupal.org/node/3037054)

`drupal_static()` and `drupal_static_reset()` have been deprecated .

Before:\
`drupal_static()`

After:

```php
$cid = 'unique_identifier';
$cached = \Drupal::cache('memory')->get($cid);
$data = $cached->data ?? NULL;

...
\Drupal::cache('memory')->set($cid, $data);
```

Before:\
`drupal_static_reset()`

After:\
`\Drupal::cache('memory')->delete($cid);`

*Source: [Use of drupal_static() and drupal_static_reset() is deprecated](https://www.drupal.org/node/2661204), a Drupal core change record by [dawehner](https://www.drupal.org/user/99340) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
