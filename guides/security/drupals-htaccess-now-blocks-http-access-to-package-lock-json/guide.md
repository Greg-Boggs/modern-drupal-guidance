---
name: drupals-htaccess-now-blocks-http-access-to-package-lock-json
title: "Drupal's .htaccess now blocks HTTP access to package-lock.json"
description: "Drupal's .htaccess now blocks HTTP access to package-lock.json"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3614259
change-record-nid: 3614259
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#3584532](https://www.drupal.org/node/3584532)

Drupal's `.htaccess` now blocks HTTP access to `package-lock.json`, alongside the existing protection for `package.json` and `yarn.lock`.

Core uses Yarn and does not produce a `package-lock.json` itself. Contributed or custom themes and modules that use npm can have one.

Sites with a customized `.htaccess` (including scaffold-managed sites that override the scaffolded file) need to apply the same change: replace `package\.json` with `package(-lock)?\.json` in the `FilesMatch` rule.

*Source: [Drupal's .htaccess now blocks HTTP access to package-lock.json](https://www.drupal.org/node/3614259), a Drupal core change record by [prudloff](https://www.drupal.org/user/3611858) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
