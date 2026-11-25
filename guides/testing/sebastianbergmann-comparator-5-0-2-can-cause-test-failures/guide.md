---
name: sebastianbergmann-comparator-5-0-2-can-cause-test-failures
title: "sebastianbergmann/comparator:5.0.2 can cause test failures in assertEqualsCanonicalizing()"
description: "sebastianbergmann/comparator:5.0.2 can cause test failures in assertEqualsCanonicalizing()"
drupal-core: ">=11.1"
source-url: https://www.drupal.org/node/3470434
change-record-nid: 3470434
introduced-in-version: "11.1.0"
introduced-in-branch: "11.1.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.1.x\
Introduced in version: 11.1.0\
Issue links: [#3468502](https://www.drupal.org/node/3468502)

`sebastianbergmann/comparator`:5.0.2 changed to way it processes arrays/objects in PHPUnits `assertEqualsCanonicalizing()`.

It will now throw the failure below if the input isn't a list, so sequenced 0...n.

```php
Drupal\Tests\system\Kernel\Common\UrlTest::testLinkBubbleableMetadata
Failed asserting that two arrays are equal.
--- Expected
+++ Actual
@@ @@
 Array (
     'contexts' => Array (
         0 => 'languages:language_interface'
-        1 => 'session'
-        2 => 'theme'
-        3 => 'user.permissions'
+        1 => 'theme'
+        2 => 'user.permissions'
+        6 => 'session'
     )
     'tags' => []
     'max-age' => -1
 )

core/modules/system/tests/src/Kernel/Common/UrlTest.php:71
```

Note the values are the same for actual and expected but the keys of actual are not a list.

On encountering this test failure, you may attempt to overcome this by returning the array_values() of the method that causes the test-failure, since we're mostly only interested in the values anyway.

In core we did this for the following methods:\
`Cache::mergeTags()` and `Cache::mergeContexts()` now return actual lists i.e. after removing dupes, the resulting array is sequenced 0...n.

*Source: [sebastianbergmann/comparator:5.0.2 can cause test failures in assertEqualsCanonicalizing()](https://www.drupal.org/node/3470434), a Drupal core change record by [mondrake](https://www.drupal.org/user/1307444) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
