---
name: htmx-now-uses-version-4
title: "htmx now uses version 4"
description: "htmx now uses version 4"
drupal-core: ">=12.0"
source-url: https://www.drupal.org/node/3583674
change-record-nid: 3583674
introduced-in-version: "12.0.0-beta1"
introduced-in-branch: "12.0.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 12.0.x\
Introduced in version: 12.0.0-beta1\
Issue links: [#3555916](https://www.drupal.org/node/3555916), [#3607711](https://www.drupal.org/node/3607711)

HTMX 4 is a full rewrite of HTMX and therefore has a number of breaking changes:

- fetch() replaces XMLHttpRequest
- Explicit inheritance
- Error responses swap
- hx-delete excludes form data
- No history cache
- OOB swap order
- hx-trigger queue modifier removed
- 60-second timeout
- Extension loading

A [guide to these changes](https://four.htmx.org/docs/whats-new-in-htmx-4) is provided at htmx.org. Modules that have custom JavaScript which uses the htmx API should review that migration guide. Developers working in HTMX will also benefit from reviewing this migration information to understand the upstream changes.

This change record summarizes the changes that most directly impact Drupal development and how those upstream changes have altered our exposure of the HTMX API in Drupal.

Modules that support both Drupal 11 and Drupal 12 will need to use `\Drupal\Component\Utility\DeprecationHelper` as the changes in HTMX 4 are not backwards compatible.

## Attributes

Refactor custom implementations in this order:

1. Find and replace calls to `Htmx::disable` with `Htmx::ignore`
2. Find and replace calls to `Htmx::disabledElt` with `Htmx::disable`

The following attributes are no longer supported in HTMX 4 and their associated methods on the `Htmx` factory object have been removed:

| Removed | Use instead |
| --- | --- |
| `hx-params` | Create an event listener in javascript for the [`htmx:config:request`](https://four.htmx.org/reference/events/htmx-config-request) event |
| `hx-prompt` | [`hx-confirm`](https://four.htmx.org/reference/attributes/hx-confirm) with `js:` prefix |
| `hx-ext` | [Include extension script directly](https://four.htmx.org/docs#using-extensions) or use the contributed [htmx module's extension integration](https://project.pages.drupalcode.org/htmx/tools/extensions/). |
| `hx-disinherit` | Not needed (inheritance is explicit) |
| `hx-inherit` | Not needed (inheritance is explicit) |
| `hx-request` | [`hx-config`](https://four.htmx.org/reference/attributes/hx-config) |
| `hx-history` | Removed (no [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)) An [extension](https://four.htmx.org/extensions/hx-history-cache)is provided. |

**hx-query**\
A new attribute in in HTMX 4. Supports the Internet Engineering Task Force's proposal: [RFC 10008: The HTTP QUERY Method](https://www.rfc-editor.org/info/rfc10008/). Drupal's `Htmx` class has an added method for the new `hx-query` attribute.

**hx-action**\
A new attribute in in HTMX 4. Used to specify a URL, with optional `hx-method`. Supports progressive enhancement via native action/method fallback. Drupal's `Htmx` class has an added method for the new `hx-action` attribute.

**hx-method**\
A new attribute in in HTMX 4. Used to specify the HTTP method (overrides native method and formmethod). Drupal's `Htmx` class has an added method for the new `hx-method` attribute.

**hx-on**\
The syntax for `hx-on` is revised in HTMX 4 and `Htmx::on` has been adjusted to support this new syntax.

Internal HTMX events on longer use camelCase but are colon separated lower case. Kebab case conversion is no longer needed and has been removed.\
Both the simple `data-hx-on:event="action"` format and the extended data-hx-on="event modifier -> action" formats are supported.

Examples:

```php
(new Htmx())->on('event', 'action')->applyTo($element);
```

```php
(new Htmx())->on([
'event1 modifier' => 'action1',
'event2' => 'action2'
])->applyTo($element);
```

Developers using `hx-on` should review the [full documentation on htmx.org](https://four.htmx.org/reference/attributes/hx-on).

**hx-status**

> *Error responses swap*
>
> htmx 4 swaps all HTTP responses. Only 204 and 304 do not swap.
>
> htmx 2 did not swap 4xx and 5xx responses. In htmx 4, if your server returns HTML with a 422 or 500, that HTML gets swapped into the target. Design your error responses to work as swap content, or use `hx-status` to control per-code behavior.

Drupal's `Htmx` class has an added method for the new `hx-status`. See [hx-status](https://four.htmx.org/reference/attributes/hx-status) for full documentation on how this attribute is used.

## Headers

### Removed

The following response headers are no longer supported in HTMX 4 and their associated methods have been removed:

- HX-Trigger-After-Swap
- HX-Trigger-After-Settle

Either the remaining `HX-Trigger` header can be used, or javascript can respond to an event in the [htmx response cycle](https://four.htmx.org/docs/whats-new-in-htmx-4#events).

The `HX-Prompt` request header is no longer provided and the associated method\ `Drupal\Core\Htmx\HtmxRequestInfoTrait::getHtmxPrompt ` is removed.

### Replaced

The *HX-Trigger* request header has been replaced with the *HX-Source* header. An associated method is added: `HtmxRequestInfoTrait::getHtmxSource()`. The format of HX-Source header is now CSS selector of tag type and attribute. The attribute in order of precedence is name if present, or drupal-data-selector if present, or the htmx default which is id if present

1. button\[name="first_item"\]
2. button\[data-drupal-selector="first_item"\]
3. button#first_item
4. button

### Added

A new *HX-Request-Type* header is [added in in HTMX 4](https://four.htmx.org/reference/headers/HX-Request-Type). Support for this header has been added to `HtmxRequestInfoTrait`.

## Inheritance

Inheritance in HTMX 2 was implicit and in HTMX 4 is [now explicit](https://four.htmx.org/docs/whats-new-in-htmx-4#explicit-inheritance). Inheritance modifiers are generally available on attribute methods and two byte flag constants are added to the `Htmx` class to control inheritance:

- `Htmx::NO_MODIFIER`: A flag value declaring that the HTMX attribute has no modifier
- `Htmx::INHERITED`: A flag value declaring that the `:inherited` modifier should be appended.
- `Htmx::APPEND`: A flag value declaring that the `:append` modifier should be appended.

## Events

Developers who have created custom Javascript that uses HTMX event names will need to revise their code. All events in [HTMX 4](https://four.htmx.org/docs/whats-new-in-htmx-4#events) use revised names.

## Class Constants

The class constant `\Drupal\Core\Form\FormBuilderInterface::HTMX_REQUEST` is deprecated and will be removed in Drupal 13. It was no longer needed in FormBuilder and a search reveals no uses in contributed modules.

*Source: [htmx now uses version 4](https://www.drupal.org/node/3583674), a Drupal core change record by [fathershawn](https://www.drupal.org/user/628748) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
