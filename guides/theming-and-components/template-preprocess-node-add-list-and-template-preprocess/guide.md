---
name: template-preprocess-node-add-list-and-template-preprocess
title: "template_preprocess_node_add_list and template_preprocess_node are deprecated"
description: "template_preprocess_node_add_list and template_preprocess_node are deprecated"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3533060
change-record-nid: 3533060
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3532204](https://www.drupal.org/node/3532204)

`template_preprocess_node_add_list` and `template_preprocess_node` are deprecated.

`template_preprocess_node_add_list` is replaced with `\Drupal::service(NodeThemeHooks::class)->preprocessNodeAddList($variables)`.

`template_preprocess_node` is replaced with `\Drupal::service(NodeThemeHooks::class)->preprocessNode($variables)`.

See [https://www.drupal.org/node/3504125](https://www.drupal.org/node/3504125) for more information.

*Source: [template_preprocess_node_add_list and template_preprocess_node are deprecated](https://www.drupal.org/node/3533060), a Drupal core change record by [acbramley](https://www.drupal.org/user/1036766) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
