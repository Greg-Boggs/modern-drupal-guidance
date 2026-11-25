---
name: added-hook-runtime-requirements-and-hook-runtime
title: "Added hook_runtime_requirements() and hook_runtime_requirements_alter()"
description: "Added hook_runtime_requirements() and hook_runtime_requirements_alter()"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3490851
change-record-nid: 3490851
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3490841](https://www.drupal.org/node/3490841)

This runs during the status report runtime check.

This hook is equivalent to the `hook_requirements($phase = 'runtime')`.

This runs after `hook_requirements()`.

This can be implemented using `#[Hook('runtime_requirements')]`

There is a `hook_runtime_requirements_alter()` that runs after all requirements checks during status report checks.

## Before

```php
/**
 * Implements hook_requirements().
 *
 * Display information about getting upload progress bars working.
 */
function file_requirements($phase) {
  $requirements = [];

  if ($phase != 'runtime') {
    return $requirements;
  }
  // Check the uploadprogress extension is loaded.
  if (extension_loaded('uploadprogress')) {
    $value = t('Enabled (<a href="http://pecl.php.net/package/uploadprogress">PECL uploadprogress</a>)');
    $description = NULL;
  }
  $requirements['file_progress'] = [
    'title' => t('Upload progress'),
    'value' => $value,
    'description' => $description,
  ];

  return $requirements;
}
```

## After

```php
namespace Drupal\file\Hook;

use Drupal\Core\Hook\Attribute\Hook;

/**
 * RuntimeRequirements for file.
 */
class FileRequirementsHook {

  /**
   * Implements hook_runtime_requirements().
   */
  #[Hook('runtime_requirements')]
  public function runtime(): array {
    $requirements = [];
    // Check the uploadprogress extension is loaded.
    if (extension_loaded('uploadprogress')) {
      $value = t('Enabled (<a href="http://pecl.php.net/package/uploadprogress">PECL uploadprogress</a>)');
      $description = NULL;
    }
    $requirements['file_progress'] = [
      'title' => t('Upload progress'),
      'value' => $value,
      'description' => $description,
    ];

    return $requirements;
  }
}
```

*Source: [Added hook_runtime_requirements() and hook_runtime_requirements_alter()](https://www.drupal.org/node/3490851), a Drupal core change record by [nicxvan](https://www.drupal.org/user/531480) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
