---
name: the-advanced-section-of-views-edit-form-will-no-longer
title: "The advanced section of views' edit form will no longer collapse"
description: "The advanced section of views' edit form will no longer collapse"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3515212
change-record-nid: 3515212
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#2843953](https://www.drupal.org/node/2843953)

The third section or column of views' edit forms is no longer labelled as "Advanced" and is no longer collapsible. Accordingly, the configuration setting to control the default collapse state has been removed. This change was made for several reasons to enhance User Experience:

- To reduce the number of clicks required to edit a view
- To increase the visibility of important settings
- On desktop the collapsibility saves no space
- The settings aren't necessarily "advanced."

Providers of default configuration such as distributions should update `views.settings.yml` to remove the `advanced_column` key.

*Source: [The advanced section of views' edit form will no longer collapse](https://www.drupal.org/node/3515212), a Drupal core change record by [dcam](https://www.drupal.org/user/1791830) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
