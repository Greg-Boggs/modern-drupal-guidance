---
name: single-directory-components-properties-with-enum-can-define
title: "Single-Directory Components properties with enum can define meta:enum with meta-information"
description: "Single-Directory Components properties with enum can define meta:enum with meta-information"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3519574
change-record-nid: 3519574
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3493070](https://www.drupal.org/node/3493070), [#3528998](https://www.drupal.org/node/3528998)

Single-Directory Components allow to specify enum properties, which restricts the possible values in the element to our list.

But all page builders, like Experience Builder, that want to use Single-Directory Components require a way to document (and even translate) these values to more human-friendly labels.

The meta:enum attribute will make that feasible, as in the following `*.component.yml` fragment example:

```php
    html_tag:
      type: string
      title: HTML tag
      enum:
        - a
        - button
        - span
      meta:enum:
        a: Link
        button: Button
        span: Inline
      x-translation-context: HTML tag
      default: button
```

If your `meta:enum` doesn't define some valid value from the `enum` list of values the raw enum values will be used instead.

*Source: [Single-Directory Components properties with enum can define meta:enum with meta-information](https://www.drupal.org/node/3519574), a Drupal core change record by [penyaskito](https://www.drupal.org/user/959536) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
