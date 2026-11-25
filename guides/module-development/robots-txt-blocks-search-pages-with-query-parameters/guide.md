---
name: robots-txt-blocks-search-pages-with-query-parameters
title: "robots.txt blocks search pages with query parameters"
description: "robots.txt blocks search pages with query parameters"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3567198
change-record-nid: 3567198
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3550083](https://www.drupal.org/node/3550083)

The default robots.txt file now includes rules to prevent search engine crawlers from indexing search result pages that use query parameters. Both path-based and query parameter search URLs are blocked.

This prevents search engines from crawling URLs like `/search?q=keyword`, `/search?f[0]=type:article`, or any search result page that uses query strings.

Only sites with a customized robots.txt file should update the file to include these changes.

#### Examples for sites with a custom robots.txt

Manually add these two lines to your robots.txt file:

##### Monolingual sites

```php
Disallow: /search?
Disallow: /index.php/search?
```

##### Multilingual sites

```php
Disallow: /*/search/
Disallow: /*/search?
```

*Source: [robots.txt blocks search pages with query parameters](https://www.drupal.org/node/3567198), a Drupal core change record by [bserem](https://www.drupal.org/user/388753) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
