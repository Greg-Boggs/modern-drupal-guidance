---
name: html5-validation-will-be-disabled-in-drupal-12
title: "HTML5 validation will be disabled in Drupal 12"
description: "HTML5 validation will be disabled in Drupal 12"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3537128
change-record-nid: 3537128
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#1797438](https://www.drupal.org/node/1797438)

A new setting for controlling HTML5 validation, `enable_html5_validation`, is added to the `settings.php` file.

This setting allows sites to decide whether to use client-side HTML validation. Using client-side HTML5 validation (e.g., required, pattern) can cause accessibility and user experience issues. On form submit with missing or invalid input, the browser will display generic validation messages and prevent the Drupal's Form API (FAPI) validation from executing. Thus, Drupal error messages are not displayed.

This results in a poor user experience, especially for those relying on screen readers, keyboard navigation, or translated interfaces. Native browser error messages cannot be customized, styled, or localized, and only appear for one field at a time.

In Drupal 11 this setting defaults to `TRUE` and HTML5 validation is enabled, which retains the existing behavior.

In Drupal 12 this setting defaults to `FALSE` and HTML5 validation is disabled.

In Drupal 13 this setting is scheduled to be removed and HTML5 validation will be disabled on all forms.

**Note:** This change only affects validation. HTML5 input types such as `email` and `tel` can still be used.

### To change the default behavior

#### Drupal 11

Sites that want to disable HTML5 validation can do so by setting 'enable_html5_validation' to FALSE in `settings.php`.

`$settings['enable_html5_validation'] = FALSE;`

#### Drupal 12

Sites that want to enable HTML5 validation can do so by setting 'enable_html5_validation' to TRUE in `settings.php`.

`$settings['enable_html5_validation'] = TRUE;`

**Note:** Drupal has a feature for making a form field required using JavaScript. For these fields with HMTL5 validation disabled, it is possible to submit a form even when they are empty. For more information, see [#3592742: States API required fields don't work without HTML5 validation](https://www.drupal.org/project/drupal/issues/3592742).

*Source: [HTML5 validation will be disabled in Drupal 12](https://www.drupal.org/node/3537128), a Drupal core change record by [shubham_pareek_19](https://www.drupal.org/user/3787312) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
