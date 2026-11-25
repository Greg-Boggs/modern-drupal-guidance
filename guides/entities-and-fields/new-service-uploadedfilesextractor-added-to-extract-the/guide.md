---
name: new-service-uploadedfilesextractor-added-to-extract-the
title: "New service UploadedFilesExtractor added to extract the uploaded files from file field"
description: "New service UploadedFilesExtractor added to extract the uploaded files from file field"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3591900
change-record-nid: 3591900
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#3555115](https://www.drupal.org/node/3555115)

A new service has been added in FileSystem at ` Drupal\Core\File\UploadedFilesExtractor`. This service provides a central point to extract uploaded files from the request.

**Before**

```php
  $all_files = \Drupal::request()->files->get('files', []);
  if (empty($all_files[$upload_name])) {
    return FALSE;
  }
  $file_upload = $all_files[$upload_name];
```

**After**

```php
  $file_upload = \Drupal::service(UploadedFilesExtractor::class)->extractUploadedFiles($upload_name);
```

Here `$upload_name` is the name of file upload field in form.

*Source: [New service UploadedFilesExtractor added to extract the uploaded files from file field](https://www.drupal.org/node/3591900), a Drupal core change record by [mohit_aghera](https://www.drupal.org/user/639098) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
