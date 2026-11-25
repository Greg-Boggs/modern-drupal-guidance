---
name: minimum-and-maximum-labels-are-now-configurable-in-views
title: "Minimum and Maximum labels are now configurable in Views Numeric-based Filters like Dates"
description: "Minimum and Maximum labels are now configurable in Views Numeric-based Filters like Dates"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3560313
change-record-nid: 3560313
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#3182064](https://www.drupal.org/node/3182064)

**Summary**

Numeric-based Views filters (including date filters) can now have their labels configured for the minimum and maximum input fields. Numeric filters default to "Minimum" and "Maximum"; date filters default to "Start date" and "End date". Site builders can override these labels — for example, changing a price range filter to "From" and "To" — without requiring custom code.

**Example of how to use**

1. Create a View of Articles
2. Add a Filter for 'Authored on'
3. Expose the filter
4. Set the operator to 'Between'
5. Change the minimum and maximum labels to 'From' and 'To'

Here is how the new inputs appear in the Exposed Filter configuration form:

![Screenshot of the Minimum and Maximum label configuration form](https://www.drupal.org/files/configure-minimum-maximum-filter.png)

**Considerations for module maintainers that extend the numeric or date filter handlers**

The update hook checks for the existence of `min_placeholder` in the configuration, and if found and no `min_label` or `max_label` are set, it automatically adds them with the previous default of 'Min' and 'Max'.

If your module provides default Views configuration (e.g. via `config/install/`) using the handler (or extending it), you should also update your default configuration to include the `min_label` and `max_label`.

*Source: [Minimum and Maximum labels are now configurable in Views Numeric-based Filters like Dates](https://www.drupal.org/node/3560313), a Drupal core change record by [scott_euser](https://www.drupal.org/user/3267594) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
