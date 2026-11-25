---
name: uri-callback-entity-key-is-deprecated
title: "'uri_callback' entity key is deprecated"
description: "'uri_callback' entity key is deprecated"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3575062
change-record-nid: 3575062
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#2667040](https://www.drupal.org/node/2667040)

URI callbacks allowed entities to specify custom paths for canonical entity URLs. This feature has since been superseded by [link templates](https://www.drupal.org/docs/drupal-apis/entity-api/link-templates) which allows entities to have different paths for more than just the canonical route; they also allow paths to both be generated and looked up in a more consistent way.

URI callbacks are now deprecated in Drupal 11.4 and will be removed in Drupal 13. Use link templates where possible, or an outbound path processor if you need fine grained control over individual URLs.

*Source: ['uri_callback' entity key is deprecated](https://www.drupal.org/node/3575062), a Drupal core change record by [longwave](https://www.drupal.org/user/246492) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
