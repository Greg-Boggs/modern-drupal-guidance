---
name: published-status-or-admin-user-views-filter-becomes
title: "\"Published status or admin user\" Views filter becomes inactive when a node access module is enabled"
description: "\"Published status or admin user\" Views filter becomes inactive when a node access module is enabled"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3472976
change-record-nid: 3472976
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3449181](https://www.drupal.org/node/3449181)

As a solution for the issue described in [The Content overview page filters out unpublished nodes when a node access module is enabled](https://www.drupal.org/node/3449181), the behavior of the "Published status or admin user" Views filter has been modified. Now, the filter becomes inactive when a node access module is enabled.

This change ensures that the node access module takes over the responsibility for access control, managing access to both published and unpublished nodes. This is necessary because the node access module is designed to handle all aspects of access control, making the additional filtering redundant and potentially conflicting.

Site builders can now see in the filter's configuration UI whether the "Published status or admin user" filter is active or inactive. If the filter is inactive, the UI will also display a list of node access modules that are enabled on the site and have caused the filter to become inactive.

The filter is active because there is no node access module is enabled on the site:\
![The filter is active text](https://www.drupal.org/files/issues/2024-08-01/3449181-with-one-access-module.png)

The filter is inactive because one or more node access modules are enabled on the site:\
![The filter is inactive text](https://www.drupal.org/files/issues/2024-08-01/3449181-with-multiple-access-modules.png)

*Source: ["Published status or admin user" Views filter becomes inactive when a node access module is enabled](https://www.drupal.org/node/3472976), a Drupal core change record by [mxr576](https://www.drupal.org/user/315522) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
