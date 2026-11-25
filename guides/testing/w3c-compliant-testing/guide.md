---
name: w3c-compliant-testing
title: "W3C compliant testing"
description: "W3C compliant testing"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3460567
change-record-nid: 3460567
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3421202](https://www.drupal.org/node/3421202), [#3462682](https://www.drupal.org/node/3462682)

### Test configuration changes

Drupal core now tests using selenium/standalone-chrome:latest via a W3C compliant webdriver.

To enable W3C mode in WebDriverTestBase tests (FunctionalJavascript) the `MINK_DRIVER_ARGS_WEBDRIVER` environment variable must pass "w3c": true in the options. For example:\
`["chrome", {"browserName":"chrome", "goog:chromeOptions":{"w3c":true, "args":["--no-sandbox","--ignore-certificate-errors", "--allow-insecure-localhost", "--headless", "--dns-prefetch-disable"]}}, "http://selenium:4444"]`

To enable W3C mode in Nightwatch tests, the `DRUPAL_TEST_WEBDRIVER_W3C` environment variable must to be set to `true`. For example:\
Add `DRUPAL_TEST_WEBDRIVER_W3C=true` to your .env file.

Non-W3C compliant testing is deprecated and will be removed in Drupal 12.

### How to make your tests W3C webdriver compatible

1. Replace calls to `::moveTo()` with `::mouseOver()`

   #### Before

   ```php
       $driver_session = $this->getSession()->getDriver()->getWebDriverSession();
       $element = $driver_session->element('css selector', '#block-branding');
       $driver_session->moveto(['element' => $element->getID()]);
   ```

   #### After

   ```php
       $this->getSession()->getDriver()->mouseOver('.//*[@id="block-branding"]');
   ```

2. Replace calls to `::getAlert_text()` with `alert()->getText()`

   #### Before

   ```php
       $session->getDriver()->getWebDriverSession()->getAlert_text();
   ```

   #### After

   ```php
       $session->getDriver()->getWebDriverSession()->alert()->getText();
   ```

3. Replace calls to `::accept_alert()` with `alert()->accept()`

   #### Before

   ```php
       $session->getDriver()->getWebDriverSession()->accept_alert();
   ```

   #### After

   ```php
       $session->getDriver()->getWebDriverSession()->alert()-> accept();
   ```

4. If you used the method `location()` on a \WebDriver\Element instance only for getting the x and y position of a html element, replace calls to `::location()` with `::rect()`

   #### Before

   ```php
       $session->getDriver()->getWebDriverSession()->element('xpath', $xpath)->location();
   ```

   #### After

   ```php
       $session->getDriver()->getWebDriverSession()->element('xpath', $xpath)->rect();
   ```

*Source: [W3C compliant testing](https://www.drupal.org/node/3460567), a Drupal core change record by [alexpott](https://www.drupal.org/user/157725) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
