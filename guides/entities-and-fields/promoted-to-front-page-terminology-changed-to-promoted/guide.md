---
name: promoted-to-front-page-terminology-changed-to-promoted
title: "'Promoted to front page' terminology changed to 'Promoted'"
description: "'Promoted to front page' terminology changed to 'Promoted'"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3593641
change-record-nid: 3593641
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#3593281](https://www.drupal.org/node/3593281)

The following changes were applied to the 'Promoted to front page' terminology with file examples. There are no API changes, the API already purely used 'promoted'.

| Original Text | Updated Text | File(s) |
| --- | --- | --- |
| Promoted to front page | Promoted | Node.php, NodeTypeForm.php |
| Promoted to front page status | Promoted status | NodeViewsData.php |
| A boolean indicating whether the node is visible on the front page. | A boolean indicating whether the node is promoted. | NodeViewsData.php |
| Promote selected content to front page | Promote selected content | PromoteNode.php |
| Demote selected content from front page | Unpromote selected content | DemoteNode.php |
| You haven't created any frontpage content yet. | You haven't created any promoted content yet. | get-started.html.twig |
| Promote content to front page | Promote content | system.action.node_promote_action.yml |
| Remove content from front page | Unpromote content | system.action.node_unpromote_action.yml |
| All content promoted to the front page. | All promoted content. | views.view.frontpage.yml |
| No front page content has been created yet. | No promoted content has been created yet. | views.view.frontpage.yml |

*Source: ['Promoted to front page' terminology changed to 'Promoted'](https://www.drupal.org/node/3593641), a Drupal core change record by [gábor hojtsy](https://www.drupal.org/user/4166) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
