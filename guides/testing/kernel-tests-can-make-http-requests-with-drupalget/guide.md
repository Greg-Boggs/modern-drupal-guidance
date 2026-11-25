---
name: kernel-tests-can-make-http-requests-with-drupalget
title: "Kernel tests can make HTTP requests with drupalGet()"
description: "Kernel tests can make HTTP requests with drupalGet()"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3502609
change-record-nid: 3502609
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3390193](https://www.drupal.org/node/3390193), [#3582769](https://www.drupal.org/node/3582769)

Kernel tests can now make HTTP requests and make assertions against the returned content, similarly to Browser tests.

This means that many Browser tests can be converted to Kernel tests, which will run significantly faster.

The test trait `\Drupal\Tests\HttpKernelUiHelperTrait` provides methods `drupalGet()`, `clickLink()`, and `assertSession()` which work the same way as the corresponding methods in the test trait `Drupal\Tests\UiHelperTrait` for Browser tests.

After a `drupalGet()` call, `assertSession()` can be used to make assertions on the page content using Mink.

The Mink driver passes requests to Drupal's HTTP kernel, rather than simulating a browser.

## Example

```php
use Drupal\KernelTests\KernelTestBase;

class MyTest extends KernelTestBase {

  public function testFoo(): void {
    $this->drupalGet('my-path');
    $this->assertSession()->pageTextContains('Page title');
    $this->assertSession()->linkExists('Read more'); 
    $this->clickLink('Read more');
    $this->assertSession()->pageTextContains('New page title');
  }
```

When converting a Functional test to a Kernel test, the setup tasks that are performed by modules enabled in the test need to be performed with API calls in the test's setup. See [the documentation page on Setup tasks in Kernel tests for more details](https://www.drupal.org/docs/automated-testing/phpunit-in-drupal/setup-tasks-in-kernel-tests).

## Limitations

Some things do not work the same as in Browser tests, or will need additional setup tasks:

- Forms cannot be submitted. This functionality may be added in a future issue.
- Session semantics differ from normal page requests. Do not rely on session state beyond its existence (no persistence or regeneration).
- There is no logged in user. Use `\Drupal\Tests\user\Traits\UserCreationTrait` to set a current user.
- There is no active theme. To place blocks, a test must first install a theme and then set it as active.
- Additional steps are needed for page caching modules to function. See Drupal\Tests\Traits\Core\Cache\PageCachePolicyTrait for details.

*Source: [Kernel tests can make HTTP requests with drupalGet()](https://www.drupal.org/node/3502609), a Drupal core change record by [joachim](https://www.drupal.org/user/107701) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
