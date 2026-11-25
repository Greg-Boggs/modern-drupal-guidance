---
name: phpunit-htmloutputlogger-extension-replaces
title: "PHPUnit - HtmlOutputLogger extension replaces HtmlOutputPrinter"
description: "PHPUnit - HtmlOutputLogger extension replaces HtmlOutputPrinter"
drupal-core: ">=11.0"
source-url: https://www.drupal.org/node/3453468
change-record-nid: 3453468
introduced-in-version: "11.0.0"
introduced-in-branch: "11.0.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.0.x\
Introduced in version: 11.0.0\
Issue links: [#3417066](https://www.drupal.org/node/3417066), [#3453341](https://www.drupal.org/node/3453341)

In PHPUnit 9 (Drupal 10), the class providing HTML output logging was controlled by the `printerClass` attribute in the `phpunit.xml` configuration file (or via the `--printer` command line parameter):

```php
<phpunit xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         bootstrap="tests/bootstrap.php" colors="true"
         beStrictAboutTestsThatDoNotTestAnything="true"
         beStrictAboutOutputDuringTests="true"
         beStrictAboutChangesToGlobalState="true"
         failOnWarning="true"
         printerClass="\Drupal\Tests\Listeners\HtmlOutputPrinter"
         cacheResult="false"
         xsi:noNamespaceSchemaLocation="https://schema.phpunit.de/9.3/phpunit.xsd">
```

In PHPUnit 10 (Drupal 11), listeners were removed, and HTML output logging is now provided by the `HtmlOutputLogger` extension, configured in `phpunit.xml`:

```php
<extensions>
    <!-- Functional tests HTML output logging. -->
    <bootstrap class="Drupal\TestTools\Extension\HtmlLogging\HtmlOutputLogger">
      <parameter name="outputDirectory" value="sites/simpletest/browser_output"/>
      <parameter name="verbose" value="true"/>
    </bootstrap>
  </extensions>
```

The extension has two parameters:

- outputDirectory - indicating where the output pages are stored, defaults to `sites/simpletest/browser_output`
- verbose - indicating if the list of all pages produced should be output in the test report, defaults to `true`

The parameters can be respectively *overridden* by the value of the following environment variables, so that CI scripts can change the setup without changing the xml configuration file:

- BROWSERTEST_OUTPUT_DIRECTORY - if set to empty string '', the output is disabled
- BROWSERTEST_OUTPUT_VERBOSE

*If a module uses a custom `phpunit.xml` configuration file, the extension must be configured if HTML output is required.*

*Source: [PHPUnit - HtmlOutputLogger extension replaces HtmlOutputPrinter](https://www.drupal.org/node/3453468), a Drupal core change record by [mondrake](https://www.drupal.org/user/1307444) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
