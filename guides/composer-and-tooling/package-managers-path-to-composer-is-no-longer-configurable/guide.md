---
name: package-managers-path-to-composer-is-no-longer-configurable
title: "Package Manager's path to Composer is no longer configurable"
description: "Package Manager's path to Composer is no longer configurable"
drupal-core: ">=11.2.5"
source-url: https://www.drupal.org/node/3540264
change-record-nid: 3540264
introduced-in-version: "11.2.5"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.5\
Issue links: [#3540215](https://www.drupal.org/node/3540215)

For security reasons, Package Manager no longer allows you to store the path of Composer and rsync in configuration. Sites will need to change their settings according to their situation.

#### Step 1: Composer

Package Manager will only look for Composer in three places:

1. Locally installed (preferred): Package Manager will try to find Composer at `vendor/composer/composer/bin/composer`, and it will use that if it exists.
2. A new `package_manager_composer_path` setting.
3. Otherwise, it will look for Composer in the web server's `PATH`.

This behavior cannot be overridden. The recommended way to ensure that Package Manager has access to the correct version of Composer is to add it directly to your project's dependencies. To do that, run the following commands in your project root:

```php
composer config allow-plugins.drupal/core-vendor-hardening true
composer config extra.drupal-core-vendor-hardening --merge --json '{"composer/composer": false}'
composer require "drupal/core-vendor-hardening:^11.2.4" "composer/composer:^2.7"
```

If adding Composer to your project isn't possible, or you would rather not add it to your dependencies, you can add this to `settings.php` instead:

```php
$settings['package_manager_composer_path'] = 'PATH_TO_COMPOSER';
```

If you are already successfully using an auto-detected copy of Composer, this step is optional, but still recommended.

#### Step 2: rsync

Package Manager will look for rsync in two places:

1. A new `package_manager_rsync_path` setting.
2. The web server's `PATH` (preferred; rsync is commonly available here).

To explicitly set the path to rsync, add the following to your site's `settings.php`:

```php
$settings['package_manager_rsync_path'] = 'PATH_TO_RSYNC';
```

If you are already successfully using an auto-detected copy of rsync, you can skip this step.

#### Step 3: Final clean-up

When the previous steps are done, you can safely delete the dead configuration, which will clear out any related warnings from Drupal's status report page. With Drush, you can run this command from your project root:

```php
vendor/bin/drush config:delete package_manager.settings executables
```

Related issue: [#3534278: The vendor hardening plugin should provide a way to skip cleaning certain packages](https://www.drupal.org/project/drupal/issues/3534278)

*Source: [Package Manager's path to Composer is no longer configurable](https://www.drupal.org/node/3540264), a Drupal core change record by [phenaproxima](https://www.drupal.org/user/205645) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
