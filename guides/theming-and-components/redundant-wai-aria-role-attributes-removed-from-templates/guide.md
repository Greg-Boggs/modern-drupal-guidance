---
name: redundant-wai-aria-role-attributes-removed-from-templates
title: "Redundant WAI-ARIA `role` attributes removed from templates"
description: "Redundant WAI-ARIA `role` attributes removed from templates"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3566225
change-record-nid: 3566225
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#2655794](https://www.drupal.org/node/2655794)

WAI-ARIA `role` attributes that duplicated the native semantics of their elements have been removed. These attributes were originally added to support browsers that did not correctly infer semantic roles. Those browsers are no longer supported by Drupal core, making the additional ARIA roles unnecessary.

| Before | After |
| --- | --- |
| `<aside role="complementary">` | `<aside>` |
| `<footer role="contentinfo">` | `<footer>` |
| `<header role="banner">` | `<header>` |
| `<main role="main">` | `<main>` |
| `<nav role="navigation">` | `<nav>` |

## Templates updated

- `block--local-tasks-block.html.twig`
- `block--system-menu-block.html.twig`
- `breadcrumb.html.twig`
- `install-page.html.twig`
- `maintenance-page--front.html.twig`
- `maintenance-page.html.twig`
- `menu-local-tasks.html.twig`
- `page.html.twig`
- `pager.html.twig`
- `toolbar.html.twig`
- `views-mini-pager.html.twig`

*Source: [Redundant WAI-ARIA \`role\` attributes removed from templates](https://www.drupal.org/node/3566225), a Drupal core change record by [liam morland](https://www.drupal.org/user/493050) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
