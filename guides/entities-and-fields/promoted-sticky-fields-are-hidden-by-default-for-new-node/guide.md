---
name: promoted-sticky-fields-are-hidden-by-default-for-new-node
title: "Promoted/Sticky fields are hidden by default for new Node Types"
description: "Promoted/Sticky fields are hidden by default for new Node Types"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3518643
change-record-nid: 3518643
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#29338](https://www.drupal.org/node/29338)

For new content (node) types created after 11.3.0, the *Promoted* to homepage and *Sticky* fields will be hidden by default on the content type's form display. Existing node types will be unaffected.

Site builders can show these fields by going to the *Manage form display* page for the node type and dragging them out of the Disabled section.

![Manage form display with hidden promote and sticky fields](https://www.drupal.org/files/Screenshot%20from%202025-04-11%2008-44-29.png)

*Source: [Promoted/Sticky fields are hidden by default for new Node Types](https://www.drupal.org/node/3518643), a Drupal core change record by [acbramley](https://www.drupal.org/user/1036766) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
