---
name: single-directory-components
description: Build reusable Drupal UI components as Single Directory Components (a components/ directory with .component.yml, .twig, CSS and JS) and render them from Twig or render arrays, instead of loose templates with hand-written libraries.
drupal-core: ">=10.3"
replaces:
  - "Templates in templates/ paired with a separate library in *.libraries.yml for each UI element"
  - "{{ attach_library() }} calls for a component's own CSS and JS"
  - "Enabling the experimental sdc module"
  - "Pattern Lab or components module namespaces (@atoms/button.twig) for new components"
---

# Build UI components as Single Directory Components

A Single Directory Component (SDC) keeps everything for one UI element in one directory: the metadata and prop schema in `<name>.component.yml`, the markup in `<name>.twig`, and optionally `<name>.css` and `<name>.js`. Drupal discovers components in the `components/` directory of any module or theme, gives each the ID `<provider>:<name>`, and attaches the component's CSS and JS automatically whenever it renders. Props are validated against the schema, so a wrong prop fails loudly on development sites instead of printing nothing.

SDC is part of core from 10.3. The `sdc` module that existed in 10.1 and 10.2 is deprecated; do not install or depend on it.

{{ DRUPAL_STATUS() }}

{# Verified: core/lib/Drupal/Core/Theme/ComponentPluginManager.php and core/lib/Drupal/Core/Render/Element/ComponentElement.php at 10.3.0; core/modules/sdc/sdc.info.yml has "lifecycle: deprecated" at 10.3.0. Metadata schema keys from core/assets/schemas/v1/metadata.schema.json: 10.3.0 has $schema, name, description, status, props, slots, libraryOverrides, thirdPartySettings; "variants" added at 11.2.0; "noUi" at 11.3.0; "tags" at 11.4.0. Schema mandatory for module components, optional for themes unless enforce_prop_schemas: ComponentValidator at 11.4.0. Default attributes and data-component-id: ComponentsTwigExtension at 11.4.0. Library name core/components.<provider>--<name>: Component::getLibraryName() at 10.3.0. "replaces" requires both components to have props schemas: ComponentPluginManager::alterDefinitions() at 11.4.0. #}

## Implementation

### 1. Create the component directory

```
mytheme/
  components/
    card/
      card.component.yml   Required. Metadata, props schema, slots.
      card.twig            Required. The markup. Note: .twig, not .html.twig.
      card.css             Optional. Attached automatically.
      card.js              Optional. Attached automatically.
```

The directory name, and the file names inside it, are the component's machine name. Components may be grouped in subdirectories (`components/molecules/card/`); the ID stays `mytheme:card`, so machine names must be unique within one module or theme.

### 2. Describe props and slots in `card.component.yml`

Props are typed data (strings, numbers, booleans, URLs, objects). Slots are free-form renderable markup, such as an image or rendered fields. Both are optional; define what the component uses.

```yaml
# components/card/card.component.yml
$schema: https://git.drupalcode.org/project/drupal/-/raw/HEAD/core/assets/schemas/v1/metadata.schema.json
name: Card
description: A titled card with optional link and media.
status: stable
props:
  type: object
  # Props the component cannot render without.
  required:
    - heading
  properties:
    heading:
      type: string
      title: Heading
      examples:
        - 'Getting started'
    url:
      type: string
      title: Link URL
      format: uri-reference
    # The component always receives "attributes"; declare it so tools that
    # read the schema know about it.
    attributes:
      type: Drupal\Core\Template\Attribute
      title: Attributes
slots:
  body:
    title: Body
    description: The card's main content.
  media:
    title: Media
```

The props schema is JSON Schema. Components in **modules** must have a props schema. In themes it is optional unless the theme's info file sets `enforce_prop_schemas: true`, but always write one: it documents the component and enables validation.

### 3. Write the markup in `card.twig`

Props are Twig variables. Slots are Twig blocks, with an optional default inside the block.

```twig
{# components/card/card.twig #}
<article{{ attributes.addClass('card') }}>
  {% if url %}
    <h2 class="card__heading"><a href="{{ url }}">{{ heading }}</a></h2>
  {% else %}
    <h2 class="card__heading">{{ heading }}</h2>
  {% endif %}
  <div class="card__media">{% block media %}{% endblock %}</div>
  <div class="card__body">{% block body %}{% endblock %}</div>
</article>
```

Drupal adds `data-component-id="mytheme:card"` to `attributes`. CSS selects on the component's own class names.

```css
/* components/card/card.css */
.card {
  display: grid;
  gap: 0.5rem;
}
```

### 4. Use the component

From a Twig template, use `include` when you only pass props, and `embed` when you fill slots. Pass `only` (or `with_context = false`) so the component sees just what you give it.

```twig
{# templates/node--article--teaser.html.twig #}
{# Props only. #}
{{ include('mytheme:card', { heading: label, url: url }, with_context = false) }}

{# Props and slots. #}
{% embed 'mytheme:card' with { heading: label, url: url } only %}
  {% block body %}
    {{ content.body }}
  {% endblock %}
{% endembed %}
```

From PHP, return a `component` render element:

```php
// In a controller, block or preprocess function.
$build['card'] = [
  '#type' => 'component',
  '#component' => 'mytheme:card',
  '#props' => [
    'heading' => $this->t('Getting started'),
    'url' => $url->toString(),
  ],
  '#slots' => [
    // Slot values are render arrays.
    'body' => ['#markup' => $this->t('Read the guide.')],
  ],
];
```

### 5. Optional: declare library dependencies

If the component's JS needs another library, add it under `libraryOverrides`. Do not write a separate `*.libraries.yml` entry for the component.

```yaml
# components/card/card.component.yml (excerpt)
libraryOverrides:
  dependencies:
    - core/drupal
    - core/once
```

### 6. Optional: variants (11.2 and later)

{{ DRUPAL_STATUS(">=11.2") }}

Variants name the visual versions of a component. The chosen variant arrives as the `variant` variable, and Drupal adds `data-component-variant` to `attributes`.

```yaml
# components/card/card.component.yml (excerpt)
variants:
  default:
    title: Default
  featured:
    title: Featured
```

```twig
{# components/card/card.twig (excerpt) #}
{% set attributes = attributes.addClass('card') %}
{% if variant %}
  {% set attributes = attributes.addClass('card--' ~ variant) %}
{% endif %}
<article{{ attributes }}>
```

Pass it as `variant: 'featured'` in Twig, or `'#variant' => 'featured'` on the render element.

### 7. Optional: replace another extension's component

A theme can replace a component from a module or base theme by adding `replaces: 'provider:name'` to its own component's YAML. Both components must have a props schema, and the replacement's schema must be compatible with the original's.

## Rules

- DO name the template `<name>.twig`. A `.html.twig` file in a component directory is not the component template.
- DO NOT add the component's CSS or JS to `*.libraries.yml` or call `attach_library()` for it. Drupal attaches them as the `core/components.<provider>--<name>` library whenever the component renders.
- DO NOT include components by file path (`@mytheme/components/card/card.twig`). Use the component ID, `mytheme:card`, so replacements and library attachment work.
- DO pass render arrays and markup through slots, not props. Props hold data that the component formats and that the schema can validate.
- DO write the props schema, even in a theme that does not enforce it.
- DO use `only` or `with_context = false` when including a component, so variables from the parent template do not leak in.
- DO NOT install or depend on the deprecated `sdc` module.

## Older supported core versions

Every supported core release has SDC in core. `variants` needs 11.2, `noUi` needs 11.3 and `tags` needs 11.4; on earlier releases those keys are ignored, so leave them out rather than rely on them. To vary a component on those releases, add a string prop with an `enum` of allowed values instead of `variants`.

## Verify

```bash
drush cache:rebuild
# The component is discovered.
drush php:eval 'var_dump(array_key_exists("mytheme:card", \Drupal::service("plugin.manager.sdc")->getDefinitions()));'
```

With Twig debugging on, the rendered HTML contains a `Component start: mytheme:card` comment. With or without debugging, the root element carries `data-component-id="mytheme:card"`. Add a `README.md` to the component directory to document it for people and tools.
