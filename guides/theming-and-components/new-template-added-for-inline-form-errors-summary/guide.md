---
name: new-template-added-for-inline-form-errors-summary
title: "New template added for Inline Form Errors summary"
description: "New template added for Inline Form Errors summary"
drupal-core: ">=12.0"
source-url: https://www.drupal.org/node/3616489
change-record-nid: 3616489
introduced-in-version: "12.0.0"
introduced-in-branch: "12.0.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 12.0.x\
Introduced in version: 12.0.0\
Issue links: [#2980380](https://www.drupal.org/node/2980380)

The inline_form_errors module now ships with a template `core/modules/inline_form_errors/templates/inline-form-errors-summary.html.twig`

```php
{% if error_links %}
  {%- set count = error_links|length -%}
  {%- trans -%}
    <span>{{ count }} error has been found:</span>
  {%- plural count -%}
    <span>{{ count }} errors have been found:</span>
  {%- endtrans -%}
  {{ include('item-list.html.twig', {
    items: error_links,
    list_type: 'ul',
    wrapper_attributes: create_attribute(),
    context: {list_style: 'comma-list'},
  }) }}
{% endif %}
```

Which is used to display the summary of errors.

In addition there are theme suggestions based on the $form_id. `$suggestions[] = 'inline_form_errors_summary__' . $variables['form_id'];`

*Source: [New template added for Inline Form Errors summary](https://www.drupal.org/node/3616489), a Drupal core change record by [smustgrave](https://www.drupal.org/user/3252890) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
