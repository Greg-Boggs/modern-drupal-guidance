---
name: various-classes-and-methods-renamed-from-stage-to-sandbox
title: "Various classes and methods renamed from 'Stage' to 'Sandbox' in package manager"
description: "Various classes and methods renamed from 'Stage' to 'Sandbox' in package manager"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3521441
change-record-nid: 3521441
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3474876](https://www.drupal.org/node/3474876)

A number of classes and methods have been renamed in the Package Manager module in order to remove confusion about their purpose and intended use.

```php
core/modules/package_manager/src/Event/RequireEventTrait.php => EventWithPackageListTrait.php
core/modules/package_manager/src/Event/StageEvent.php => SandboxEvent.php
core/modules/package_manager/src/Event/PreOperationStageEvent.php => SandboxValidationEvent.php
core/modules/package_manager/src/Exception/StageFailureMarkerException.php => FailureMarkerExistsException.php
core/modules/package_manager/src/Exception/StageEventException.php => SandboxEventException.php
core/modules/package_manager/src/Exception/StageException.php => SandboxException.php
core/modules/package_manager/src/Exception/StageOwnershipException.php => SandboxOwnershipException.php
core/modules/package_manager/src/StageBase.php => SandboxManagerBase.php
core/modules/package_manager/src/Validator/StagedDBUpdateValidator.php => SandboxDatabaseUpdatesValidator.php
core/modules/package_manager/src/Validator/StageNotInActiveValidator.php => SandboxDirectoryValidator.php
core/modules/package_manager/tests/modules/package_manager_test_validation/src/StagedDatabaseUpdateValidator.php => TestSandboxDatabaseUpdatesValidator.php
core/modules/package_manager/tests/src/Kernel/StageBaseTest.php => SandboxManagerBaseTest.php
core/modules/package_manager/tests/src/Unit/RequireEventTraitTest.php => EventWithPackageListTraitTest.php
core/modules/package_manager/tests/src/Unit/StageNotInActiveValidatorTest.php => SandboxDirectoryValidatorTest.php
core/modules/package_manager/tests/src/Unit/StageBaseTest.php => SandboxManagerBaseTest.php
```

*Source: [Various classes and methods renamed from 'Stage' to 'Sandbox' in package manager](https://www.drupal.org/node/3521441), a Drupal core change record by [larowlan](https://www.drupal.org/user/395439) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
