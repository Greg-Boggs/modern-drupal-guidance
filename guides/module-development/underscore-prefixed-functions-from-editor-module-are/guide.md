---
name: underscore-prefixed-functions-from-editor-module-are
title: "Underscore prefixed functions from editor.module are deprecated"
description: "Underscore prefixed functions from editor.module are deprecated"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3568136
change-record-nid: 3568136
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3568101](https://www.drupal.org/node/3568101)

The following functions from editor.module deprecated without a replacement and their functionality is moved, as protected methods, to `\Drupal\editor\Hook\EditorHooks`:

- `_editor_record_file_usage()` -> `EditorHooks::recordFileUsage()`
- `_editor_delete_file_usage()` -> `EditorHooks::deleteFileUsage()`
- `_editor_get_file_uuids_by_field()` -> `EditorHooks::getFileUuidsByField()`
- `_editor_get_formatted_text_fields()` -> `EditorHooks::getFormattedTextFields()`
- `_editor_parse_file_uuids()` -> `EditorHooks::parseFileUuids()`

These functions will be removed from 12.0.0

*Source: [Underscore prefixed functions from editor.module are deprecated](https://www.drupal.org/node/3568136), a Drupal core change record by [claudiu.cristea](https://www.drupal.org/user/56348) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
