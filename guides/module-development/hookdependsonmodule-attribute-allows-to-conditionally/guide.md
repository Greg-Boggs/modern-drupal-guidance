---
name: hookdependsonmodule-attribute-allows-to-conditionally
title: "HookDependsOnModule attribute allows to conditionally register hooks"
description: "HookDependsOnModule attribute allows to conditionally register hooks"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3548805
change-record-nid: 3548805
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#3524377](https://www.drupal.org/node/3524377)

Sometimes, modules provide hooks for another module that they don't depend on, and then also use injected dependencies.

Until now, those dependencies had to be conditional, and runtime conditions had to be added to check whether or not that module providing those dependencies was enabled.

The `HookDependsOnModule` attribute can be added on specific methods or a whole class. Multiple attributes can be added if hooks should only run if two different modules are installed. The hook doesn't need to be from the given module. The `NodeSearchHooks` example below implements `hook_cron()` that's only needed when search module is installed. Hook classes are only registered on the container if there is at least one active hook, which allows such classes have services provided by that module injected as required properties.

### Before

```php
class NodeSearchHooks {

  use StringTranslationTrait;

  public function __construct(
    // ...
    protected readonly ?SearchIndexInterface $searchIndex = NULL,
  ) {}

  #[Hook('cron')]
  public function cron(): void {
    if ($this->moduleHandler->moduleExists('search')) {
      // ...
    }
  }
```

### After

```php
#[HookDependsOnModule('search')]
class NodeSearchHooks {

  use StringTranslationTrait;

  public function __construct(
    // ...
    protected readonly SearchIndexInterface $searchIndex,
  ) {}

  #[Hook('cron')]
  public function cron(): void {
    // ...
  }
```

*Source: [HookDependsOnModule attribute allows to conditionally register hooks](https://www.drupal.org/node/3548805), a Drupal core change record by [berdir](https://www.drupal.org/user/214652) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
