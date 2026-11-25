---
name: new-twigallowed-method-attribute
title: "New TwigAllowed method attribute"
description: "New TwigAllowed method attribute"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3551699
change-record-nid: 3551699
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#2595805](https://www.drupal.org/node/2595805)

The access of Twig templates to object methods can now allowed by the TwigAllowed attribute.\
Example:

```php
class AttributeAllowTestClass {

  #[\Drupal\Core\Template\Attribute\TwigAllowed]
  public function allowed(): string {
    return __METHOD__;
  }

  public function notAllowed(): string {
    return __METHOD__;
  }

  // Still allowed, but soon deprecated.
  public function getFoo(): string {
    return 'foo';
  }

}
```

Note that

- The legacy behavior of allowing [methods with magic prefixes](https://www.drupal.org/node/2595803) is still working, but may be deprecated in the future.
- The [legacy method of adjusting said patterns via settings.php](https://www.drupal.org/node/2595803) is still working, but discouraged.

*Source: [New TwigAllowed method attribute](https://www.drupal.org/node/3551699), a Drupal core change record by [geek-merlin](https://www.drupal.org/user/229048) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
