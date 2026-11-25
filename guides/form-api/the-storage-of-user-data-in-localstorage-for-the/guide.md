---
name: the-storage-of-user-data-in-localstorage-for-the
title: "The storage of user data in localStorage for the prepopulation in anonymous forms is disabled"
description: "The storage of user data in localStorage for the prepopulation in anonymous forms is disabled"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3498836
change-record-nid: 3498836
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3498834](https://www.drupal.org/node/3498834)

With issue [#749748](https://www.drupal.org/project/drupal/issues/749748) (see also [change record](https://www.drupal.org/node/2243627)), it was introduced that personal data is stored in the browser's localStorage for anonymous user forms. In other forms (comments, message, register), this data is automatically used for anonymous users.

This behavior has changed for data protection reasons and the data is no longer stored in the browser and used in core forms.

The behavior (triggered by the attribute `data-user-info-from-browser` in forms) still exists, but will not be filled or used by core and be deprecated later.

*Source: [The storage of user data in localStorage for the prepopulation in anonymous forms is disabled](https://www.drupal.org/node/3498836), a Drupal core change record by [jan kellermann](https://www.drupal.org/user/371731) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
