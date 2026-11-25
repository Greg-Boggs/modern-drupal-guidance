---
name: sdc-stylesheets-are-now-added-in-the-theme-aggregate-group
title: "SDC stylesheets are now added in the \"theme\" aggregate group (as opposed to \"default\" group) to correct CSS source order for components"
description: "SDC stylesheets are now added in the \"theme\" aggregate group (as opposed to \"default\" group) to correct CSS source order for components"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3515838
change-record-nid: 3515838
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3374901](https://www.drupal.org/node/3374901)

Previously Single Directory Component CSS was added to the “default” aggregate group. The new behavior is to add it to the “theme” aggregate group.

The net effect of this is that SDC CSS will now get lumped in with theme CSS (irregardless if the SDC is in a module or theme).

This fixes a CSS source order bug where SDC CSS was injected before any theme CSS (including base and layout styles). This bug was typically worked around by adding otherwise unnecessary specificity into the component’s CSS. This workaround is no longer necessary.

### Before

![Screenshot of view source showing that the SDC CSS is injected way before the themes CSS](https://www.drupal.org/files/issues/2025-03-27/sdc-before.png)

### After

![Screenshot of view source showing that the SDC CSS is now injected way before the correctly within the themes component CSS](https://www.drupal.org/files/issues/2025-03-27/sdc-after.png)

*Source: [SDC stylesheets are now added in the "theme" aggregate group (as opposed to "default" group) to correct CSS source order for components](https://www.drupal.org/node/3515838), a Drupal core change record by [mherchel](https://www.drupal.org/user/118428) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
