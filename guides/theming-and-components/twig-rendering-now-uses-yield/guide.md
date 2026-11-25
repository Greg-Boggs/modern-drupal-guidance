---
name: twig-rendering-now-uses-yield
title: "Twig rendering now uses yield"
description: "Twig rendering now uses yield"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3546663
change-record-nid: 3546663
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3546376](https://www.drupal.org/node/3546376)

In preparation for Twig 4, and to support async rendering, Drupal core's Twig configuration now sets the `use_yield` option.

This should be a transparent change both for Twig templates themselves as well as any custom Twig integrations, however it is possible that complex twig implementations relying on output buffering could be affected.

Objects implementing `MarkupInterface` are now cast to a string in `TwigEnvironment::escapeFilter()` instead of returned as objects, this change should be completely transparent, but was necessary to ensure that mutable objects are rendered prior to any later mutations in complex templates. See the related issue for more details.

For more information in the Twig documentation see [https://twig.symfony.com/doc/3.x/deprecated.html#nodes](https://twig.symfony.com/doc/3.x/deprecated.html#nodes)

*Source: [Twig rendering now uses yield](https://www.drupal.org/node/3546663), a Drupal core change record by [catch](https://www.drupal.org/user/35733) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
