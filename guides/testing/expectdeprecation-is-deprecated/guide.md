---
name: expectdeprecation-is-deprecated
title: "expectDeprecation() is deprecated"
description: "expectDeprecation() is deprecated"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3545276
change-record-nid: 3545276
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3497124](https://www.drupal.org/node/3497124), [#3552827](https://www.drupal.org/node/3552827)

Deprecation expectations in tests were introduced through `symfony/phpunit-bridge` well before PHPUnit started providing native support.

This was happening by marking deprecated scope with the `@group legacy` annotation and by expecting deprecations via calls to `expectDeprecation()`.

When we started using PHPUnit 10, Drupal dropped the dependency to `symfony/phpunit-bridge`, and added our own custom `DeprecationHandler` to replace it, retaining the same logic.

In the meantime, PHPUnit evolved and in version 11.0, the `expectUserDeprecationMessage()` and `expectUserDeprecationMessageMatches()` methods were introduced with basically the same purpose.

Usage of `@group legacy` has already been replaced by the `#[IgnoreDeprecations]` attribute as part of [#3535662: \[meta\] Convert test metadata from annotations to attributes](https://www.drupal.org/project/drupal/issues/3535662).

`expectDeprecation()` is now deprecated in favor of the `expectUserDeprecationMessage()` and `expectUserDeprecationMessageMatches()` methods.

Besides, the entire `ExpectDeprecationTrait` is deprecated. Normally, this trait would not have to be imported in concrete tests as it is already being imported in the base test classes (Unit, Kernel, Functional, Build) from where concrete tests extend from.

**Differences in PHPUnit implementation vs. Symfony legacy**

Please note the following differences in behavior of the native PHPUnit implementation.

1. When using `expectUserDeprecationMessage()`, the deprecation message must be exact, i.e. you can no longer use Symfony-style `%x` placeholders to match patterns. The `expectUserDeprecationMessageMatches()` method can be used to match patterns using regular expressions instead, in case that's needed.
2. Multiple calls to `expectDeprecation()` in legacy code were also checking that the collected deprecations were matching a sequence. The new methods do not check that, only whether at least one of the collected deprecations matches the expected one, on a one-by-one basis.
3. Deprecations can NO LONGER be triggered in `::tearDown()` or methods tagged with the `#[After]` attribute - due to internal PHPUnit logic that stops collecting deprecations during test finalization.
4. Use of `expectUserDeprecationMessage()` and `expectUserDeprecationMessageMatches()` methods is NO LONGER restricted on deprecation tests (i.e. tests marked with `#[IgnoreDeprecations]`) only. You can expect deprecations in any test and it's PHPUnit configuration deciding whether the test should also fail or not because of the deprecation.

**Before:**

```php
/**
 * Tests the deprecation notices of the block theme.
 *
 * @group legacy
 */
class BlockThemeDeprecationTest extends UnitTestCase {

  /**
   * Tests the deprecation in the constructor.
   */
  public function testConstructorDeprecation(): void {
    $this->expectDeprecation('Calling Drupal\block\Plugin\migrate\process\BlockTheme::__construct() with the $migration argument is deprecated in drupal:10.1.0 and is removed in drupal:11.0.0. See https://www.drupal.org/node/3323212');
    ...
  }

}
```

**After:**

```php
...
use PHPUnit\Framework\Attributes\IgnoreDeprecations;
...

/**
 * Tests the deprecation notices of the block theme.
 */
#[IgnoreDeprecations]
class BlockThemeDeprecationTest extends UnitTestCase {

  /**
   * Tests the deprecation in the constructor.
   */
  public function testConstructorDeprecation(): void {
    $this->expectUserDeprecationMessage('Calling Drupal\block\Plugin\migrate\process\BlockTheme::__construct() with the $migration argument is deprecated in drupal:10.1.0 and is removed in drupal:11.0.0. See https://www.drupal.org/node/3323212');
    ...
  }

}
```

*Source: [expectDeprecation() is deprecated](https://www.drupal.org/node/3545276), a Drupal core change record by [mondrake](https://www.drupal.org/user/1307444) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
