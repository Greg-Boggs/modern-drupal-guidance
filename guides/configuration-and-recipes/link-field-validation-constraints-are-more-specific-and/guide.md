---
name: link-field-validation-constraints-are-more-specific-and
title: "Link field validation constraints are more specific and provides enough detail to editors"
description: "Link field validation constraints are more specific and provides enough detail to editors"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3614626
change-record-nid: 3614626
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#3262935](https://www.drupal.org/node/3262935)

Validation errors for Link fields are now more descriptive.\
Previously, it used to give a generic message like `The path '@uri' is invalid.`

This was difficult for users to determine the issues in the link input.

Validation messages now describe the specific validation failure, for example:

| Sample input | New message |
| --- | --- |
| Any path forbidden to the current user | The URL '@uri' is inaccessible. |
| invalid://not-a-valid-protocol | The URL '@uri' has an invalid protocol. |
| entity:non_existing_entity_type/yar | The URL '@uri' doesn't exist. |
| entity:user/invalid-parameter | The URL '@uri' has an invalid parameter. |
| Unknown | The URL '@uri' is missing a required parameter. |
| http:// | The URL '@uri' is invalid. |
| (In an external-only field) /node/add | The URL '@uri' is external, but the @field-label field only supports internal paths. |
| (In an internal-only field) [http://www.example.com/](http://www.example.com/) | The URL '@uri' is internal, but the @field-label field only supports external URLs. |

Where `@uri` is a placeholder for the given input URL.

This change improves the editorial experience by providing more clear validation message.\
Site builders and module developers does not need to update existing code unless they have automated tests or custom code that assert the exact text of Link field validation messages.

To support this change, setting the `message` property for the `LinkNotExistingInternal` or `LinkType` constraints is depreated in Drupal 11.5.0 and will not be supported in Drupal 12.

*Source: [Link field validation constraints are more specific and provides enough detail to editors](https://www.drupal.org/node/3614626), a Drupal core change record by [mohit_aghera](https://www.drupal.org/user/639098) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
