---
name: accessresult-allowedif-and-accessresult-forbiddenif-now
title: "AccessResult::allowedIf() and AccessResult::forbiddenIf() now accept a neutral reason"
description: "AccessResult::allowedIf() and AccessResult::forbiddenIf() now accept a neutral reason"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3579037
change-record-nid: 3579037
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3566611](https://www.drupal.org/node/3566611)

Before it was possible to add a reason to a neutral access result when using `AccessResult::neutral()`, but not when using `AccessResult::allowedIf()` or `AccessResult::forbiddenIf()`.

Now these methods accept a neutral reason argument:

```php
AccessResult::allowedIf($condition, 'This is neutral because...');
AccessResult::forbiddenIf($condition, 'This is forbidden because...', 'This is neutral because...');
```

*Source: [AccessResult::allowedIf() and AccessResult::forbiddenIf() now accept a neutral reason](https://www.drupal.org/node/3579037), a Drupal core change record by [prudloff](https://www.drupal.org/user/3611858) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
