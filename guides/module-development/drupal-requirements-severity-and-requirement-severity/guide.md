---
name: drupal-requirements-severity-and-requirement-severity
title: "drupal_requirements_severity() and REQUIREMENT_* severity constants have been deprecated."
description: "drupal_requirements_severity() and REQUIREMENT_* severity constants have been deprecated."
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3410939
change-record-nid: 3410939
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3410938](https://www.drupal.org/node/3410938)

## Requirements severity constants have been replaced with an enum

| Before | After |
| --- | --- |
| `REQUIREMENT_INFO` | `\Drupal\Core\Extension\Requirement\RequirementSeverity::Info` |
| `REQUIREMENT_OK` | `\Drupal\Core\Extension\Requirement\RequirementSeverity::OK` |
| `REQUIREMENT_WARNING` | `\Drupal\Core\Extension\Requirement\RequirementSeverity::Warning` |
| `REQUIREMENT_ERROR` | `\Drupal\Core\Extension\Requirement\RequirementSeverity::Error` |

## Deprecated functions related to requirements severity

`drupal_requirements_severity()` has been deprecated and has been replaced with a method on the enum: `\Drupal\Core\Extension\Requirement\RequirementSeverity::getMaxSeverity()`

`Drupal\Core\Render\Element\StatusReport::getSeverities()` has been deprecated with no replacement. Using the enum directly is a better approach.

*Source: [drupal_requirements_severity() and REQUIREMENT\_\* severity constants have been deprecated.](https://www.drupal.org/node/3410939), a Drupal core change record by [kim.pepper](https://www.drupal.org/user/370574) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
