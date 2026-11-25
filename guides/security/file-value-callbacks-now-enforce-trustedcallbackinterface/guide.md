---
name: file-value-callbacks-now-enforce-trustedcallbackinterface
title: "#file_value_callbacks now enforce TrustedCallbackInterface protections"
description: "#file_value_callbacks now enforce TrustedCallbackInterface protections"
drupal-core: ">=12.1"
source-url: https://www.drupal.org/node/3620771
change-record-nid: 3620771
introduced-in-version: "12.1.0"
introduced-in-branch: "12.1.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 12.1.x\
Introduced in version: 12.1.0\
Issue links: [#3218381](https://www.drupal.org/node/3218381)

`\Drupal\file\Element\ManagedFile::valueCallback()` now validates `#file_value_callbacks` entries the same way core validates `#process`, `#pre_render`, and other render callbacks.

Previously, `#file_value_callbacks` executed any callable directly, bypassing the protections added by [#2966327: Limit what can be called by a callback in render arrays to reduce the risk of RCE](https://www.drupal.org/project/drupal/issues/2966327). This allowed arbitrary code execution if untrusted input reached this property.

Each callback must now be one of:

- A method tagged with the `\Drupal\Core\Security\Attribute\TrustedCallback` attribute.
- A method of a class implementing `\Drupal\Core\Security\TrustedCallbackInterface`, listed in `trustedCallbacks()`.
- An anonymous function.

A callback that meets none of these throws `\Drupal\Core\Security\UntrustedCallbackException`.

Update any code that sets `#file_value_callbacks` to use one of these approaches.

*Source: [#file_value_callbacks now enforce TrustedCallbackInterface protections](https://www.drupal.org/node/3620771), a Drupal core change record by [kim.pepper](https://www.drupal.org/user/370574) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
