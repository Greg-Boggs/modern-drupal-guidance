---
name: added-component-variants-to-sdc
title: "Added component variants to SDC"
description: "Added component variants to SDC"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3517062
change-record-nid: 3517062
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3390712](https://www.drupal.org/node/3390712)

In design systems, a *variant* allow grouping multiple component properties into a predefined set. The *variant* can then be used as a shortcut to render a component.

In SDC, front-end developers could previously define a *variant* as a *prop*, but this approach did not support custom titles or descriptions to convey the variant’s purpose.

This change allows component authors to specify a `title` and `description` that differ from the machine name, enabling more meaningful labels and detailed explanations of each variant’s purpose.

Now, you can use `variants` as a property at the root of your component declaration:

```php
name:  Card
variants:
  primary:
    title: Primary
    description: ...
  secondary:
    title: Secondary
    description: ...
props: {}
slots: {}
```

In your component twig template, you can use this as a regular *prop*:

```php
{% if variant is not empty %}
  {% set attributes = attributes.addClass('card-' ~ variant) %}
{% endif %}
```

When rendering a component from another twig template, you can specify the *variant* with:

```php
      {% include "mytheme:card" with {
        variant: 'primary',
        attributes: create_attribute({'class': ['banner__title']}),
        label: content.field_title,
      } only %}
```

Using the render arrays API (e.g. from a controller), you can use:

```php
      $build['content'] = [
        '#type' => 'component',
        '#component' => 'mytheme:card',
        '#variant' => 'secondary',
        '#props' => [
          'label' => $this->t('My custom card'),
        ],
      ];
```

Note that the concept of variants introduced in this change is not related to the broader use of "variants" in design systems and tools like Storybook, where the term typically refers to a combination of prop values and is commonly used for demonstrating components.

*Source: [Added component variants to SDC](https://www.drupal.org/node/3517062), a Drupal core change record by [penyaskito](https://www.drupal.org/user/959536) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
