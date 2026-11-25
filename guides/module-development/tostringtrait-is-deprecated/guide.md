---
name: tostringtrait-is-deprecated
title: "ToStringTrait is deprecated"
description: "ToStringTrait is deprecated"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3548961
change-record-nid: 3548961
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3548957](https://www.drupal.org/node/3548957)

The trait is deprecated because since PHP 7.4 exception handling is not required and since PHP 8.0 there's [Stringable](https://www.php.net/manual/class.stringable.php) interface

`__toString` method must be implemented directly without using `\Drupal\Component\Utility\ToStringTrait`.

**Before:**

```php
use \Drupal\Component\Utility\ToStringTrait;

class Example {

  use ToStringTrait;

  public function render(): string {
    return 'Example';
  }

}
```

**After:**

```php
class Example implements \Stringable {

  public function render(): string {
    return 'Example';
  }

  /**
   * {@inheritdoc}
   */
  public function __toString(): string {
    return $this->render();
  }

}
```

*Source: [ToStringTrait is deprecated](https://www.drupal.org/node/3548961), a Drupal core change record by [andypost](https://www.drupal.org/user/118908) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
