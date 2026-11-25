---
name: param-convertor-can-add-a-route-requirement-for-the
title: "Param convertor can add a route requirement for the parameter"
description: "Param convertor can add a route requirement for the parameter"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3582454
change-record-nid: 3582454
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#3475540](https://www.drupal.org/node/3475540)

A new interface `\Drupal\Core\ParamConverter\ParamConverterRequirementsInterface` has been introduced. Param converters that implement this interface can provide a regex pattern for route parameters they handle. The `ParamConverterManager` automatically calls `getRouteRequirement()` during route building and sets the returned regex as a route requirement, provided the route does not already define one for that parameter.

This allows routes to reject invalid parameter values at the routing level (before the param converter's `convert()` method is ever called), resulting in a faster 404 response with no unnecessary entity loading.

To take advantage of this feature in a custom param converter:

1. Implement `ParamConverterRequirementsInterface` in addition to `ParamConverterInterface`.
2. Return a regex string from `getRouteRequirement()`, or `NULL` if no requirement can be determined for a given parameter definition.

*Source: [Param convertor can add a route requirement for the parameter](https://www.drupal.org/node/3582454), a Drupal core change record by [alexpott](https://www.drupal.org/user/157725) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
