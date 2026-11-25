---
name: tests-will-report-missing-return-types-in-drupal-code
title: "Tests will report missing return types in Drupal code"
description: "Tests will report missing return types in Drupal code"
drupal-core: ">=12.0"
source-url: https://www.drupal.org/node/3579056
change-record-nid: 3579056
introduced-in-version: "12.0.0"
introduced-in-branch: "12.0.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 12.0.x\
Introduced in version: 12.0.0\
Issue links: [#3486376](https://www.drupal.org/node/3486376)

Drupal uses Symfony's DebugClassLoader in tests, which detects missing return types in code by analysing docblocks. This means that libraries such as Symfony can add `@return` annotations to indicate to users of their code that return types will be added in the next major version.

Because all Drupal code shares the `\Drupal` namespace, these checks were not triggered for missing return types in Drupal modules and themes. The DebugClassLoader has been extended so contrib modules and custom code will now be notified via deprecations that they should add return types. In a future major release, Drupal core will then add the return types.

This change means that if you implement a Drupal interface or override an upstream method without adding a return type, you will start to see deprecations in the following format:

```php
Method "Drupal\Core\Security\TrustedCallbackInterface::trustedCallbacks()" might add "array" as a native return type declaration in the future. Do the same in implementation "Drupal\my_module\Plugin\views\field\MyField" now to avoid errors or add an explicit @return annotation to suppress this message.
```

*Source: [Tests will report missing return types in Drupal code](https://www.drupal.org/node/3579056), a Drupal core change record by [longwave](https://www.drupal.org/user/246492) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
