---
name: robots-txt-does-not-block-search-pages-with-query
title: "robots.txt does not block search pages with query parameters anymore"
description: "robots.txt does not block search pages with query parameters anymore"
drupal-core: ">=12.0"
source-url: https://www.drupal.org/node/3627873
change-record-nid: 3627873
introduced-in-version: "12.0.0"
introduced-in-branch: "12.0.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 12.0.x\
Introduced in version: 12.0.0\
Issue links: [#3627629](https://www.drupal.org/node/3627629)

[Robots were blocked from indexing search result pages with query strings in Drupal 11.4.0](https://www.drupal.org/node/3567198). As Search module was removed from Drupal 12, this part of robots.txt was also removed.

If you are moving to the contributed Search module, you'll now need to manually add it back to your site's robots.txt.

These lines are not in robots.txt anymore:

```php
Disallow: /search/
Disallow: /search?
Disallow: /index.php/search/
Disallow: /index.php/search?
```

*Source: [robots.txt does not block search pages with query parameters anymore](https://www.drupal.org/node/3627873), a Drupal core change record by [gábor hojtsy](https://www.drupal.org/user/4166) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
