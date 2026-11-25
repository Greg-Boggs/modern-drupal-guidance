---
name: added-hook-update-requirements-and-hook-update-requirements
title: "Added hook_update_requirements() and hook_update_requirements_alter()"
description: "Added hook_update_requirements() and hook_update_requirements_alter()"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3490852
change-record-nid: 3490852
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3490842](https://www.drupal.org/node/3490842)

This runs during the update check.

This hook is equivalent to the `hook_requirements($phase = 'update')`.

This runs after `hook_requirements()`.

This can be implemented using `#[Hook('update_requirements')]`

There is a `hook_update_requirements_alter()` that runs after all requirements hooks during update checks.

## Before

```php
/**
 * Implements hook_requirements().
 */
function google_tag_requirements($phase) {
  $requirements = [];
  $incompatible = FALSE;

  if ($phase === 'update') {
    $entities = \Drupal::entityTypeManager()->getStorage('google_tag_container')->loadMultiple();
    if (\Drupal::moduleHandler()->moduleExists('google_analytics')) {
      $ga_settings = \Drupal::config('google_analytics.settings');
      $accounts = $ga_settings->get('account');
      $metrics_dimensions = $ga_settings->get('custom.parameters');
      if ($entities && $accounts !== '' && $metrics_dimensions !== []) {
        $incompatible = TRUE;
      }
    }
    if ($incompatible) {
      // @todo provide a drush command usage example here.
      // Where users can choose between google_tag 1.x
      // and google_analytics for migration.
      $requirements['google_tag'] = [
        'title' => t('Google Tag'),
        'description' => t('In order to use Google Tag 2.x, you must decide the upgrade path between Google Tag 1.x and Google Analytics.'),
        'severity' => REQUIREMENT_ERROR,
        'value' => 'Google Tag 2.x is incompatible with Google Analytics while upgrading from 1.x.',
      ];
    }
  }
  return $requirements;
}
```

## After

```php
namespace Drupal\google_tag\Hook;

use Drupal\Core\Hook\Attribute\Hook;

/**
 * Update Requirements for google_tag.
 */
class GoogleTagRequirementsHook {

  /**
   * Implements hook_update_requirements().
   */
  #[Hook('update_requirements')]
  public function update(): array {
    $requirements = [];
    $incompatible = FALSE;

      $entities = \Drupal::entityTypeManager()->getStorage('google_tag_container')->loadMultiple();
      if (\Drupal::moduleHandler()->moduleExists('google_analytics')) {
       $ga_settings = \Drupal::config('google_analytics.settings');
        $accounts = $ga_settings->get('account');
        $metrics_dimensions = $ga_settings->get('custom.parameters');
        if ($entities && $accounts !== '' && $metrics_dimensions !== []) {
          $incompatible = TRUE;
        }
      }
      if ($incompatible) {
        // @todo provide a drush command usage example here.
        // Where users can choose between google_tag 1.x
        // and google_analytics for migration.
        $requirements['google_tag'] = [
          'title' => t('Google Tag'),
          'description' => t('In order to use Google Tag 2.x, you must decide the upgrade path between Google Tag 1.x and Google Analytics.'),
          'severity' => REQUIREMENT_ERROR,
          'value' => 'Google Tag 2.x is incompatible with Google Analytics while upgrading from 1.x.',
        ];
      }
    }
    return $requirements;
  }
}
```

*Source: [Added hook_update_requirements() and hook_update_requirements_alter()](https://www.drupal.org/node/3490852), a Drupal core change record by [nicxvan](https://www.drupal.org/user/531480) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
