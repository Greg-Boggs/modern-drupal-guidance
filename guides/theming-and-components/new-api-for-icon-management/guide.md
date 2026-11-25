---
name: new-api-for-icon-management
title: "New API for icon management"
description: "New API for icon management"
drupal-core: ">=11.1"
source-url: https://www.drupal.org/node/3490350
change-record-nid: 3490350
introduced-in-version: "11.1.0"
introduced-in-branch: "11.1.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.1.x\
Introduced in version: 11.1.0\
Issue links: [#3471494](https://www.drupal.org/node/3471494)

A dedicated API has been added to allow modules and themes to define icon packs. Within each pack is a series of icons each with a unique identifier that the system can then use. Modules and themes can alter icon packs.

To declare an icon pack, create a `EXTENSION_NAME.icons.yml` file in the extension's base folder. Each top-level entry in this YAML file defines a new icon pack, as a plugin with YAML discovery.

An icon pack has an extractor, which can take values `path`, `svg` or `svg_sprite`. Modules can add additional extractors by creating an `IconExtractor` plugin (PHP attribute discovery).

### Examples

#### Simple example with path

```php
fixed_path:
  # Use the path extractor.
  extractor: path
  config:
    # One icon per listed source, allowed extensions: svg, png, gif, relative to
    # this file or to drupal root if start with a `/`. Remote icons are allowed too
    # Format can be mixed but only one template is possible. If same id (name here)
    # later will override.
    # If an icon does not exist, it will be ignored and a log message will be created.
    sources:
      - icons/foo.svg
      - icons/bar.png
      - icons/baz.gif
      - /libraries/icons/corge.png
      - https://www.drupal.org/files/drupal-wordmark.png
  # HTML template used to render the icon. Variables `icon_id`, `source` are
  # available, some metadata and an `attributes` object.
  template: '<img src="{{ source }}" width="32" height="32" alt="{{ icon_id }}">'
```

#### Simple example with svg, settings and wildcard

```php
svg:
  label: SVG icons
  extractor: svg
  config:
    sources:
      - icons/*.svg
  settings:
    size:
      title: "Size"
      type: "integer"
      default: 32
    # Special settings for color widget.
    color:
      title: "Color"
      type: "string"
      format: "color"
  # Variable `content` is provided by the svg extractor, as well as populated
  # `attributes` based on the svg source file attributes.
  template: >-
    <svg
      {{ attributes
          .setAttribute('viewBox', attributes.viewBox|default('0 0 50 50'))
          .setAttribute('width', size|default('32'))
          .setAttribute('height', size|default('32'))
          .setAttribute('fill', color|default('currentColor'))
          .setAttribute('aria-hidden', 'true')
      }}
    >
      {{ content }}
    </svg>
```

#### Simple example with SVG sprite file

```php
svg_sprite:
  label: SVG sprite icons
  extractor: svg_sprite
  config:
    sources:
     # All sprites are extracted from this SVG, can handle multiple sprites.
      - icons/foo_sprite.svg
  settings:
    size:
      title: "Size"
      type: "integer"
      default: 32
  # Template expected for a svg sprite with href.
  # @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/href
  template: >-
    <svg
      xmlns="https://www.w3.org/2000/svg"
      width="{{ size|default(32) }}"
      height="{{ size|default(32) }}"
      aria-hidden="true"
    >
      <use href="{{ source }}#{{ icon_id }}"/>
    </svg>
```

#### Advanced example with metadata

```php
wildcard_path:
  # Implicit is always enabled, if false will not be available.
  enabled: true
  # All possible optional metadata.
  label: Wildcards
  description: Icons from wildcard path
  links:
    - https://www.drupal.org
  version: 1.0.0
  license:
    name: GPL-3.0-or-later
    url: https://www.gnu.org/licenses/gpl-3.0.html
    gpl-compatible: true
  # Mandatory values to discover icons.
  extractor: path
  config:
    # Sources from a pattern, `{group}` and `{icon_id}` can be extracted
    # Discovery of icons is not recursive, same id will override silently.
    sources:
      - icons/*.png
      - icons/{group}/*.png
      - icons/*/{group}/*.png
      - icons/extracted/prefix_{icon_id}_suffix.png
  # You can define settings that will be available in exposed forms and flow
  # through to templates.
  settings:
    width:
      title: "Width"
      type: "integer"
      default: 32
    height:
      title: "Height"
      type: "integer"
      default: 32
    alt:
      title: "Alt text"
      type: "string"
      description: "Accessibility alternative text, leave empty for decorative icon."
  # Example showing multi-line AND settings as variables.
  template: >-
    <img
      class="icon icon-{{ icon_id|clean_class }}"
      src="{{ source }}"
      width="{{ width|default(32) }}"
      height="{{ height|default(32) }}"
      alt="{{ icon_id }}"
    >
```

See documentation on `core/lib/Drupal/Core/Theme/Icon/Plugin/IconPackManager.php` in the code-base for extended documentation of the various keys and their values. As well as test examples in `core/modules/system/tests/modules/icon_test/icon_test.icons.yml`.

### Render an icon

An icon can be rendered using a new `icon` render element

```php
 $build['icon'] = [
   '#type' => 'icon',
   '#pack_id' => 'material_symbols',
   '#icon_id' => 'home',
   '#settings' => [
     'size' => 64,
   ],
 ];
```

An icon can also be rendered using a new `icon()` Twig function:

```php
  {{ icon('material_symbols', 'home', {size: 64}) }}
```

### Contrib module

Module [UI Icons](https://www.drupal.org/project/ui_icons) is leveraging this API to enable Drupal integration.

### Overriding icon packs

You can override icon pack definitions in a couple of different ways. The first method takes advantage of the `hook_icon_pack_alter` provided by the `\Drupal\Core\Theme\Icon\Plugin\IconPackManager`:

```php
/**
 * Implements hook_icon_pack_alter().
 */
function mymodule_icon_pack_alter(array &$icon_packs): void {
  $icon_packs['navigation']['settings']['size']['default'] = 24;
}
```

The second method takes advantage of how YAML discovery works. First, find out where the icon pack you are interested in is coming from. Look for a `*.icons.yml` file. Next, copy that `*.icons.yml` file to your module or theme, renaming it to match your module or theme. For example, if I wanted to override the `navigation` icon pack provided by the core Navigation module, I would copy `navigation.icons.yml` to `mytheme.icons.yml`. The next step is to make adjustments to `mytheme.icons.yml` according to the following guidelines:

- `*.icons.yml` files *can* define more than one icon pack. While you may be targetting a specific icon pack, due to limitations with YAML discovery, you'll need to override all icon packs defined.
- Adjust the `[icon_pack_id].config.sources` value. Copy paste the icons from where the icon pack was originally defined to your theme as a starting point. The filenames are important and need to remain the same.
- Overwrite any specific icon files (or sprites within sprites) that you wish to override.

*Source: [New API for icon management](https://www.drupal.org/node/3490350), a Drupal core change record by [larowlan](https://www.drupal.org/user/395439) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
