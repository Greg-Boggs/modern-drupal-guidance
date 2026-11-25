---
name: csslint-and-eslint-configuration-files-are-no-longer
title: "CSSLint and ESLint configuration files are no longer scaffolded"
description: "CSSLint and ESLint configuration files are no longer scaffolded"
drupal-core: ">=12.0"
source-url: https://www.drupal.org/node/3621537
change-record-nid: 3621537
introduced-in-version: "12.0.0"
introduced-in-branch: "12.0.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 12.0.x\
Introduced in version: 12.0.0\
Issue links: [#2876298](https://www.drupal.org/node/2876298)

Drupal 12 no longer provides the following linting configuration files in the web root through Composer scaffolding:

- `.csslintrc`
- `.eslintignore`
- `.eslintrc.json`

Drupal core replaced CSSLint with Stylelint in Drupal 8.4.0. The scaffolded CSSLint configuration is obsolete.

The scaffolded ESLint configuration extended core’s configuration, but projects still needed to install ESLint and its dependencies themselves. Projects should manage their own linting configuration and dependencies rather than rely on files scaffolded by Drupal core.

If your project relies on the scaffolded ESLint configuration, provide and maintain your own configuration, including any required file exclusions, and install the appropriate ESLint dependencies. You can still use Drupal core’s ESLint configuration as a starting point, but must configure this explicitly using the configuration format supported by your ESLint version.

If your project still uses CSSLint, migrate to Stylelint or maintain your own CSSLint configuration.

Projects that do not use these files for linting require no changes. This change does not remove the linting configuration used to develop Drupal core itself.

*Source: [CSSLint and ESLint configuration files are no longer scaffolded](https://www.drupal.org/node/3621537), a Drupal core change record by [longwave](https://www.drupal.org/user/246492) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
