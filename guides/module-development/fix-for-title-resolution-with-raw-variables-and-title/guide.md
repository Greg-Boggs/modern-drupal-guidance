---
name: fix-for-title-resolution-with-raw-variables-and-title
title: "Fix for Title Resolution with _raw_variables and _title_arguments"
description: "Fix for Title Resolution with _raw_variables and _title_arguments"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3498715
change-record-nid: 3498715
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3081044](https://www.drupal.org/node/3081044)

The title resolution mechanism in TitleResolver::getTitle() was not functioning as expected when both \_raw_variables and \_title_arguments were defined in a route. Specifically, the method returned the static title specified in the route instead of dynamically resolving the title using the URL parameters.

Example\
Route Definition:

```php
custom_module.test_route:
  path: '/test-route/{test}/{test2}'
  defaults:
    _controller: '\Drupal\custom_module\Controller\CustomPageController::content'
    _title: 'Static title @test @test2'
    _title_arguments:
      '@test': 'value'
      '@test2': 'value2'
  requirements:
    _permission: 'access content'
```

**Before**:\
When the route /test-route/foo/bar was accessed with dynamic values foo and bar for {test} and {test2}, the title displayed was always:

`Static title value value2`\
The placeholders @test and @test2 were replaced with default values from \_title_arguments, ignoring the dynamic parameters.

**After**:\
When the route /test-route/foo/bar is accessed, the title now dynamically resolves as:\
`Static title foo bar`\
Here, @test and @test2 are replaced with the actual URL parameter values foo and bar.

**Resolution**\
The title mechanism now prioritizes URL parameters (\_raw_variables) over the default values defined in \_title_arguments. This ensures that titles dynamically reflect the passed URL parameters while still using defaults if parameters are absent.

*Source: [Fix for Title Resolution with \_raw_variables and \_title_arguments](https://www.drupal.org/node/3498715), a Drupal core change record by [shalini_jha](https://www.drupal.org/user/3675486) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
