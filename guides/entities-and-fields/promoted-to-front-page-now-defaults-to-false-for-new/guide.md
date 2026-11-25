---
name: promoted-to-front-page-now-defaults-to-false-for-new
title: "Promoted to front page now defaults to FALSE for new content types"
description: "Promoted to front page now defaults to FALSE for new content types"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3517642
change-record-nid: 3517642
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#987238](https://www.drupal.org/node/987238)

Before this change, when creating a new content type, the default value for the "Promoted to front page" field on a Node was TRUE. This field is configurable per Node Type under the Publishing Options when editing the Node Type.

Changing the setting on a Node Type creates or updates a base field override configuration entity for that node type's promote field to override the default.

Existing Node Types that were created prior to 11.3.0, and were using the default value of TRUE, will have base field override configuration created to maintain the previous default setting.

New content types created after 11.3.0 will default to FALSE.

![example](https://www.drupal.org/files/Screenshot%202025-04-10%20at%2010.44.49%E2%80%AFAM.png)

*Source: [Promoted to front page now defaults to FALSE for new content types](https://www.drupal.org/node/3517642), a Drupal core change record by [acbramley](https://www.drupal.org/user/1036766) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
