---
name: directive-that-adds-support-for-webp-images-when-mime
title: "Directive that adds support for webp images when mime module is enabled added to htaccess"
description: "Directive that adds support for webp images when mime module is enabled added to htaccess"
drupal-core: ">=11.1"
source-url: https://www.drupal.org/node/3456338
change-record-nid: 3456338
introduced-in-version: "11.1.0"
introduced-in-branch: "11.1.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.1.x\
Introduced in version: 11.1.0\
Issue links: [#3310963](https://www.drupal.org/node/3310963)

A directive has been added to core's default .htaccess file that attaches the correct `image/webp` header for webp images when the MIME Apache module is enabled. This is needed for sites hosted on Apache web servers running on operating systems that do not support the webp image MIME type.

```php
--- a/.htaccess
+++ b/.htaccess
@@ -184,3 +184,7 @@ AddEncoding gzip svgz
   # Disable Proxy header, since it's an attack vector.
   RequestHeader unset Proxy
 </IfModule>
+
+<IfModule mod_mime.c>
+  AddType image/webp .webp
+</IfModule>
```

*Source: [Directive that adds support for webp images when mime module is enabled added to htaccess](https://www.drupal.org/node/3456338), a Drupal core change record by [joegraduate](https://www.drupal.org/user/789384) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
