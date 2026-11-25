---
name: module-and-theme-stream-wrappers-added-to-core-only-json
title: "module:// and theme:// stream wrappers added to core (only .json files)"
description: "module:// and theme:// stream wrappers added to core (only .json files)"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/2352923
change-record-nid: 2352923
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#1308152](https://www.drupal.org/node/1308152)

`module://` and `theme://` stream wrappers have been added to Drupal core to make it easier to reference certain files in modules or themes.

**Important!** When the PHP code needs to **refer, include or parse** files **inside the module or theme directory space**, will simply use `_DIR_` instead of these new stream wrappers as this is sufficient, intuitive and more performant.

## New stream wrappers

Introduce extension stream wrappers:

| Scheme | Description |
| --- | --- |
| `module://{name}` | Points to files in the module `{name}` directory. **Only enabled modules** can be referred. |
| `theme://{name}` | Points to files in the theme `{name}` directory. **Only installed themes** can be referred. |

## Examples

Assuming the `node` module is enabled but `color` module is not:

- Referring to a file:

  - Drupal &lt; 11.3: `\Drupal::service('extension.path.resolver')->getPath('module', 'node') . '/test.json'`
  - Drupal >= 11.3: `module://node/test.json`

- Referring a resource in a uninstalled or inexistent module:

  - Drupal &lt; 11.3:`\Drupal::service('extension.path.resolver')->getPath('module', 'color') . '/test.json'` will return `'/test.json'` and issue a PHP warning - `The following module is missing from the file system: color`
  - Drupal >= 11.3: `module://color/test.json` throws an exception

This works identically for themes, except those use the `theme://` scheme instead of `module://`.

For the purposes of security hardening, these stream wrappers can only access files with certain extensions. By default, that list is limited to `.json` files. The list of allowed file extensions is controlled by the `stream_wrapper.allowed_file_extensions` container parameter and cannot be configured or overridden in the UI.

*Source: [module:// and theme:// stream wrappers added to core (only .json files)](https://www.drupal.org/node/2352923), a Drupal core change record by [almaudoh](https://www.drupal.org/user/488082) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
