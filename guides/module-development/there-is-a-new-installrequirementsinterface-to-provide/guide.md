---
name: there-is-a-new-installrequirementsinterface-to-provide
title: "There is a new InstallRequirementsInterface to provide install time requirements."
description: "There is a new InstallRequirementsInterface to provide install time requirements."
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3492429
change-record-nid: 3492429
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3490843](https://www.drupal.org/node/3490843)

You can now provide install time requirements in a special class with the following requirements:

1. The filename must match the classname, for example, `ModuleInstallExampleRequirements.php` must contain the class `ModuleInstallExampleRequirements`
2. It must be in the `Drupal\<module>\Install\Requirements` namespace and located in a sub-directory of the module `src/Install/Requirements`
3. It must implement `Drupal\Core\Extension\InstallRequirementsInterface;`
4. It must have a `public getRequirements` method that returns an array of requirements as specified in `InstallRequirementsInterface`.
5. The code must not use any other code from the module as it loaded prior to the module being installed.

This works for profiles and modules.

These requirements will be merged with hook_requirements('install').

This is not a hook.

**Before:**

```php
<?php

declare(strict_types=1);

function module_install_example_requirements($phase) {
  return [];
}
```

**After:**

```php
<?php

declare(strict_types=1);

namespace Drupal\module_install_example\Install\Requirements;

use Drupal\Core\Extension\InstallRequirementsInterface;

class ModuleInstallExampleRequirements implements InstallRequirementsInterface {

  /**
   * {@inheritdoc}
   */
  public static function getRequirements(): array {
    return [];
  }

}
```

*Source: [There is a new InstallRequirementsInterface to provide install time requirements.](https://www.drupal.org/node/3492429), a Drupal core change record by [nicxvan](https://www.drupal.org/user/531480) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
