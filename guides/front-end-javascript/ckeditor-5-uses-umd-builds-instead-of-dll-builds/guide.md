---
name: ckeditor-5-uses-umd-builds-instead-of-dll-builds
title: "CKEditor 5 uses UMD builds instead of DLL builds"
description: "CKEditor 5 uses UMD builds instead of DLL builds"
drupal-core: ">=12.0"
source-url: https://www.drupal.org/node/3581531
change-record-nid: 3581531
introduced-in-version: "12.0.0"
introduced-in-branch: "12.0.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 12.0.x\
Introduced in version: 12.0.0\
Issue links: [#3527914](https://www.drupal.org/node/3527914)

## Summary

CKEditor 5's JavaScript loading has been migrated from the deprecated DLL (Dynamic Link Library) build system to the consolidated UMD browser build. Modules that provide custom CKEditor 5 plugins with their own webpack builds need to update their webpack configuration and may need to update some import names.

## What changed

Drupal previously loaded CKEditor 5 as ~30 separate vendor JavaScript files plus a DLL shim. It now loads a single UMD bundle (`ckeditor5.umd.js`) that exposes all CKEditor 5 classes on `window.CKEDITOR`.

Custom Drupal CKEditor 5 plugins (built with webpack) previously used `webpack.DllReferencePlugin` to reference CKEditor 5 core code without bundling it. This has been replaced with a standard webpack `externals` configuration.

The `*.ckeditor5.yml` plugin definition format is unchanged. The `package.ClassName` naming convention (e.g. `essentials.Essentials`) continues to work.

### JavaScript globals

| Global | Before | After |
| --- | --- | --- |
| CKEditor 5 core | `window.CKEditor5.dll` + per-package globals like `CKEditor5.essentials` | `window.CKEDITOR` (flat namespace) |
| Custom plugins | `window.CKEditor5.myPlugin` | `window.CKEditor5.myPlugin` (unchanged) |

### Library definitions

The `core/ckeditor5` library now loads `ckeditor5.umd.js`. Individual package libraries such as `core/ckeditor5.image` still exist as deprecated stubs for backward compatibility. Modules that declare dependencies on these libraries should depend on `core/ckeditor5` only.

## How to update custom CKEditor 5 plugins

If your module provides a CKEditor 5 plugin with its own webpack build, you need to update your `webpack.config.js/.mjs`.

### Step 1: Update webpack config

Remove the `DllReferencePlugin` from `plugins` and add an `externals` configuration instead. The `externals` function tells webpack to resolve all CKEditor 5 imports from the `CKEDITOR` global (provided by the UMD bundle) rather than bundling them.

#### Before

```php
const webpack = require('webpack');
const manifest = require('./node_modules/ckeditor5/build/ckeditor5-dll.manifest.json');

module.exports = {
  // ...
  plugins: [
    new webpack.DllReferencePlugin({
      manifest: manifest,
      scope: 'ckeditor5/src',
      name: 'CKEditor5.dll',
    }),
  ],
};
```

#### After

```php
export default {
  // ...
  // Remove the DllReferencePlugin from plugins (or remove the plugins
  // array entirely if it only contained the DllReferencePlugin).
  plugins: [],
  externals: [
    function ({ request }, callback) {
      // Map all CKEditor 5 imports to the CKEDITOR UMD global.
      if (request === 'ckeditor5' || request.startsWith('ckeditor5/')) {
        return callback(null, 'CKEDITOR');
      }
      if (request.startsWith('@ckeditor/')) {
        return callback(null, 'CKEDITOR');
      }
      callback();
    },
  ],
};
```

Keep your output configuration unchanged — custom plugins should continue to use `library: ['CKEditor5', 'myPluginName']`.

### Step 2: Update renamed imports (if applicable)

Most imports work unchanged because the webpack `externals` maps the entire module to the `CKEDITOR` global, and named exports like `Plugin`, `Command`, `ButtonView`, etc. exist directly on `window.CKEDITOR`.

However, some `@ckeditor/*` imports have been renamed in the UMD build with an underscore prefix. See [https://ckeditor.com/docs/ckeditor5/latest/updating/nim-migration/migrat...](https://ckeditor.com/docs/ckeditor5/latest/updating/nim-migration/migrating-imports.html) for CKEditor's documentation on these changes.

*Source: [CKEditor 5 uses UMD builds instead of DLL builds](https://www.drupal.org/node/3581531), a Drupal core change record by [longwave](https://www.drupal.org/user/246492) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
