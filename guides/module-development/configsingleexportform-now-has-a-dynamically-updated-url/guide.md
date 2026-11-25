---
name: configsingleexportform-now-has-a-dynamically-updated-url
title: "ConfigSingleExportForm now has a dynamically updated URL"
description: "ConfigSingleExportForm now has a dynamically updated URL"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3546732
change-record-nid: 3546732
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3545179](https://www.drupal.org/node/3545179)

The `ConfigSingleExportForm` has been converted to use HTMX instead of Ajax API. Although no change will be discernible in the form itself, using HTMX, the url now dynamically updates to reflect the state of the form.

This means that users can use their browser's back button to return to a previous state, or copy and share the url with a colleague to point toward a specific configuration.

*Source: [ConfigSingleExportForm now has a dynamically updated URL](https://www.drupal.org/node/3546732), a Drupal core change record by [fathershawn](https://www.drupal.org/user/628748) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
