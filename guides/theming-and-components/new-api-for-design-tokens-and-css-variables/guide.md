---
name: new-api-for-design-tokens-and-css-variables
title: "New API for Design Tokens and CSS variables"
description: "New API for Design Tokens and CSS variables"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3622344
change-record-nid: 3622344
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#3531854](https://www.drupal.org/node/3531854)

A dedicated API has been added to allow modules and themes to define design tokens as Drupal plugins.

Design tokens are small, reusable design decisions that make up a design system's visual style. A token can be a color, font style, unit of white space, or even a motion animation designed for a specific need. This definition follows the [DTCG standard format](https://www.designtokens.org/tr/2025.10/format/).

A token needs to be translated to CSS variables (aka “custom properties”) to be usable on the Web. CSS variables are scoped and can be overridden. This API introduces a config entity type to achieve that.

## Examples

### Add design tokens plugins

In the `*.tokens.yml` file in a theme or module:

```php
corner-radius-small:
  "$type": dimension
  "$value":
    value: 4
    unit: px
corner-radius-big:
  "$type": dimension
  "$value":
    value: 16
    unit: px
```

### Override a design tokens plugin with a design token entity

You can convert to CSS variables with values overridden by scope (using CSS selector):

```php
\Drupal::service('entity_type.manager')->getStorage('design_token')->create([
  'id' => 'my_id',
  'path' => 'corner-radius-small',
  'type' => 'dimension',
  'scopes' => [
    ':root' => [
      'value' => 6,
      'unit' => 'px',
    ],
    '.card' => [
      'value' => 8,
      'unit' => 'px',
    ],
  ],
])->toCss();
```

Producing:

```php
:root { --corner-radius-small: 6px; }
.card { --corner-radius-small: 8px; }
```

This API doesn’t do much more for now and covers 5 token types (Dimension, FontFamily, FontWeight, Number and Typography) upon the [15 available in DTCG](https://www.designtokens.org/tr/2025.10/format/#types). It will be extended in the next releases and is enough to be used as a foundation for a contrib ecosystem.

Alongside SDC and the Icon API, Design Tokens API is a milestone in the road to make Drupal a *Design System first* CMS.

*Source: [New API for Design Tokens and CSS variables](https://www.drupal.org/node/3622344), a Drupal core change record by [pdureau](https://www.drupal.org/user/1903334) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
