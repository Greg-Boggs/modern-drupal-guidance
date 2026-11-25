---
name: several-update-functions-in-update-inc-are-deprecated
title: "Several update_* functions in update.inc are deprecated"
description: "Several update_* functions in update.inc are deprecated"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3013060
change-record-nid: 3013060
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#3391683](https://www.drupal.org/node/3391683)

Several functions in `includes/update.inc` are deprecated and replaced with methods in the class `\Drupal\Core\Update\DatabaseUpdate`.

- Functions deprecated in #3391683
- Before/After Example

## Functions deprecated in [#3391683: Convert initial functions in update.inc file to a class](https://www.drupal.org/project/drupal/issues/3391683)

| Deprecated function | Method |
| --- | --- |
| `update_system_schema_requirements()` | `DatabaseUpdate::systemSchemaRequirements()` |
| `update_check_requirements()` | `DatabaseUpdate::getRequirements()` |
| `_update_fix_missing_schema()` | No replacement. This function was for internal use only. |
| `update_do_one($module, $number, $dependency_map, $context)` | `DatabaseUpdate::doOne($module, $number, $dependency_map, $context)` |

## Before/After Example

Requiring the update.inc file is no longer required in some scenarios.

### Before

```php
use \Drupal\Core\Extension\Requirement\RequirementSeverity;

require_once 'core/includes/update.inc';

$requirements = update_check_requirements();
foreach ($requirements as $key => $info) {
  if ($info['severity'] === RequirementServerity::Error) {
  }
}
```

### After

```php
   use \Drupal\Core\Extension\Requirement\RequirementSeverity;
   use \Drupal\Core\Update\DatabaseUpdate;

   $requirements = \Drupal::service(DatabaseUpdate::class)->getRequirements();
   foreach ($requirements as $key => $info) {
     if ($info['severity'] === RequirementServerity::Error) {
     }
  }
```

*Source: [Several update\_\* functions in update.inc are deprecated](https://www.drupal.org/node/3013060), a Drupal core change record by [voleger](https://www.drupal.org/user/3260314) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
