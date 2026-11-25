---
name: drupal-11-requires-the-zlib-extension
title: "Drupal 11 requires the zlib extension"
description: "Drupal 11 requires the zlib extension"
drupal-core: ">=11.0"
source-url: https://www.drupal.org/node/3447815
change-record-nid: 3447815
introduced-in-version: "11.0.0"
introduced-in-branch: "11.0.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.0.x\
Introduced in version: 11.0.0\
Issue links: [#3439591](https://www.drupal.org/node/3439591)

Drupal 11 will require the `zlib` PHP extension.

`zlib` is enabled by default in the PHP source distribution and in all known binary distributions. If you are using a custom PHP build you may need to recompile or reinstall PHP with the `zlib` extension to be able to upgrade to Drupal 11.

See the [full PHP requirements](https://www.drupal.org/docs/getting-started/system-requirements/php-requirements) for additional details.

*Source: [Drupal 11 requires the zlib extension](https://www.drupal.org/node/3447815), a Drupal core change record by [longwave](https://www.drupal.org/user/246492) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
