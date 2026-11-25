---
name: package-manager-can-allow-composer-operations-directly-on
title: "Package Manager can allow Composer operations directly on the live site in some situations"
description: "Package Manager can allow Composer operations directly on the live site in some situations"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3506770
change-record-nid: 3506770
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3503699](https://www.drupal.org/node/3503699)

Package manager can now, in some circumstances, operate directly on the live site instead of a sandbox. For example, if you have a site on your local machine, of which you are the only user, and you want to use Project Browser to add modules.

Previously, Package Manager would *always* create a separate, sandboxed copy of the Drupal site, run Composer on it, and then copy the changes back. This minimizes risk to the live site, but can also lead to poor performance. This is a reasonable trade-off because keeping the Drupal site unbroken is Package Manager's main concern.

To operate directly on the live site, two conditions must be met.

1. A new setting, `package_manager_allow_direct_write`, must be set to TRUE.
2. Individual subclasses of `\Drupal\package_manager\SandboxManagerBase` must have the `\Drupal\package_manager\Attribute\AllowDirectWrite` attribute applied to them. For example:

```php
use Drupal\package_manager\Attribute\AllowDirectWrite;
use Drupal\package_manager\SandboxManagerBase;

#[AllowDirectWrite]
class MyStage extends SandboxManagerBase {

  // ...magic time

}
```

Classes that extend MyStage will *not* inherit the attribute.

This is a reasonable balance between safety and flexibility. Package Manager will continue to prioritize safety. But developers who understand the intricacies of their specific use cases will be able to opt out of sandboxing.

If in doubt, *don't* add `AllowDirectWrite` to your SandboxManagerBase subclass; only add it if you know exactly what you're doing, and why.

*Source: [Package Manager can allow Composer operations directly on the live site in some situations](https://www.drupal.org/node/3506770), a Drupal core change record by [phenaproxima](https://www.drupal.org/user/205645) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
