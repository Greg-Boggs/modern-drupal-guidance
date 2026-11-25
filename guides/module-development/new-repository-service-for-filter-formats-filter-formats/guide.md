---
name: new-repository-service-for-filter-formats-filter-formats
title: "New repository service for filter formats. filter_formats(), filter_formats_reset(), filter_get_formats_by_role(), filter_default_format() & filter_fallback_format() are deprecated"
description: "New repository service for filter formats. filter_formats(), filter_formats_reset(), filter_get_formats_by_role(), filter_default_format() & filter_fallback_format() are deprecated"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3035368
change-record-nid: 3035368
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#2536594](https://www.drupal.org/node/2536594)

There's a new service `Drupal\filter\FilterFormatRepositoryInterface` accomplishing the functionality of `formats. filter_formats()`, `filter_formats_reset()`, `filter_get_formats_by_role()`, `filter_default_format()` & `filter_fallback_format()` which now are deprecated and will be removed in Drupal 13.

| Before | After |
| --- | --- |
| `filter_formats()` | `$repository->getAllFormats()` |
| `filter_formats(User::load(123))` | `$repository->getFormatsForAccount(User::load(123))` |
| `$id = 'basic_html'; $format = FilterFormat::load($id); filter_get_roles_by_format($format); ` | `FilterFormat::load('basic_html')->getRoles()` |
| `filter_get_formats_by_role('moderator')` | `$repository->getFormatsByRole('moderator')` |
| `filter_default_format(User::load(123))` | `$repository->getDefaultFormat(User::load(123))->id()` |
| `filter_fallback_format()` | `$repository->getFallbackFormatId()` |
| `filter_formats_reset()` | `// Inject entity type manager and memory cache if possible $tags = \Drupal::entityTypeManager() ->getDefinition('filter_format') ->getListCacheTags(); \Drupal::cache('memory')->invalidateTags($tags); ` Note: This is rarely if ever needed. The new memory caches are automatically invalidated if formats change and browser tests also reset memory caches on POST requests. Before updating the calls, it is recommended to first test if it works without it. |

Other changes:

- The `filter_format` entity is exposing a new method `\Drupal\filter\FilterFormatInterface::getRoles()`, which returns a list of roles that are allowed for this text format.
- The constructor \Drupal\filter\FilterFormatListBuilder requires now injecting the new `Drupal\filter\FilterFormatRepositoryInterface` service as the 5th parameter.
- Passing `'filter_formats'` string to `drupal_static_reset()` is also deprecated.

*Source: [New repository service for filter formats. filter_formats(), filter_formats_reset(), filter_get_formats_by_role(), filter_default_format() & filter_fallback_format() are deprecated](https://www.drupal.org/node/3035368), a Drupal core change record by [claudiu.cristea](https://www.drupal.org/user/56348) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
