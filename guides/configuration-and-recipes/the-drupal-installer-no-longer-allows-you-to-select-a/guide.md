---
name: the-drupal-installer-no-longer-allows-you-to-select-a
title: "The Drupal installer no longer allows you to select a profile in the UI"
description: "The Drupal installer no longer allows you to select a profile in the UI"
drupal-core: ">=12.0"
source-url: https://www.drupal.org/node/3595589
change-record-nid: 3595589
introduced-in-version: "12.0.0"
introduced-in-branch: "12.0.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 12.0.x\
Introduced in version: 12.0.0\
Issue links: [#3520028](https://www.drupal.org/node/3520028)

The Drupal installer no longer displays the install profile selection form.

Previously, when installing Drupal via the UI, users were presented with a step to choose between available install profiles\
(e.g., Standard, Minimal, Umami). This step has been removed.

When no profile is pre-configured, the installer now defaults to the Standard install profile. Distributions, which inherently pre-select a profile, continue to work as before.

If you rely on selecting a non-default install profile during installation, this can still be done with Drush or other CLI tools, exactly as before.

The internal form class `\Drupal\Core\Installer\Form\SelectProfileForm` has been removed from core with no replacement. Custom installer tests that used `InstallerTestBase::setUpProfile()` will need to be updated, as that method and the associated form interaction no longer exist.

Alternatively you can use `hook_install_tasks_alter` to add the form back or use [https://www.drupal.org/project/profile_selector](https://www.drupal.org/project/profile_selector) to add it back automatically.

*Source: [The Drupal installer no longer allows you to select a profile in the UI](https://www.drupal.org/node/3595589), a Drupal core change record by [phenaproxima](https://www.drupal.org/user/205645) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
