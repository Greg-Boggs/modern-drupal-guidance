---
name: navigation-top-bar-now-exposes-three-distinct-extendable
title: "Navigation Top Bar now exposes three distinct extendable regions via TopBarItem plugin"
description: "Navigation Top Bar now exposes three distinct extendable regions via TopBarItem plugin"
drupal-core: ">=11.1"
source-url: https://www.drupal.org/node/3489732
change-record-nid: 3489732
introduced-in-version: "11.1.0"
introduced-in-branch: "11.1.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.1.x\
Introduced in version: 11.1.0\
Issue links: [#3484564](https://www.drupal.org/node/3484564)

As part of work on the currently experimental navigation module, the Top Bar has been made extendable through a new TopBarItem plugin.

The Top Bar is now split into three distinct regions, each of which can have TopBarItem plugins added to it. The three regions are:

1. Tools (`tools`): Editorial tools, for instance a device switcher to aid in previewing content
2. Context (`context`): Contextual information including the title and publish status of the content
3. Actions (`actions`): Actions to take on the content. Local tasks are initially placed here, to be further refined in follow up issues.

Visually, in current designs at the time of writing, these regions are laid out in the Top Bar as follows:

![Top Bar regions](https://www.drupal.org/files/top-bar.png)

To author a TopBarItem plugin, in your module, create a new class in the `src/Plugin/TopBarItem` directory. The class should implement `\Drupal\navigation\TopBarItemManagerInterface`. A base class, `\Drupal\navigation\TopBarItemBase` is available as a starting point. Here is an example of a TopBarItemPlugin:

```php
<?php

declare(strict_types=1);

namespace Drupal\navigation\Plugin\TopBarItem;

use Drupal\Core\StringTranslation\TranslatableMarkup;
use Drupal\navigation\Attribute\TopBarItem;
use Drupal\navigation\TopBarItemBase;
use Drupal\navigation\TopBarRegion;

/**
 * Example top bar item.
 */
#[TopBarItem(
  id: 'my_top_bar_item',
  region: TopBarRegion::Actions,
  label: new TranslatableMarkup('My top bar item'),
)]
final class MyTopBarItem extends TopBarItemBase {

  /**
   * {@inheritdoc}
   */
  public function build(): array {
    return [
      '#markup' => 'My top bar item',
    ];
  }

}
```

Note the "region" key in the TopBarItem attribute. This indicates which of the above three regions you wish your TopBarItem to appear in. The `\Drupal\navigation\TopBarRegion` enum is made available to define the region constants available for use.

*Source: [Navigation Top Bar now exposes three distinct extendable regions via TopBarItem plugin](https://www.drupal.org/node/3489732), a Drupal core change record by [m4olivei](https://www.drupal.org/user/410384) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
