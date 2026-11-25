---
name: changes-required-for-phpunit-10-compatibility
title: "Changes required for PHPUnit 10 compatibility"
description: "Changes required for PHPUnit 10 compatibility"
drupal-core: ">=11.0"
source-url: https://www.drupal.org/node/3365413
change-record-nid: 3365413
introduced-in-version: "11.0.0"
introduced-in-branch: "11.0.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.0.x\
Introduced in version: 11.0.0\
Issue links: [#3217904](https://www.drupal.org/node/3217904), [#3354382](https://www.drupal.org/node/3354382), [#3406006](https://www.drupal.org/node/3406006), [#3306554](https://www.drupal.org/node/3306554), [#3417650](https://www.drupal.org/node/3417650), [#3417066](https://www.drupal.org/node/3417066), [#3453341](https://www.drupal.org/node/3453341)

PHPUnit 10 is a major version of PHPUnit that introduced massive changes to its internals. See [https://phpunit.de/announcements/phpunit-10.html](https://phpunit.de/announcements/phpunit-10.html) for more info.

Several features that test developers were using are refactored, or deprecated, or removed. See [https://github.com/sebastianbergmann/phpunit/blob/10.0.0/ChangeLog-10.0.md](https://github.com/sebastianbergmann/phpunit/blob/10.0.0/ChangeLog-10.0.md) for the full list at the time of the release of PHPUnit 10.0.0, and the changelog files for each of the PHPUnit minors from 10.1 to 10.5 for the additional changes during PHPUnit 10 lifecycle. PHPUnit actually released its major 11 in February 2024, so we can expect PHPUnit 10 itself to be relatively stable in feature-wise.

This CR lists the more significant impacts for Drupal tests, providing suggestions on how to refactor where needed.

### PHPUnit configuration options have changed

The schema of `phpunit.xml` has changed between PHPUnit 9 and PHPUnit 10. If you had a custom `phpunit.xml` you need to run `vendor/bin/phpunit --migrate-configuration` to automatically upgrade your configuration.

If you are developing for both Drupal 10 and 11, in some cases it may be easier to use the default `phpunit.xml.dist` configuration file provided by core and override settings via environment variables, which avoids switching configurations or maintaining two custom `phpunit.xml` files.

### @dataProvider methods must be static

@dataProviders methods must be static. Not adhering to this throws a PHPUnit deprecation in PHPUnit 10. This means that data provider methods should not rely on instantiated test objects properties and methods, but rather be self sufficient. The immediate impact is that any reference to `$this` in data provider methods should be refactored to something else - and something `static` itself. There's no one stop shop solution for this, it needs mindful refactoring. However, some cases can be addressed consistently. For example, moving mock creation to test methods in unit tests. See [#3353210: \[PHPUnit 10\] @dataProvider methods must be declared static and public](https://www.drupal.org/project/drupal/issues/3353210) and its child issues for examples.

### ::withConsecutive() in mocks is no longer available

`InvocationMocker::withConsecutive()` is removed from PHPUnit 10. Drupal core replaced its usage in [#3406006: \[META\] Convert use of InvocationMocker::withConsecutive()](https://www.drupal.org/project/drupal/issues/3406006) and its child issues which can be referred to for examples.

See for example: [https://git.drupalcode.org/project/drupal/-/commit/73bc225ca3436963dd544...](https://git.drupalcode.org/project/drupal/-/commit/73bc225ca3436963dd544eebb37808dd9234e184)

### ::expectError\*() and ::expectWarning\*() methods are removed

PHPUnit 10

- Removed the expectError(), expectErrorMessage(), and expectErrorMessageMatches() methods
- Removed the expectNotice(), expectNoticeMessage(), and expectNoticeMessageMatches() methods
- Removed the expectWarning(), expectWarningMessage(), and expectWarningMessageMatches() methods

In general, services should either inject a logger instead of using trigger_error(), or throw an exception or use assertions to handle errors using development. See [#3417650: \[meta\] Replace calls to ::expectError\*() and ::expectWarning\*()](https://www.drupal.org/project/drupal/issues/3417650) and its child issues for changes in core.

### Listeners are removed

PHPUnit 10 introduced an own event system, and listeners (that were deprecated in PHPUnit 8) are now removed. This impacts advanced use cases only. Core implementations of listeners, including the HTML output logger, are replaced by alternative solutions in [#3417066: Upgrade PHPUnit to 10, drop Symfony PHPUnit-bridge dependency](https://www.drupal.org/project/drupal/issues/3417066).

### PHPUnit own deprecations can no longer be expected/ignored

PHPUnit 10 reports its own deprecations differently; it no longer uses `trigger_error()` for the purpose, but its own internal event system. The deprecation bridge cannot handle them, that have to be solved to get tests pass.

### HtmlOutputLogger extension replaces HtmlOutputPrinter

In PHPUnit 9 (Drupal 10), the class providing HTML output logging was controlled by the `printerClass` attribute in the `phpunit.xml` configuration file (or via the `--printer` command line parameter). Since in PHPUnit 10 (Drupal 11) listeners are removed, HTML output logging is now provided by the `HtmlOutputLogger` extension. See [https://www.drupal.org/node/3453468](https://www.drupal.org/node/3453468) for details on how to configure the extension.

*Source: [Changes required for PHPUnit 10 compatibility](https://www.drupal.org/node/3365413), a Drupal core change record by [mondrake](https://www.drupal.org/user/1307444) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
