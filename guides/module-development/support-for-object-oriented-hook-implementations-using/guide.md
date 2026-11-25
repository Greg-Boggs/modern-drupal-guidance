---
name: support-for-object-oriented-hook-implementations-using
title: "Support for object oriented hook implementations using autowired services; some ModuleHandler methods deprecated"
description: "Support for object oriented hook implementations using autowired services; some ModuleHandler methods deprecated"
drupal-core: ">=11.1"
source-url: https://www.drupal.org/node/3442349
change-record-nid: 3442349
introduced-in-version: "11.1.0"
introduced-in-branch: "11.1.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.1.x\
Introduced in version: 11.1.0\
Issue links: [#3442009](https://www.drupal.org/node/3442009)

1. Create a class in the Drupal\modulename\Hook namespace (or subdirectory). This will be automatically registered as an autowired service.
2. Use the new `Drupal\Core\Hook\Attribute\Hook` attribute either on methods or on the class. If it is on the class and the class doesn't have an `__invoke` method then a `method` argument is required.

The method implementing the hook has the same signature as the procedural counterpart.

A very simple example:

```php
function node_user_cancel($edit, UserInterface $account, $method) {
  // DO STUFF
}
```

after

```php
use Drupal\Core\Hook\Attribute\Hook;
use Drupal\user\UserInterface;

class NodeHooks {

  #[Hook('user_cancel')]
  public function userCancel($edit, UserInterface $account, $method) {
    // DO STUFF
  }

}
```

While classic hook implementations relied on a magic function name, now the class and method can have any name.

A method can have multiple Hook attributes if it implements multiple hooks. For example, node_comment_insert and node_comment_update have the exact same implementation and so they could become

```php
  #[Hook('comment_insert')]
  #[Hook('comment_update')]
  public function commentInsertOrUpdate(CommentInterface $comment) {
```

Also, a module can implement almost all hooks multiple times as documented on the `Hook` attribute itself.

## Deprecations

The following methods on ModuleHandler have been deprecated, without replacement. These are removed in Drupal 12.

- ModuleHandler::getHookInfo()
- ModuleHandler::writeCache()

## Backwards-compatible Hook implementation for Drupal versions from 10.1 to 11.0

Contrib modules which want to adopt this new approach to hooks and continue to support Drupal 10.1 and 11.0 are recommended to implement a new hook class, manually register that class as a service, and add a shim procedural implementation:

**node.module**

```php
use Drupal\Core\Hook\Attribute\LegacyHook;
use Drupal\node\Hook\NodeHooks;

// @phpstan-ignore-next-line
#[LegacyHook]
function node_user_cancel($edit, UserInterface $account, $method) {
  // This only needs to be returned if the hook previously had a return.
  return \Drupal::service(NodeHooks::class)->userCancel($edit, $account, $method);
}
```

**node.services.yml**

```php
services:
  Drupal\node\Hook\NodeHooks:
    class: Drupal\node\Hook\NodeHooks
    autowire: true
```

**src/Hook/NodeHooks.php**

```php
namespace Drupal\node\Hook;

use Drupal\Core\Hook\Attribute\Hook;
use Drupal\user\UserInterface;

class NodeHooks {

  #[Hook('user_cancel')]
  public function userCancel($edit, UserInterface $account, $method) {
     // User cancellation processing.
  }

}
```

With this approach, Drupal versions prior to this change (from 10.1 to 11.0) will call `node_user_cancel`, which in turn will call the new hook, and the LegacyHook attribute is ignored. Versions of Drupal from 11.1 will not call `node_user_cancel` because it is marked with the `#[LegacyHook]` attribute; instead, the new implementation will be called directly. This approach only supports Drupal 10.1 and later because in 10.1 aliases were added to core services for autowiring. The LegacyHook attribute class is not required for this to work (PHP ignores it), but for certain tools it is still better to include it. There is a Rector rule for making all these changes.

Since the attribute does not exist in all versions of Drupal it is recommended that you add a local phpstan ignore rule for each `#[LegacyHook]` attribute.

