---
name: core-javascript-development-now-requires-corepack-and-yarn-4
title: "Core JavaScript development now requires Corepack and Yarn 4"
description: "Core JavaScript development now requires Corepack and Yarn 4"
drupal-core: ">=11.0"
source-url: https://www.drupal.org/node/3428571
change-record-nid: 3428571
introduced-in-version: "11.0.0"
introduced-in-branch: "11.0.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.0.x\
Introduced in version: 11.0.0\
Issue links: [#3109556](https://www.drupal.org/node/3109556), [#3428122](https://www.drupal.org/node/3428122)

Drupal core uses the Yarn package manager for JavaScript dependency management. Since 2017 Drupal has always used Yarn 1, which is now considered "Yarn classic". Drupal has now upgraded to use Yarn 4.

To start using Yarn 4 locally you need to enable [Corepack](https://nodejs.org/api/corepack.html) on the command line, which will allow you to use Yarn 1 and Yarn 4 side-by-side. The `packageManager` key in package.json determines which version will be used (and falls back to Yarn 1 if not specified).

Corepack ships with all versions of NodeJS supported by Drupal core.

### Enabling corepack

Corepack only needs to be enabled once per environment, by running the following command on the command line:

```php
$ corepack enable
```

#### Permissions errors

On some systems you may need to run:

```php
sudo corepack enable
```

#### Old Yarn versions from other package managers

If Yarn 1 was previously installed by a different package manager, you may receive an error about a Yarn 1 and Yarn 4 mismatch, or a "command not found" error when attempting to enable corepack.

1. First, remove the globally installed version of Yarn 1. For example, for Homebrew:

   ```php
   brew uninstall
   ```

2. Then, follow [Yarn's instructions for installing corepack](https://yarnpkg.com/corepack):

   ```php
   npm install -g corepack
   corepack enable
   ```

*Source: [Core JavaScript development now requires Corepack and Yarn 4](https://www.drupal.org/node/3428571), a Drupal core change record by [longwave](https://www.drupal.org/user/246492) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
