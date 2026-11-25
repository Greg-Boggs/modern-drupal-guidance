---
name: all-tests-must-declare-the-use-of-strict-types
title: "All tests must declare the use of strict types"
description: "All tests must declare the use of strict types"
drupal-core: ">=11.1"
source-url: https://www.drupal.org/node/3470184
change-record-nid: 3470184
introduced-in-version: "11.1.0"
introduced-in-branch: "11.1.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.1.x\
Introduced in version: 11.1.0\
Issue links: [#3400434](https://www.drupal.org/node/3400434)

All files matching the pattern `*/tests/*` must now use strict types. Add `declare(strict_types=1);` to all such tests.

#### Example

```php
<?php

declare(strict_types=1);

namespace Drupal\Tests\my_module\Unit;
```

This excludes any path that also matches `*/fixtures/*`.

*Source: [All tests must declare the use of strict types](https://www.drupal.org/node/3470184), a Drupal core change record by [mstrelan](https://www.drupal.org/user/314289) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