Once a contrib module converts all hooks to be OOP [a "hooks_converted: true" parameter](https://www.drupal.org/node/3490771) can be set in the container configuration to improve performance.

In a later Drupal version (Drupal 13 at the earliest), we expect that support for procedural hooks will be removed, at which time these services and the LegacyHook shims will need to be removed as well.

## Breaking changes

Conditionally defined hook implementations are not supported.

```php
if ($foo) {
  function foo_hook() {
  }
}
```

Update: if it is really badly necessary to dynamically define hooks, this [issue comment](https://www.drupal.org/project/field_encrypt/issues/3486465#comment-15851339) explains how to do it.

Also, any classes extending `ModuleHandler` are broken. As the class has been rewritten from ground up, any classes relying on the internals of it will not work and a code review is forced by the changed constructor. Once again, such code should be extremely rare. Consider rewriting it as a service decorator.

Update: Since `hook_module_implements_alter` is called during build time, it does not support service calls. Also, dynamic ordering in general is extremely unlikely to be supported in the future.

Procedural hooks that are defined in the src/ directory are not supported.

## Hooks that have had support added in follow up issues

Note that the following list is capturing the situation when this document was created. As the conversion of some hooks from this list is an ongoing process, you can check updates in the Follow-up issues converting hooks to OOP section, below.

[Hooks called by ModuleInstaller](https://www.drupal.org/node/3486506)

- hook_cache_flush()
- hook_module_preinstall()
- hook_module_preuninstall()
- hook_modules_installed()
- hook_modules_uninstalled()

These can be converted in modules.

- hook_theme_suggestion_HOOK()
- hook_theme_suggestions_HOOK_alter()

## Hooks that remain procedural

### Legacy meta hooks

- hook_hook_info()
- hook_module_implements_alter()

### Install/Update hooks

- hook_install()
- hook_install_tasks()
- hook_install_tasks_alter()
- hook_post_update_NAME()
- hook_removed_post_updates()
- hook_requirements()
- hook_schema()
- hook_uninstall()
- hook_update_dependencies()
- hook_update_last_removed()
- hook_update_N()

All of these are being looked at but for now they remain procedural.

### Theme hooks

- hook_preprocess_HOOK()
- hooks implemented BY themes
- Alter hooks implemented BY themes
- Hooks implemented by modules on BEHALF of a theme

Uppercase HOOK means a theme hook. (This is not at all confusing.) `hook_theme()` is INCLUDED in this change, it is not a theme hook. The registry explicitly calls `moduleHandler`:

```php
$result = $this->moduleHandler->invoke($name, 'theme', $args);
```

## Future Plans

While currently there's only a Hook attribute, we expect eventually every core hook will have a subclass of Hook. This is where the hook doxygen will live instead of an api.php file and it'll also allow dropping the name from the attribute, for eg `#[CommentInsert]`.

The base `#[Hook]` attribute will always work, the ability to fire and implement a hook without any additional code is considered a very important property of procedural hooks and we strive to maintain it.

This is just a plan and subject to change.

## Follow-up issues converting hooks to OOP

This is section is updated dynamically, as new hooks are converted to OOP, compared to the "Hooks that have had support added in follow up issues" list, that captured the situation as of the date this change record was created.

### Drupal 11.2

- [#3490851: Added hook_runtime_requirements() and hook_runtime_requirements_alter()](https://www.drupal.org/node/3490851)
- [#3490842: Create hook_update_requirements() and hook_update_requirements_alter()](https://www.drupal.org/project/drupal/issues/3490842)
- [#3492429: There is a new InstallRequirementsInterface to provide install time requirements.](https://www.drupal.org/node/3492429)
- [#3496491: Preprocess functions in modules now support object-oriented implementations](https://www.drupal.org/node/3496491)
- [#3504125: template_preprocess_HOOK are defined as callbacks in the theme hook](https://www.drupal.org/node/3504125)
- [#3489765: Includes for hook_hook_info implementations have been deprecated.](https://www.drupal.org/node/3489765)
- [#3496788: hook_module_implements_alter requires the #\[LegacyModuleImplementsAlter\] attribute](https://www.drupal.org/node/3496788)
- [#3496786: Hook implementations can now be removed with a #\[RemoveHook\] attribute.](https://www.drupal.org/node/3496786)
- [#3497308: Reorder hook implementations in other modules with the #\[ReorderHook\] attribute](https://www.drupal.org/node/3497308)
- [#3493962: Hook implementations can be ordered with an order parameter](https://www.drupal.org/node/3493962)

### Drupal 11.3

- [#3551652: Hooks in themes can now be OOP](https://www.drupal.org/node/3551652)

*Source: [Support for object oriented hook implementations using autowired services; some ModuleHandler methods deprecated](https://www.drupal.org/node/3442349), a Drupal core change record by [ghost of drupal past](https://www.drupal.org/user/3619592) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
