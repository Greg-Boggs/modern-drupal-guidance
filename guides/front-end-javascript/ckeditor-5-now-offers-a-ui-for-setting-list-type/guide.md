---
name: ckeditor-5-now-offers-a-ui-for-setting-list-type
title: "CKEditor 5 now offers a UI for setting list type"
description: "CKEditor 5 now offers a UI for setting list type"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3529709
change-record-nid: 3529709
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3274635](https://www.drupal.org/node/3274635)

CKEditor 5 32.0.0 added a UI for setting a list type and now Drupal uses it:

![Screenshot of the CKEditor5 UI for setting list type](https://www.drupal.org/files/issues/2022-03-07/Screenshot%202022-03-07%20at%2011.26.55.png)

Sites with text formats that currently allow the `type` attribute on `ul` or `ol` elements through either unrestricted formats (such as "Full HTML") or manually editable HTML tags will automatically allow the user to choose a list style type.

Sites without text formats currently allowing the `type` attribute can enable it manually using the "Allow the user to choose a list style type" option from the List CKEditor 5 plugin settings:

![](https://www.drupal.org/files/ckeditor5-list-type-config.png)

*Source: [CKEditor 5 now offers a UI for setting list type](https://www.drupal.org/node/3529709), a Drupal core change record by [ericgsmith](https://www.drupal.org/user/1649952) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
