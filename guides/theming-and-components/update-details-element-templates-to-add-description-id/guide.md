---
name: update-details-element-templates-to-add-description-id
title: "Update details element templates to add description ID attributes"
description: "Update details element templates to add description ID attributes"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3509534
change-record-nid: 3509534
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#2896169](https://www.drupal.org/node/2896169)

Details form elements with descriptions were given an invalid `aria-describedby` attribute whose target did not correspond to any HTML element. All core templates have been updated to add the `id` to a wrapper around the description. If you have overridden the details.html.twig template, then you should update your template in order to have valid markup and improve accessibility.

## Basic Example

Before:

```php
  {{ description }}
```

After:

```php
  {%- if description -%}
    {% set description_attributes = create_attribute({id: attributes['aria-describedby']}) %}
    <div{{ description_attributes }}>{{ description }}</div>
  {%- endif -%}
```

## Example description with pre-existing wrapper

Before:

```php
    {%- if description -%}
      <div class="details-description">{{ description }}</div>
    {%- endif -%}
```

After:

```php
    {%- if description -%}
      {% set description_attributes = create_attribute({id: attributes['aria-describedby']}) %}
      <div{{ description_attributes.addClass(['details-description']) }}>{{ description }}</div>
    {%- endif -%}
```

*Source: [Update details element templates to add description ID attributes](https://www.drupal.org/node/3509534), a Drupal core change record by [dcam](https://www.drupal.org/user/1791830) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
