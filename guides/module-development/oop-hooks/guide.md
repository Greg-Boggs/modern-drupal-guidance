---
name: oop-hooks
description: 'Implement Drupal hooks as autowired class methods with the #[Hook] attribute in src/Hook instead of procedural functions in the .module file.'
drupal-core: ">=11.1"
replaces:
  - "Procedural hook_*() functions in .module files"
  - "mymodule_form_alter() and other module-prefixed hook functions"
  - "\\Drupal::service() calls inside hook implementations"
  - "hook_module_implements_alter()"
  - "hook_requirements()"
deprecated-apis:
  - api: "hook_module_implements_alter() without #[LegacyModuleImplementsAlter]"
    deprecated-in: "11.2.0"
    removed-in: "12.0.0"
    replacement: "#[Hook(order: ...)], #[ReorderHook], #[RemoveHook]"
  - api: "hook_requirements() without #[LegacyRequirementsHook]"
    deprecated-in: "11.3.0"
    removed-in: "13.0.0"
    replacement: "#[Hook('runtime_requirements')], #[Hook('update_requirements')], InstallRequirementsInterface"
---

# Implement hooks with the `#[Hook]` attribute

Since Drupal 11.1, a module implements hooks as public methods on classes in its `src/Hook/` directory, each marked with the `#[Hook('hook_name')]` attribute. Core registers every such class as an autowired service, so the class receives its dependencies through the constructor instead of calling `\Drupal::service()`. This replaces the procedural `mymodule_hook_name()` functions in `mymodule.module`. Core has converted almost all of its own hooks this way.

{{ DRUPAL_STATUS() }}

