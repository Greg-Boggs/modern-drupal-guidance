---
name: default-date-formats-have-changed
title: "Default date formats have changed"
description: "Default date formats have changed"
drupal-core: ">=11.1"
source-url: https://www.drupal.org/node/3467774
change-record-nid: 3467774
introduced-in-version: "11.1.0"
introduced-in-branch: "11.1.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.1.x\
Introduced in version: 11.1.0\
Issue links: [#3466529](https://www.drupal.org/node/3466529)

The default date formats shipped with Drupal core have been update to a more internationally recognisable format. This change does not affect existing sites.

#### Date formats previously

| Name | Pattern |   |
| --- | --- | --- |
| Default long date | Wednesday, August 7, 2024 - 13:55 |   |
| Default medium date | Wed, 08/07/2024 - 13:55 |   |
| Default short date | 08/07/2024 - 13:55 |   |
| Olivero Medium | 7 August, 2024 |   |
| Fallback date format | Wed, 08/07/2024 - 13:55 |   |
| \[...\] |   |   |

#### Proposed changes to date formats

| Name | Pattern |   |
| --- | --- | --- |
| Default long date | Wednesday, 7 August 2024 - 13:55 |   |
| Default medium date | Wed, 7 Aug 2024 - 13:55 |   |
| Default short date | 7 Aug 2024 - 13:55 |   |
| Olivero Medium | 7 August 2024 |   |
| Fallback date format | Wed, 7 aug 2024 - 13:55 |   |
| \[...\] |   |   |

*Source: [Default date formats have changed](https://www.drupal.org/node/3467774), a Drupal core change record by [catch](https://www.drupal.org/user/35733) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
