---
name: sdc-components-can-now-be-used-as-form-elements
title: "SDC components can now be used as form elements"
description: "SDC components can now be used as form elements"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3585881
change-record-nid: 3585881
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3508641](https://www.drupal.org/node/3508641)

Previously, an SDC component could be placed inside a form's slot but could not itself act as a form element.

`ComponentElement` now implements `FormElementInterface` and is registered as `#[FormElement('component')]`, so `#type: component` elements participate in form processing (input handling, validation, value collection) alongside core form elements.

The element's `#name` and `#required` are exposed to the component's Twig template under a form_state prop, so the component can render its own `<input>` using the values supplied by the Form API. A no-op `valueCallback()` is provided so the Form API falls back to `#default_value` / `#value`.

The following standard form properties are supported on `#type: component`:

- `#default_value`
- `#element_validate`
- `#required`
- `#value`

PHP-only properties (`#process`, `#after_build`, `#value_callback`, `#ajax`) are not available.

This does not override or replace existing core form elements. It allows new form elements to be defined as SDC components alongside them.

**Before**

`#type: component` was a render element only. Defining a form input backed by a component required a custom form element class.

**After**

A component can be used directly as a form element:

```php
  $form['my_field'] = [
    '#type' => 'component',
    '#component' => 'my_theme:input',
    '#default_value' => 'hello',
    '#required' => TRUE,
    '#element_validate' => [[$this, 'customValidator']],
  ];
```

The component's Twig template reads form_state:

```php
{% set input_attributes = create_attribute({
  type: 'text',
  name: form_state.value.name,
  id: id|default('my-sdc-text-field-' ~ random()),
  value: form_state.value.value,
}) %}

{% if form_state.value.required %}
  {% set input_attributes = input_attributes.setAttribute('required', true) %}
{% endif %}

<div{{ attributes }}>
  <label class="form-label" for="{{ input_attributes.id }}">
    {{ label }}
  </label>
  <input{{ input_attributes }}>
</div>
```

**Impact on Themers and Module developers**

Themers can define form element as SDC components, making it easier to implement design-system controls (e.g. a Bootstrap switch) without writing a custom form element class. Existing usage of `#type: component` outside forms is unchanged.

*Source: [SDC components can now be used as form elements](https://www.drupal.org/node/3585881), a Drupal core change record by [d34dman](https://www.drupal.org/user/751698) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
