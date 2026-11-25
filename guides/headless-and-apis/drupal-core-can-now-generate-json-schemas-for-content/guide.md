---
name: drupal-core-can-now-generate-json-schemas-for-content
title: "Drupal core can now generate JSON Schemas for content entities"
description: "Drupal core can now generate JSON Schemas for content entities"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3424710
change-record-nid: 3424710
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3031367](https://www.drupal.org/node/3031367)

Drupal core can now generate [JSON Schemas](https://json-schema.org/specification) for content entity types.

The typed data, serialization and field APIs have been enhanced to allow field-level schemas to be generated based on their storage configuration.

All field types shipped by core now provide JSON Schemas out of the box through their default normalizers. In addition, all the core typed data plugins provide JSON Schemas as well. This means that all core fields can generate JSON Schemas for their properties out of the box. Additionally, most field types provided by contrib or custom modules will generate JSON Schemas automatically so long as they do not provide a custom normalizer or depend on non-core typed data plugins.

While Drupal Core now contains an API for generating these schemas for content entity types, site-wide schema generation in an end-user format (e.g., OpenAPI) is left to contrib and custom code. The [`openapi_jsonapi`](https://drupal.org/project/openapi_jsonapi) module uses this new functionality to provide an OpenAPI schema document for sites using JSON:API.

**Expert mode**

In a case where custom or contrib code *does* implement a custom normalizer or typed data plugins (this is rare), they can be updated to provide JSON Schemas. If a higher-level core normalizer attempts to ascertain a JSON Schema from a class which does not support it, a no-op schema containing only a comment will be generated.

Custom typed data plugins which provide their value through the `TypedDataInterface::getValue()` method may simply add the new `JsonSchema` attribute to that method.

If a different method is used (see `PrimitiveDataNormalizer` for example, which calls `PrimitiveInterface::getCastedValue()`) see `PrimitiveDataNormalizer::getNormalizationSchema()` for an example of a more complex pattern.

In only very rare cases will non-core code need to configure a normalizer explicitly for JSON Schema support; see `FieldNormalizer` and `FieldItemNormalizer` if you veer into this expert territory.

*Source: [Drupal core can now generate JSON Schemas for content entities](https://www.drupal.org/node/3424710), a Drupal core change record by [bradjones1](https://www.drupal.org/user/405824) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
