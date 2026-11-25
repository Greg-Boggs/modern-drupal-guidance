---
name: runtestsinseparateprocesses-attribute-is-required-for-all
title: "#[RunTestsInSeparateProcesses] attribute is required for all Kernel, Functional and FunctionalJavascript tests"
description: "#[RunTestsInSeparateProcesses] attribute is required for all Kernel, Functional and FunctionalJavascript tests"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3548485
change-record-nid: 3548485
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3445240](https://www.drupal.org/node/3445240), [#3548493](https://www.drupal.org/node/3548493), [#3546029](https://www.drupal.org/node/3546029), [#3547849](https://www.drupal.org/node/3547849), [#3550335](https://www.drupal.org/node/3550335)

All Kernel, Functional and FunctionalJavascript tests must be executed in process isolation.

This has always been the case; up until PHPUnit 11 it was possible to require process isolation in the abstract base classes overriding the constructor, but since PHPUnit 12 this is no longer possible, so now

**each concrete test class, Kernel, Functional and FunctionalJavascript, must specifiy a `#[RunTestsInSeparateProcesses]` attribute on the class level.**

**Before:**

```php
<?php

declare(strict_types=1);

namespace Drupal\Tests\announcements_feed\Functional;

use Drupal\dynamic_page_cache\EventSubscriber\DynamicPageCacheSubscriber;
use Drupal\Tests\BrowserTestBase;
use PHPUnit\Framework\Attributes\Group;

/**
 * Defines a class for testing pages are still cacheable with dynamic page cache.
 */
#[Group('announcements_feed')]
final class AnnouncementsCacheTest extends BrowserTestBase {
```

**After:**

```php
<?php

declare(strict_types=1);

namespace Drupal\Tests\announcements_feed\Functional;

use Drupal\dynamic_page_cache\EventSubscriber\DynamicPageCacheSubscriber;
use Drupal\Tests\BrowserTestBase;
use PHPUnit\Framework\Attributes\Group;
use PHPUnit\Framework\Attributes\RunTestsInSeparateProcesses;

/**
 * Defines a class for testing pages are still cacheable with dynamic page cache.
 */
#[Group('announcements_feed')]
#[RunTestsInSeparateProcesses]
final class AnnouncementsCacheTest extends BrowserTestBase {
```

*Source: [#\[RunTestsInSeparateProcesses\] attribute is required for all Kernel, Functional and FunctionalJavascript tests](https://www.drupal.org/node/3548485), a Drupal core change record by [mondrake](https://www.drupal.org/user/1307444) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
