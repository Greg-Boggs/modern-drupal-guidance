---
name: brotli-compression-support-added-for-css-and-javascript
title: "Brotli compression support added for CSS and JavaScript aggregates"
description: "Brotli compression support added for CSS and JavaScript aggregates"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3526344
change-record-nid: 3526344
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3184242](https://www.drupal.org/node/3184242)

Drupal now supports Brotli compression for aggregated CSS and JavaScript files in addition to the existing gzip compression. Brotli typically provides 15-25% better compression ratios than gzip, resulting in smaller file sizes and faster page loads for browsers that support it.

### What changed

\- The separate `system.performance.css.gzip` and `system.performance.js.gzip` settings have been replaced with unified `system.performance.css.compress` and `system.performance.js.compress` boolean settings.\
\- When compression is enabled, Drupal will automatically generate both `.gz` (gzip) and `.br` (Brotli) versions of aggregated CSS and JavaScript files if the server has the necessary PHP extensions installed.\
\- The `.htaccess` file has been updated to serve Brotli-compressed files when available, with gzip as a fallback.\
\- Brotli files are served with higher priority than gzip files for browsers that support both compression methods.

### Server requirements

To generate Brotli-compressed files, the server must have:\
\- The PHP Brotli extension installed (`ext-brotli`)\
\- For Apache: The `mod_brotli` module is not required as files are pre-compressed\
\- For Nginx: Manual configuration updates are required (see below)

## Impact

### Site administrators

\- Sites with gzip compression enabled will have compression enabled for both gzip and Brotli.\
\- No manual intervention is required for Apache-based sites.

### System administrators

\- **Apache users**: The updated `.htaccess` rules will handle Brotli files automatically.\
\- **Nginx users**: You need to update your Nginx configuration to serve Brotli files. Add the following to your server block:

nginx - see [documentation](https://docs.nginx.com/nginx/admin-guide/dynamic-modules/brotli/)

```php
location ~ ^/sites/.*/files/css/(.*)\.css$ {
    gzip_static on;
    brotli_static on;
    try_files $uri.br $uri.gz $uri =404;
}

location ~ ^/sites/.*/files/js/(.*)\.js$ {
    gzip_static on;
    brotli_static on;
    try_files $uri.br $uri.gz $uri =404;
}
```

Note: The `brotli_static` directive requires the `ngx_brotli` module to be installed.

### Module developers

\- If your module programmatically sets the compression configuration, update your code:

**Before:**

```php
$config->set('css.gzip', TRUE);
$config->set('js.gzip', TRUE);
```

**After:**

```php
$config->set('css.compress', TRUE);
$config->set('js.compress', TRUE);
```

\- The `AssetDumper` service now automatically creates both `.gz` and `.br` files when compression is enabled and the server supports it.

### API changes

\- **Deprecated**: `system.performance.css.gzip` and `system.performance.js.gzip` configuration settings\
\- **Added**: `system.performance.css.compress` and `system.performance.js.compress` configuration settings\
\- The `AssetDumper::dump()` method now generates multiple compressed versions based on available PHP extensions

### Upgrade path

An post-update hook (`system_post_update_migrate_compress_setting()`) automatically migrates existing gzip settings to the new compression settings. Sites with gzip enabled will have compression enabled; sites with gzip disabled will have compression disabled.

## Benefits

\- **Improved performance**: Brotli typically achieves 15-25% better compression than gzip\
\- **Backward compatibility**: Gzip files continue to be generated for older browsers\
\- **Automatic fallback**: Browsers that don't support Brotli will automatically receive gzip-compressed files\
\- **Future-proof**: The new architecture makes it easier to add support for additional compression algorithms in the future

*Source: [Brotli compression support added for CSS and JavaScript aggregates](https://www.drupal.org/node/3526344), a Drupal core change record by [andypost](https://www.drupal.org/user/118908) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
