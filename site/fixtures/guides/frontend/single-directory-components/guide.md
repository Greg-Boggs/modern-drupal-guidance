---
name: single-directory-components
description: Build reusable UI as Single Directory Components with a component.yml, Twig template, CSS and JS in one folder.
drupal-core: ">=10.3"
---

# Single Directory Components

Single Directory Components (SDC) keep a component's metadata, template, styles and behavior together under `components/<name>/`. SDC is stable from Drupal 10.3.

## Rules

- One folder per component, named after the component.
- Declare props and slots in `<name>.component.yml` with a JSON Schema.
- Use `{% include 'theme:button' %}` or `{{ include('theme:button', {...}) }}` rather than copying markup.
- Attach behavior with `Drupal.behaviors` and `once()`, not `jQuery.once`.

## Example

```yaml
# components/button/button.component.yml
$schema: https://git.drupalcode.org/project/drupal/-/raw/HEAD/core/assets/schemas/v1/metadata.schema.json
name: Button
status: stable
props:
  type: object
  properties:
    label:
      type: string
      title: Label
    url:
      type: string
      title: URL
  required: [label, url]
```

```twig
{# components/button/button.twig #}
<a{{ attributes.addClass('button') }} href="{{ url }}">{{ label }}</a>
```

```js
// components/button/button.js
((Drupal, once) => {
  Drupal.behaviors.exampleButton = {
    attach(context) {
      once('example-button', '.button', context).forEach((el) => {
        el.addEventListener('click', () => el.classList.add('is-clicked'));
      });
    },
  };
})(Drupal, once);
```
