---
name: tests-with-phpunit-10-attributes-are-now-supported
title: "Tests with PHPUnit 10 attributes are now supported"
description: "Tests with PHPUnit 10 attributes are now supported"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3447698
change-record-nid: 3447698
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3497431](https://www.drupal.org/node/3497431), [#3446380](https://www.drupal.org/node/3446380)

Prior to PHPUnit 10, annotations in special PHP comments, so-called “DocBlocks” or “doc-comments”, were the only means of attaching metadata to code units.

PHPUnit 10 introduced PHP 8 attributes as a replacement for annotations. Annotations are deprecated in PHUnit 11 and will no longer be supported in PHPUnit 12.

Drupal testing framework executed via `run-tests.sh` now supports executing tests that use attributes in place of annotations.

**Mixing attributes and annotations in the same test class or method**

Note that per [https://docs.phpunit.de/en/10.5/annotations.html](https://docs.phpunit.de/en/10.5/annotations.html),

> PHPUnit will first look for metadata in attributes before it looks for annotations in comments. When metadata is found in attributes, metadata in comments is ignored.

which means that mixing attributes and annotations in the same test class or method needs to be done carefully - there's a risk that a partial attributes implementation shadows a more complete annotations one, with unexpected side effects.

**How to migrate tests**

The syntax and semantics of test attributes are those defined by the PHPUnit project and documented in [this page](https://docs.phpunit.de/en/10.5/attributes.html) for PHPUnit 10.5, or the equivalent page in later PHPUnit versions.

The most complete guide on how to convert tests from using annotations to use attributes instead is outlined in this GitHub issue: [Support PHP 8 attributes for adding metadata to test classes and test methods as well as tested code units](https://github.com/sebastianbergmann/phpunit/issues/4502).

The following Drupal-specific conventions need to be followed, too:

- The `@group legacy` annotation, that in old tests was used to indicate to the Symfony PHPUnit-bridge tests that were expected to check deprecations, must be replaced by the `#[IgnoreDeprecations]` attribute.
- The `@covers` annotation on the method level has no correspondence to any attribute in PHPUnit 10. There was some discussion in the PHPUnit project to reintroduce it ([here](https://github.com/sebastianbergmann/phpunit/issues/5558) and [here](https://github.com/sebastianbergmann/phpunit/issues/5175)) but so far (May 2025) this is off the table. These annotations should be removed from tests, or in case it's relevant to keep memory of the method coverage, it suggested the annotation be changed to `@legacy-covers`.

**Old style tests:\**

```php
<?php

declare(strict_types=1);

namespace Drupal\KernelTests\Core\Archiver;

use Drupal\Core\Archiver\Tar;

/**
 * @coversDefaultClass \Drupal\Core\Archiver\Tar
 * @group tar
 */
class TarTest extends ArchiverTestBase {
  
  /**
   * @covers ::foo()
   */
  public function testFoo(): bool {
    ...
  }
  
  ...
}
```

**New style tests:\**

```php
<?php

declare(strict_types=1);

namespace Drupal\KernelTests\Core\Archiver;

use Drupal\Core\Archiver\Tar;
use PHPUnit\Framework\Attributes\CoversClass;
use PHPUnit\Framework\Attributes\Group;

/**
 * Tests Drupal\Core\Archiver\Tar.
 */
#[CoversClass(Tar::class)]
#[Group('tar')]
class TarTest extends ArchiverTestBase {

  /**
   * @legacy-covers ::foo()
   */
  public function testFoo(): bool {
    ...
  }
  
  ...
}
```

*Source: [Tests with PHPUnit 10 attributes are now supported](https://www.drupal.org/node/3447698), a Drupal core change record by [mondrake](https://www.drupal.org/user/1307444) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
