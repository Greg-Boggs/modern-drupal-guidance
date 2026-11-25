---
name: json-api-no-longer-validates-every-response-against-schema
title: "JSON:API no longer validates every response against schema by default"
description: "JSON:API no longer validates every response against schema by default"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3478687
change-record-nid: 3478687
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3472008](https://www.drupal.org/node/3472008)

JSON:API had a soft dependency on `justinrainbow/json-schema`; validation of the response was performed automatically if the dependency was enabled via `\Drupal\jsonapi\EventSubscriber\ResourceResponseValidator`. This has a sizable performance hit.

In Drupal 11.4 and 12.0 this dependency will be shipped as a runtime dependency in order to assist SDC and Canvas with additional validation.

JSON:API is considered stable and has an extensive suite of tests. As a result, JSON:API validation has been moved to a test-only module. If your tests were relying on this validation, you can re-enable it by installing the `jsonapi_response_validator` module.

*Source: [JSON:API no longer validates every response against schema by default](https://www.drupal.org/node/3478687), a Drupal core change record by [bbrala](https://www.drupal.org/user/3366066) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
