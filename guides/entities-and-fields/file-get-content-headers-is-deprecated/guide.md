---
name: file-get-content-headers-is-deprecated
title: "file_get_content_headers() is deprecated"
description: "file_get_content_headers() is deprecated"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3494172
change-record-nid: 3494172
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3494126](https://www.drupal.org/node/3494126)

As of Drupal 11.x, the function file_get_content_headers() has been deprecated and will be removed in Drupal 12.x. This previously enabled developers to get the content headers for the file, but after a review of its usage, it is being replaced by a more standardized call to a method getDownloadHeaders() in the File Entity

Before

```php
$file = \Drupal::entityTypeManager()->getStorage('file')->load($fid);
file_get_content_headers($file);
```

After

```php
$file = \Drupal::entityTypeManager()->getStorage('file')->load($fid);
$file->getDownloadHeaders();
```

*Source: [file_get_content_headers() is deprecated](https://www.drupal.org/node/3494172), a Drupal core change record by [ramprassad](https://www.drupal.org/user/846712) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
