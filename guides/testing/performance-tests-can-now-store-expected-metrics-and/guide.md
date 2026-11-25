---
name: performance-tests-can-now-store-expected-metrics-and
title: "Performance tests can now store expected metrics and queries in separate files and update them"
description: "Performance tests can now store expected metrics and queries in separate files and update them"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3618676
change-record-nid: 3618676
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#3618432](https://www.drupal.org/node/3618432)

\Drupal\Tests\PerformanceTestTrait has two new methods:

```php
assertMetricsByName(string $name, PerformanceData $performance_data, array $metrics = []);
assertQueriesByName(string $name, array $queries);
```

These will store the expected metrics (as formatted YAML) and queries (as plain list of queries, one per line) in separate named files in a `TestClassAssertions` folder next to the test class.

If the files do not exist yet or the PERF_TEST_UPDATE environment variable is set to a value that evaluates to true (such as 1), the files will be updated instead of asserted.

If metric files do not exist yet and no specific set of metrics is provided, they are populated with a default list of common metrics. If they exist and the environment variable to update them is set, only the currently set top-level keys are set.

When the expectations need to be updated, it is possible to either delete specific files or the whole folder or set the environment variable, for example in phpunit.xml:

`<env name="PERF_TEST_UPDATE" value="1"/>`

*Source: [Performance tests can now store expected metrics and queries in separate files and update them](https://www.drupal.org/node/3618676), a Drupal core change record by [berdir](https://www.drupal.org/user/214652) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
