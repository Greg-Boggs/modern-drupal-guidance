---
name: filters-now-store-the-allowed-html-setting-as-a-sorted
title: "Filters now store the allowed_html setting as a sorted string for better diffs"
description: "Filters now store the allowed_html setting as a sorted string for better diffs"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/2884686
change-record-nid: 2884686
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#2871354](https://www.drupal.org/node/2871354)

The configuration for filter formats with the Filter HTML plugin are saved with the `allowed_html` configuration sorted alphabetically. The list of html tags is sorted alphabetically.

Site administrators should expect to see this change in their diff when exporting configuration and committing it to version control.

**Before**

```php
  allowed_html: '<a href hreflang> <em> <strong> <cite> <blockquote cite> <code> <ul type> <ol start type> <li> <dl> <dt> <dd> <h2 id> <h3 id> <h4 id> <h5 id> <h6 id> <p> <br> <span> <img src alt height width data-entity-type data-entity-uuid data-align data-caption>'
```

**After**

```php
  allowed_html: '<a href hreflang> <blockquote cite> <br> <cite> <code> <dd> <dl> <dt> <em> <h2 id> <h3 id> <h4 id> <h5 id> <h6 id> <img src alt height width data-entity-type data-entity-uuid data-align data-caption> <li> <ol start type> <p> <span> <strong> <ul type>'
```

*Source: [Filters now store the allowed_html setting as a sorted string for better diffs](https://www.drupal.org/node/2884686), a Drupal core change record by [sam152](https://www.drupal.org/user/1485048) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
