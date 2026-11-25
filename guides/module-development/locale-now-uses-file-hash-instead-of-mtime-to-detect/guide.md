---
name: locale-now-uses-file-hash-instead-of-mtime-to-detect
title: "Locale now uses file hash instead of mtime to detect translation file changes"
description: "Locale now uses file hash instead of mtime to detect translation file changes"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3576427
change-record-nid: 3576427
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3575678](https://www.drupal.org/node/3575678)

The Locale module previously used file modification timestamps (`filemtime()`) to determine whether a local `.po` translation file had changed and needed to be re-imported. This approach is unreliable in modern deployment workflows — most notably when Docker `COPY` commands are used to add translation files to an image, because Docker does not preserve file mtimes.

The module now computes a **xxHash (xxh128)** of each local translation file and stores it in a new `hash` column on the `{locale_file}` database table. Change detection for local files is based on hash comparison rather than timestamp comparison.

For **remote translation files**, the behaviour is unchanged — timestamp comparison using the HTTP `Last-Modified` header is still used, as no local file content is available before download.

*Source: [Locale now uses file hash instead of mtime to detect translation file changes](https://www.drupal.org/node/3576427), a Drupal core change record by [alexpott](https://www.drupal.org/user/157725) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
