---
name: new-sequentially-constraint-added-to-core
title: "New Sequentially constraint added to core"
description: "New Sequentially constraint added to core"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3521594
change-record-nid: 3521594
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3521131](https://www.drupal.org/node/3521131)

New Sequentially constraint added to core. This constraint allows you to validate sequentially. Showing the first error that shows up instead of all the errors on the data.

It has been applied to `block.schema.yaml` in this issue.

```php
block.block.*:
  mapping:
    region:
      type: string
      label: 'Region'
      constraints:
        NotBlank: []
        Callback:
          callback: ['\Drupal\block\Entity\Block', validateRegion]
```

Now is:

```php
block.block.*:
  mapping:
    region:
      type: string
      label: 'Region'
      constraints:
        Sequentially:
          - NotBlank: []
          - Callback:
              callback: ['\Drupal\block\Entity\Block', validateRegion]
```

*Source: [New Sequentially constraint added to core](https://www.drupal.org/node/3521594), a Drupal core change record by [bbrala](https://www.drupal.org/user/3366066) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
