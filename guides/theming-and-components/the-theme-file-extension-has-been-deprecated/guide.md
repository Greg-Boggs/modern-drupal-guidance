---
name: the-theme-file-extension-has-been-deprecated
title: "The .theme file extension has been deprecated"
description: "The .theme file extension has been deprecated"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3581222
change-record-nid: 3581222
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#3581218](https://www.drupal.org/node/3581218)

The .theme file extension has been deprecated.

Support for auto loading the .theme files will be removed in Drupal 13.

All hooks should be moved to object oriented classes.

All helper functions should move to a utility class or method on the hook class using it.

**Note**: Themes cannot define custom services so utility classes must still use service locators `\Drupal::service()` or `\Drupal::classResolver`

**Assistance with converting your theme**\
A rector rule with a helpful DDEV script exists here to assist with converting hooks: [https://gitlab.com/-/snippets/5975084](https://gitlab.com/-/snippets/5975084)\
This will convert all hooks with the correct Implements hook_foo() documentation.

All other methods should be moved to the appropriate hook class manually with the correct visibility `public` or `protected`.

Generally themes should set their minimum core_version_requirement to 11.3.0 when updating to use this feature.

In very rare circumstances where a theme must support more versions of core, you can silence the deprecation by adding the attribute below.\
Ensure you carefully read through the change record linked below and confirm the differences for backwards compatibility for OOP hooks in themes.\
`#[ExtensionFileIsConverted]` to the first function in the .theme file. You should only use this attribute if you need to support Drupal core versions lower than 11.3.0 and only after converting the functions to classes. Drupal supports themes without a .theme file on all versions greater than Drupal 11.3.0.

**Note**: The attribute only disables the deprecation, the files will all no longer be auto-loaded in Drupal 13.

#### Reference

[Hooks in themes can now be OOP](https://www.drupal.org/node/3551652) change record.

*Source: [The .theme file extension has been deprecated](https://www.drupal.org/node/3581222), a Drupal core change record by [nicxvan](https://www.drupal.org/user/531480) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
