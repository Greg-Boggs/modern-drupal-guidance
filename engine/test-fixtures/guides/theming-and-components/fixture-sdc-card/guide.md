---
name: fixture-sdc-card
description: Test fixture. Build a card as a Single Directory Component with a component.yml schema and render it from Twig.
drupal-core: ">=10.3"
---

# Build a card as a Single Directory Component

{{ DRUPAL_STATUS() }}

A Single Directory Component keeps a component's Twig template, YAML metadata, CSS and JavaScript in one directory. Drupal discovers it and attaches its assets when it renders.

## Rules

- Create `components/card/` in the theme with `card.component.yml` and `card.twig`.
- Declare every prop in the component's schema.
- Render the component from other templates with `include()` and its `theme:component` ID.

## Example

```yaml
# components/card/card.component.yml
name: Card
props:
  type: object
  properties:
    title:
      type: string
  required:
    - title
```

```twig
{# components/card/card.twig #}
<article class="card">
  <h2>{{ title }}</h2>
</article>
```

```twig
{{ include('mytheme:card', { title: node.label }, with_context = false) }}
```
