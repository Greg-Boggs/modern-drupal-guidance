---
name: ajax-subsystem-now-includes-htmx
title: "Ajax subsystem now includes HTMX"
description: "Ajax subsystem now includes HTMX"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3539472
change-record-nid: 3539472
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3524030](https://www.drupal.org/node/3524030), [#3535173](https://www.drupal.org/node/3535173)

HTMX is designed as an extension of HTML. It is therefore a declarative markup system that uses attributes.

```php
<button hx-get="/contacts/1" hx-target="#contact-ui">
    Fetch Contact
</button>
```

> Instead, we have *declarative* attributes much like the\
> `href` attribute on anchor tags and the `action`\
> attribute on form tags. The `hx-get` attribute tells htmx:\
> “When the user clicks this button, issue a `GET` request to\
> `/contacts/1`.” The `hx-target` attribute tells\
> htmx: “When the response returns, take the resulting HTML and place it\
> into the element with the id `contact-ui`.”

*from* [Hypermedia Systems](https://hypermedia.systems/hypermedia-a-reintroduction/#_hypermedia_driven_applications)

HTMX is just as happy with `data-hx-get` and so we will maintain standard markup in our implementation.

HTMX uses over [30 such attributes](https://htmx.org/reference/). The other control surface for HTMX is a set of response headers. HTMX supports [11 custom response headers](https://htmx.org/reference/#response_headers).

**New Classes**

`\Drupal\Core\Htmx\Htmx` provides methods to build the 30 custom attributes used by HTMX. This class also provides methods to implement the headers that HTMX declares as part of its controls. Each method is documented with a short explanation and a link to the attribute or header documentation.

Another way of understanding this class is to regard the attributes and headers of HTMX and their expected data as an interface. `\Drupal\Core\Htmx\Htmx` implements this interface within Drupal and modifies our normal render array to produce the needed attributes and headers. This class intentionally does not have a PHP interface given this consideration of the native HTMX controls as the interface for this class. This means that the class is [internal by policy](https://www.drupal.org/about/core/policies/core-change-policies/bc-policy#public-methods) and open to change but it will only change if the HTMX library changes.

Developers familiar with the `\Drupal\Core\Cache\CacheableMetadata` class and its interaction with render arrays cache key-value pairs will find the same pattern implemented in `Htmx`.

`\Drupal\Core\Render\Hypermedia\HtmxLocationResponseData` is added as an optional data object to manage the structured data that can be used with the HTMX location header.

**Revised Class**

`\Drupal\Core\Form\FormBuilder` has been revised to be aware of HTMX requests in parity with its awareness of Ajax API requests. HTMX attributes have been added to the *form_build_id* element so that this value is dynamically updated when responding to an HTMX request. This requires that the custom headers added by HTMX be available on the request object. Hosting environments that filter non-standard headers should be adjusted to permit the request headers used by HTMX which are listed below.

**Required Request Headers**

HTMX adds the [following headers](https://htmx.org/reference/#request_headers). Proxies or hosting setups that filter out non-standard headers should be adjusted to permit these headers:

- HX-Boosted
- HX-Current-URL
- HX-History-Restore-Request
- HX-Prompt
- HX-Request
- HX-Target
- HX-Trigger-Name
- HX-Trigger

**References**\
[Htmx documentation](https://htmx.org/reference/)\
[Little HTMX Book](https://littlehtmxbook.com/) is a brief exploration of using HTMX.\
[Hypermedia Systems](https://hypermedia.systems/book/contents/) is an extended exploration of htmx as an implementation of hypermedia.

**Before (Ajax API)**\
Ajax API and its predecessors has been our tool for adding this type of interactivity for about 15 years.

```php
$config_types = [
   'system.simple' => $this->t('Simple configuration'),
] + $entity_types;
 $form['config_type'] = [
  '#title' => $this->t('Configuration type'),
  '#type' => 'select',
  '#options' => $config_types,
  '#default_value' => $config_type,
  '#ajax' => [
    'callback' => '::updateConfigurationType',
    'wrapper' => 'js-config-form-wrapper',
  ],
];
```

**Before**\
HTMX was added as a dependency in 11.2 so it has been possible to directly add htmx specific attributes to a render array. For example:

```php
use Drupal\Core\Url;

/*
 * - Send a POST request to the form URL.
 * - Select the wrapper element of the config_name <select> element from the response.
 * - Target the wrapper element of the config_name <select> in the rendered form for replacement.
 * - Use the outerHTML strategy, which is to replace the whole tag.
 */
);
$form['config_type'] = [
  '#title' => $this->t('Configuration type'),
  '#type' => 'select',
  '#options' => $config_types,
  '#default_value' => $config_type,
  '#attributes' => [
    'data-hx-post' => '/admin/config/development/configuration/single/export',
    'data-hx-select' => '*:has(>select[name="config_name"])',
    'data-hx-target' => '*:has(>select[name="config_name"])',
    'data-hx-swap' => 'outerHTML',
  ],
  '#attached' => [
    'library' => ['core/drupal.htmx'],
  ]
];

// Update the url when the config name selector dynamically changes.
if (!empty($default_type) && !empty($default_name)) {
  $push = Url::fromRoute('config.export_single', [
    'config_type' => $default_type,
    'config_name' => $default_name,
  ]);
  $form['config_name']['#attached']['http_header'][] = [
    'HX-Push-Url',
    $push->toString(),
    TRUE,
  ];
}
```

**After**

```php
use Drupal\Core\Htmx\Htmx;
use Drupal\Core\Url;

$form['config_type'] = [
  '#title' => $this->t('Configuration type'),
  '#type' => 'select',
  '#options' => $config_types,
  '#default_value' => $config_type,
];

$form_url = Url::fromRoute(
  'config.export_single',
  ['config_type' => $config_type, 'config_name' => $config_name]
);
(new Htmx())->post($form_url)
  ->select('*:has(>select[name="config_name"])')
  ->target('*:has(>select[name="config_name"])')
  ->swap('outerHTML')
  ->applyTo($form['config_type']);

// Update the url when the config name selector dynamically changes.
if (!empty($default_type) && !empty($default_name)) {
  $push = Url::fromRoute('config.export_single', [
    'config_type' => $default_type,
    'config_name' => $default_name,
  ]);
(new Htmx())
  ->pushUrlHeader($push)
  ->applyTo($form['config_name']);
}
```

Whenever a method calls for a `Url` object, the cacheable metadata emitted by rendering the object to string is also collected and merged to the render array by the `::applyTo` method.

A static method `Htmx::createFromRenderArray` is provided which takes a render array as input and builds an new instance of `Htmx` with all the HTMX specific attributes and headers loaded from the array.

*Source: [Ajax subsystem now includes HTMX](https://www.drupal.org/node/3539472), a Drupal core change record by [fathershawn](https://www.drupal.org/user/628748) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