{# Verified: core/lib/Drupal/Core/Hook/Attribute/Hook.php exists at 11.1.0 and not at 11.0.0. Discovery of src/Hook/ classes: core/lib/Drupal/Core/Hook/HookCollectorPass.php (filterIterator accepts src/Hook/). Autowired service registration: Hook.php docblock at 11.4.0. #}

What can be an OOP hook depends on the core version:

| Hook kind | OOP since |
|---|---|
| Hooks in modules, including `hook_theme()`, `hook_form_alter()`, entity hooks, `hook_cron()`, `hook_help()` | 11.1 |
| `hook_preprocess_HOOK()` in modules; ordering with `order:`, `#[ReorderHook]`, `#[RemoveHook]` | 11.2 |
| `hook_runtime_requirements()` and `hook_update_requirements()` replacing `hook_requirements()` | 11.2 (the procedural `hook_requirements()` is deprecated in 11.3) |
| Hooks in themes, including preprocess hooks, in `src/Hook/` of the theme | 11.3 |

{# Verified: preprocess collection via Registry::collectModulePreprocess() at 11.2.0, absent at 11.1.0. Order/ReorderHook/RemoveHook classes at 11.2.0, absent at 11.1.0. hook_runtime_requirements in module.api.php at 11.2.0. Deprecation messages in HookCollectorPass.php at 11.4.0: "deprecated in drupal:11.2.0 and removed in drupal:12.0.0" (module_implements_alter, CR https://www.drupal.org/node/3496788), "deprecated in drupal:11.3.0 and removed in drupal:13.0.0" (requirements, CR https://www.drupal.org/node/3549685). Theme OOP hooks: ThemeHookCollectorPass.php at 11.3.0; core/themes/olivero/src/Hook/ at 11.3.0. Note the Hook.php docblock still says "Hooks implemented by themes must remain procedural" at 11.4.0; core's own themes contradict it. #}

## Implementation

### 1. Create a hook class in `src/Hook/`

The class must live in the `Drupal\mymodule\Hook` namespace, which is the `src/Hook/` directory. Core only scans that directory. Group related hooks in one class, or split them into several classes by concern (`FormHooks`, `EntityHooks`): both work.

```php
<?php
// src/Hook/MymoduleHooks.php

declare(strict_types=1);

namespace Drupal\mymodule\Hook;

use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Hook\Attribute\Hook;
use Drupal\Core\Routing\RouteMatchInterface;
use Drupal\Core\StringTranslation\StringTranslationTrait;

/**
 * Hook implementations for mymodule.
 */
class MymoduleHooks {

  use StringTranslationTrait;

  // Constructor arguments are autowired by type. No services.yml entry is
  // needed: core registers this class as a service automatically.
  public function __construct(
    protected readonly ConfigFactoryInterface $configFactory,
  ) {}

  /**
   * Implements hook_help().
   */
  // The attribute takes the hook name without the "hook_" prefix.
  #[Hook('help')]
  public function help(string $route_name, RouteMatchInterface $route_match): ?string {
    if ($route_name === 'help.page.mymodule') {
      return '<p>' . $this->t('Adds a site name notice to the login form.') . '</p>';
    }
    return NULL;
  }

  /**
   * Implements hook_form_FORM_ID_alter() for the user login form.
   */
  // FORM_ID and other placeholders are filled in, as with procedural hooks.
  #[Hook('form_user_login_form_alter')]
  public function userLoginFormAlter(array &$form, FormStateInterface $form_state, string $form_id): void {
    $site_name = $this->configFactory->get('system.site')->get('name');
    $form['site_notice'] = [
      '#markup' => $this->t('You are logging in to @site.', ['@site' => $site_name]),
      '#weight' => -100,
    ];
  }

}
```

The method name is free. Name it after what the hook does or after the hook; the attribute is what core reads. The method's parameters are the same as the procedural hook's parameters, in the same order, by reference where the hook passes by reference.

### 2. Inject services that have no autowiring alias

Autowiring resolves a parameter by its type. Core defines aliases for most service interfaces (`EntityTypeManagerInterface`, `ConfigFactoryInterface`, `AccountInterface`, `MessengerInterface`, `TimeInterface` and others). A few types have several services and no alias: `LoggerInterface`, `CacheBackendInterface`, `QueueInterface`. Name the service with Symfony's `#[Autowire]` attribute.

```php
<?php
// src/Hook/CronHooks.php

declare(strict_types=1);

namespace Drupal\mymodule\Hook;

use Drupal\Component\Datetime\TimeInterface;
use Drupal\Core\Hook\Attribute\Hook;
use Drupal\Core\State\StateInterface;
use Psr\Log\LoggerInterface;
use Symfony\Component\DependencyInjection\Attribute\Autowire;

/**
 * Cron hook implementations for mymodule.
 */
class CronHooks {

  public function __construct(
    protected readonly StateInterface $state,
    protected readonly TimeInterface $time,
    // The channel service is defined in mymodule.services.yml (see below).
    #[Autowire(service: 'logger.channel.mymodule')]
    protected readonly LoggerInterface $logger,
  ) {}

  /**
   * Implements hook_cron().
   */
  #[Hook('cron')]
  public function cron(): void {
    $this->state->set('mymodule.last_cron', $this->time->getRequestTime());
    $this->logger->info('mymodule cron ran.');
  }

}
```

```yaml
# mymodule.services.yml
services:
  logger.channel.mymodule:
    parent: logger.channel_base
    arguments: ['mymodule']
```

### 3. Implement several hooks on one method, or one hook several times

`#[Hook]` is repeatable. Add one attribute per hook to make one method handle several hooks with the same signature:

```php
  // Inside a hook class. Add: use Drupal\node\NodeInterface;

  /**
   * Implements hook_node_insert() and hook_node_update().
   */
  #[Hook('node_insert')]
  #[Hook('node_update')]
  public function nodeWrite(NodeInterface $node): void {
    // ...
  }
```

A module may also implement the same hook in several classes, for example two `form_alter` implementations for unrelated forms. Exceptions: `hook_help()`, `hook_mail()`, `hook_library_info_build()` and `hook_node_update_index()` allow one implementation per module.

### 4. Move or delete the procedural functions

Delete each procedural function once its OOP replacement exists. Keeping both runs the hook twice. When nothing is left in `mymodule.module` but the `@file` docblock, delete the file.

These hooks must stay procedural, in `mymodule.install` or `mymodule.module`:

- `hook_install()`, `hook_uninstall()`, `hook_schema()`, `hook_update_N()`, `hook_post_update_NAME()` (in `mymodule.post_update.php`), `hook_update_last_removed()`, `hook_removed_post_updates()`, `hook_update_dependencies()`, `hook_install_tasks()`, `hook_install_tasks_alter()`.
- `hook_hook_info()`.

### 5. Optional: control order (11.2 and later)

{{ DRUPAL_STATUS(">=11.2") }}

Use the `order` argument instead of `hook_module_implements_alter()`, which is deprecated in 11.2 and removed in 12.0.

```php
  // Inside a hook class. Add:
  // use Drupal\Core\Hook\Order\Order;
  // use Drupal\Core\Hook\Order\OrderAfter;

  // Run after every other implementation.
  #[Hook('entity_type_alter', order: Order::Last)]
  public function entityTypeAlter(array &$entity_types): void {}

  // Run after the named modules' implementations.
  #[Hook('form_alter', order: new OrderAfter(modules: ['content_moderation']))]
  public function formAlter(array &$form, FormStateInterface $form_state, string $form_id): void {}
```

To reorder or remove another module's implementation, put `#[ReorderHook('hook_name', OtherHooks::class, 'method', Order::First)]` or `#[RemoveHook('hook_name', OtherHooks::class, 'method')]` on any of your hook classes or methods.

### 6. Optional: requirements hooks (11.2 and later)

{{ DRUPAL_STATUS(">=11.2") }}

`hook_requirements($phase)` is split by phase. Status report and update checks become OOP hooks; install-time checks become a static class, because the container is not available during install.

```php
  // Shown on the status report page.
  #[Hook('runtime_requirements')]
  public function runtimeRequirements(): array {
    return [];
  }

  // Checked before update.php runs updates.
  #[Hook('update_requirements')]
  public function updateRequirements(): array {
    return [];
  }
```

Install-time checks go in `src/Install/Requirements/MymoduleRequirements.php`, a class implementing `Drupal\Core\Extension\InstallRequirementsInterface` with a static `getRequirements(): array` method.

### 7. Optional: skip the procedural scan (11.2 and later)

When a module has no procedural hooks left, tell core not to scan its `.module` file for them. This is a small build-time speedup, and it is what core modules do.

```yaml
# mymodule.services.yml
parameters:
  mymodule.skip_procedural_hook_scan: true
```

## Rules

- DO put hook classes in `src/Hook/`. A class with `#[Hook]` methods anywhere else is never discovered.
- DO inject services through the constructor. DO NOT call `\Drupal::service()`, `\Drupal::entityTypeManager()` or other static wrappers inside a hook class: the class is a service and gets its dependencies like one.
- DO NOT register hook classes in `services.yml` on 11.1 and later. Core registers them, using the class name as the service ID. Register one manually only if it needs arguments autowiring cannot provide.
- DO NOT leave a procedural copy of a converted hook unless it carries `#[LegacyHook]` (see below). Two unmarked implementations both run.
- DO NOT implement `hook_module_implements_alter()` for new code. Use `order:`, `#[ReorderHook]` and `#[RemoveHook]`.
- DO use the hook name without the `hook_` prefix and without the module name: `#[Hook('form_alter')]`, not `#[Hook('hook_form_alter')]` or `#[Hook('mymodule_form_alter')]`.

## Older supported core versions

On core before 11.1, `#[Hook]` does nothing and only procedural functions run. A module that must support Drupal 10 as well as 11.1 and later keeps the hook class as the real implementation and adds a thin procedural function marked `#[LegacyHook]` for each hook. On 11.1 and later core skips functions marked `#[LegacyHook]`, so the hook runs once on every version. On 10.x the attribute class does not exist, which is harmless: PHP only resolves an attribute class when code asks for it.

{{ DRUPAL_STATUS("^10.3 || ~11.0.0") }}

```php
<?php
// mymodule.module

/**
 * @file
 * Procedural wrappers for core versions before 11.1.
 */

declare(strict_types=1);

use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Hook\Attribute\LegacyHook;
use Drupal\mymodule\Hook\MymoduleHooks;

/**
 * Implements hook_form_FORM_ID_alter().
 */
#[LegacyHook]
function mymodule_form_user_login_form_alter(array &$form, FormStateInterface $form_state, string $form_id): void {
  \Drupal::service(MymoduleHooks::class)->userLoginFormAlter($form, $form_state, $form_id);
}
```

Before 11.1 core does not register hook classes as services, so register each one in `services.yml`. On 11.1 and later this entry is harmless.

```yaml
# mymodule.services.yml
services:
  Drupal\mymodule\Hook\MymoduleHooks:
    class: Drupal\mymodule\Hook\MymoduleHooks
    autowire: true
```

The same approach applies across 11.x minors: on 11.1, keep module preprocess hooks procedural; on 11.1 and 11.2, keep theme hooks procedural in `mytheme.theme`. For `hook_requirements()` on code that supports core before 11.2, keep the procedural function, mark it `#[LegacyRequirementsHook]`, and add the OOP hooks; 11.3 and later skip the procedural one.

To find the project's core version, read `drupal/core` in `composer.lock`, or `\Drupal::VERSION` in `core/lib/Drupal.php`. For a contrib module, follow `core_version_requirement` in its `.info.yml`.

## Verify

```bash
# Rebuild the container so new hook classes are discovered.
drush cache:rebuild
# Confirm the hook class is registered as a service (Drupal 11.1 and later).
drush php:eval 'var_dump(\Drupal::hasService("Drupal\mymodule\Hook\MymoduleHooks"));'
# Check that core found an implementation of a hook in mymodule.
drush php:eval 'var_dump(\Drupal::moduleHandler()->hasImplementations("cron", "mymodule"));'
```

{# Verified: HookCollectorPass registers a hook class only if the container has no definition for it yet (hasDefinition() check at 11.4.0), so a manual services.yml entry is kept. ModuleHandlerInterface::hasImplementations(string $hook, $modules) at 11.4.0. #}
