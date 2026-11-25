---
name: object-json-schema-type-is-no-longer-added-to-every-sdc-prop
title: "object JSON schema type is no longer added to every SDC prop"
description: "object JSON schema type is no longer added to every SDC prop"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3589343
change-record-nid: 3589343
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#3554720](https://www.drupal.org/node/3554720)

SDC API no longer adds the `object` JSON schema type to all props..

A component prop like:

```php
heading_level:
  title: "Heading level"
  type: integer
```

is not automatically transformed into:

```php
heading_level:
  title: "Heading level"
  type: ['integer', 'object']
```

This has no impact for themers but module developers will not need to circumvent this addition anymore. Example:

| Before | After |
| --- | --- |
| `$form['value'] = [ '#type' => 'number', '#step' => 0.01, ]; if (is_array($schema['type']) && in_array('integer', $schema['type'])) { $form['value']['#step'] = 1; } ` | `$form['value'] = [ '#type' => 'number', '#step' => 0.01, ]; if ($schema['type'] === 'integer') { $form['value']['#step'] = 1; } ` |

If a mechanism relies on this addition, it must be adapted.

*Source: [object JSON schema type is no longer added to every SDC prop](https://www.drupal.org/node/3589343), a Drupal core change record by [pdureau](https://www.drupal.org/user/1903334) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
