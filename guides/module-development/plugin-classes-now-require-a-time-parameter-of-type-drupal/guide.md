---
name: plugin-classes-now-require-a-time-parameter-of-type-drupal
title: "Plugin classes now require a $time parameter of type \\Drupal\\Component\\Datetime\\TimeInterface as last parameter in their __construct method"
description: "Plugin classes now require a $time parameter of type \\Drupal\\Component\\Datetime\\TimeInterface as last parameter in their __construct method"
drupal-core: ">=11.0"
source-url: https://www.drupal.org/node/3395991
change-record-nid: 3395991
introduced-in-version: "11.0.0"
introduced-in-branch: "11.0.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.0.x\
Introduced in version: 11.0.0\
Issue links: [#3395986](https://www.drupal.org/node/3395986)

To remove calls to the deprecated constant `REQUEST_TIME`, several `__construct()` methods now require `$time` of type `\Drupal\Component\Datetime\TimeInterface` as their last parameter.

This concerns the following `__construct()` methods:

- `\Drupal\datetime\Plugin\views\argument\Date::__construct`
- `\Drupal\history\Plugin\views\filter\HistoryUserTimestamp::__construct`
- `\Drupal\views\Plugin\views\argument\Date::__construct`
- `\Drupal\views\Plugin\views\cache\Time::__construct`
- `\Drupal\views\Plugin\views\field\Date::__construct`
- `\Drupal\Core\Field\Plugin\Field\FieldFormatter\TimestampFormatter::__construct`

*Source: [Plugin classes now require a $time parameter of type \Drupal\Component\Datetime\TimeInterface as last parameter in their \__construct method](https://www.drupal.org/node/3395991), a Drupal core change record by [quietone](https://www.drupal.org/user/2572884) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
