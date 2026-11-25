---
name: new-atleastoneof-constraint-for-config-validation
title: "New AtLeastOneOf constraint for config validation"
description: "New AtLeastOneOf constraint for config validation"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3517913
change-record-nid: 3517913
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3461720](https://www.drupal.org/node/3461720)

It is now possible to use a `AtLeastOneOf` constraints. This allows for validation of multiple constraints of which one should validate.

This allows for constraints like:

```php
            constraints:
              AtLeastOneOf:
                constraints:
                  - PluginExists:
                      manager: plugin.manager.menu.link
                      interface: 'Drupal\Core\Menu\MenuLinkInterface'
                  - IdenticalTo:
                      value: ''
```

Which then does validation on both, but only fails if no validation succeeds.

*Source: [New AtLeastOneOf constraint for config validation](https://www.drupal.org/node/3517913), a Drupal core change record by [bbrala](https://www.drupal.org/user/3366066) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
