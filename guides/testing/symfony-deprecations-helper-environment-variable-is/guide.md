---
name: symfony-deprecations-helper-environment-variable-is
title: "SYMFONY_DEPRECATIONS_HELPER environment variable is deprecated"
description: "SYMFONY_DEPRECATIONS_HELPER environment variable is deprecated"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3594014
change-record-nid: 3594014
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#3589108](https://www.drupal.org/node/3589108)

The SYMFONY_DEPRECATIONS_HELPER environment variable is no longer used to setup test runs' deprecation reporting, and its use is deprecated.

Its logic has been replaced by the DeprecationHandler extension, that needs to be configured in phpunit.xml as follows:

```php
  <extensions>
    <!-- Deprecation handler.
      This extension allows to ignore some deprecations on the project overall,
      and/or to enable the Symfony debug classloader to trigger deprecations
      while checking class parameters and return types at class loading time.
      The configuration defined here can be overridden by defining the
      environment variable DRUPAL_DEPRECATION_FILTER_CONFIG whose value must be
      a JSON string containing an array with the same parameter names as keys.
      For example,
      DRUPAL_DEPRECATION_FILTER_CONFIG='{"enableDebugClassLoader":false}'
    -->
    <bootstrap class="Drupal\TestTools\Extension\DeprecationBridge\DeprecationHandler">
      <!-- Set to true to enable project level deprecation ignore patterns.
        The deprecations ignored with this mechanism are not relayed to PHPUnit
        for processing. -->
      <parameter name="enableProjectIgnores" value="true"/>
      <!-- The path to a file containing the deprecation ignore patterns.
        Relative paths are resolved against Drupal's root directory. -->
      <parameter name="projectIgnoreFile" value="core/.deprecation-ignore.txt"/>
      <!-- Set to true to enable Symfony's DebugClassLoader.
        See https://github.com/symfony/error-handler -->
      <parameter name="enableDebugClassLoader" value="true"/>
    </bootstrap>

    ....

  </extensions>
```

*Source: [SYMFONY_DEPRECATIONS_HELPER environment variable is deprecated](https://www.drupal.org/node/3594014), a Drupal core change record by [mondrake](https://www.drupal.org/user/1307444) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
