---
name: inline-links-in-help-topics-are-no-longer-rendered-as
title: "Inline links in help topics are no longer rendered as absolute"
description: "Inline links in help topics are no longer rendered as absolute"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3582394
change-record-nid: 3582394
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3582386](https://www.drupal.org/node/3582386)

Links rendered with either of the 'help_route_link' or 'help_topic_link' twig functions are no longer rendered as absolute by default. This behaviour can be customised by passing in `$options['absolute'] = TRUE`, although this is unlikely to be necessary.

*Source: [Inline links in help topics are no longer rendered as absolute](https://www.drupal.org/node/3582394), a Drupal core change record by [joachim](https://www.drupal.org/user/107701) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
