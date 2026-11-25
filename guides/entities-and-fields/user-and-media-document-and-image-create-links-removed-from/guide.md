---
name: user-and-media-document-and-image-create-links-removed-from
title: "User and Media Document and Image create links removed from navigation"
description: "User and Media Document and Image create links removed from navigation"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3581445
change-record-nid: 3581445
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3578196](https://www.drupal.org/node/3578196)

The Navigation module provides a 'Content' menu that includes links to create entities of certain types and bundles. These links would appear under the "Create" link in the navigation sidebar. This previously included hardcoded links to create User entities, as well as Image and Document Media entities if the Media module is installed. These hardcoded links have been removed.

Example:\
**Before**\
![Navigation Create menu with user and media links](https://www.drupal.org/files/issues/2026-03-24/longer-content-menu.png)

**After**\
![Navigation Create menu without user and media links](https://www.drupal.org/files/issues/2026-03-24/smaller-content-menu_0.png)

The links can be manually added back to the Content menu for any site with users who want to continue to use them.\
Users who have access to edit menus can go to `/admin/structure/menu/manage/content` and add them below the "Create" link:\
![Editing Content menu](https://www.drupal.org/files/Screenshot%202026-03-25%20at%208.40.13%E2%80%AFAM.png)

*Source: [User and Media Document and Image create links removed from navigation](https://www.drupal.org/node/3581445), a Drupal core change record by [godotislate](https://www.drupal.org/user/3483619) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
