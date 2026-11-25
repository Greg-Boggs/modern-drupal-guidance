---
name: admin-compact-mode-logic-has-been-moved-to-the-frontend
title: "Admin compact mode logic has been moved to the frontend"
description: "Admin compact mode logic has been moved to the frontend"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3588109
change-record-nid: 3588109
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#3584347](https://www.drupal.org/node/3584347)

Some larger administrative overview pages (e.g., `/admin/people/permissions`) have a link at the top which allows to toggle the visibility of item descriptions. As of Drupal 11.5, clicking this link doesn't result in a page refresh anymore. Instead the descriptions are toggled immediately using JavaScript.

## Deprecated API

The `system_admin_compact_mode` function is deprecated in Drupal 11.5 and is removed from Drupal 12. Instead of varying markup generation on the backend, the full markup should always be returned. Sections which should be collapsible by the *Hide descriptions* link need the `data-admin-compact-collapsible` attribute.

### Before

```php
$hide_descriptions = system_admin_compact_mode();
[...]
$form['permissions'][$perm]['description'] = [
  '#type' => 'inline_template',
  '#template' => 
    '<div class="permission"><span class="title table-filter-text-source">{{ title }}</span>' .
    '{% if description or warning %}' . 
    '<div class="description">{% if warning %}<em class="permission-warning">{{ warning }}</em> ' .
    '{% endif %}{{ description }}</div>{% endif %}</div>',
  '#context' => [
    'title' => $perm_item['title'],
  ],
];
// Show the permission description.
if (!$hide_descriptions) {
  $form['permissions'][$perm]['description']['#context']['description'] = $perm_item['description'];
  $form['permissions'][$perm]['description']['#context']['warning'] = $perm_item['warning'];
}
```

### After

```php
$hide_descriptions= DeprecationHelper::backwardsCompatibleCall(
  currentVersion: \Drupal::VERSION,
  deprecatedVersion: '11.5',
  currentCallable: fn() => FALSE,
  deprecatedCallable: fn() => system_admin_compact_mode(),
);
[...]
$form['permissions'][$perm]['description'] = [
  '#type' => 'inline_template',
  '#template' => 
    '<div class="permission"><span class="title table-filter-text-source">{{ title }}</span>' .
    '{% if description or warning %}' .
    '<div class="description" data-admin-compact-collapsible>{% if warning %}<em class="permission-warning">{{ warning }}</em> ' .
    '{% endif %}{{ description }}</div>{% endif %}</div>',
  '#context' => [
    'title' => $perm_item['title'],
  ],
];
// Show the permission description.
if (!$hide_descriptions) {
  $form['permissions'][$perm]['description']['#context']['description'] = $perm_item['description'];
  $form['permissions'][$perm]['description']['#context']['warning'] = $perm_item['warning'];
}
```

## Changed twig templates

The `admin-block-content.html.twig` doesn't receive the `compact` variable anymore. Instead the `data-admin-compact-collapsible` attribute is used to mark elements whose visibility is toggled by the *Hide descriptions* link.

### Before

```php
{%
  set classes = [
    'list-group',
    compact ? 'compact',
  ]
%}
{% if content %}
  <dl{{ attributes.addClass(classes) }}>
    {% for item in content %}
      <dt class="list-group__link">{{ item.link }}</dt>
      {% if item.description %}
        <dd class="list-group__description">{{ item.description }}</dd>
      {% endif %}
    {% endfor %}
  </dl>
{% endif %}
```

### After

```php
{% if content %}
  <dl{{ attributes.addClass('list-group') }}>
    {% for item in content %}
      <dt class="list-group__link">{{ item.link }}</dt>
      {% if item.description %}
        <dd class="list-group__description" data-admin-compact-collapsible>{{ item.description }}</dd>
      {% endif %}
    {% endfor %}
  </dl>
{% endif %}
```

## Deprecated Config

There was a way to set a site wide default for the admin compact mode using the config flag `system.site:admin_compact_mode`. This was never exposed in the UI though. The site wide default is deprecated in Drupal 11.5 and is removed from Drupal 12.

*Source: [Admin compact mode logic has been moved to the frontend](https://www.drupal.org/node/3588109), a Drupal core change record by [znerol](https://www.drupal.org/user/63999) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
