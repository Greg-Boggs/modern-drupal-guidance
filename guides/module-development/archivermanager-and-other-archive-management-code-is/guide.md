---
name: archivermanager-and-other-archive-management-code-is
title: "ArchiverManager and other archive management code is deprecated"
description: "ArchiverManager and other archive management code is deprecated"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3556927
change-record-nid: 3556927
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3556706](https://www.drupal.org/node/3556706)

Drupal has a plugin manager and related code to handle listing and extracting archived files. Since the ability to update code via tar.gz or zip file was previously deprecated and removed, there is no use case for generic archive management in core any longer.

The following classes are deprecated for removal in Drupal 12:

```php
\Drupal\Core\Archiver\ArchiverException
\Drupal\Core\Archiver\ArchiverInterface
\Drupal\Core\Archiver\ArchiverManager
\Drupal\Core\Archiver\Tar
\Drupal\Core\Archiver\Zip
```

`\Drupal\Core\Archiver\ArchiveTar`, which is a thin wrapper around PEAR's Archive_Tar, will remain as the bulk config UI import/export interface still uses it.

There is no replacement. For tar.gz files you can switch to using ArchiveTar. For zip files you can use the PHP Zip extension directly.

*Source: [ArchiverManager and other archive management code is deprecated](https://www.drupal.org/node/3556927), a Drupal core change record by [longwave](https://www.drupal.org/user/246492) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
