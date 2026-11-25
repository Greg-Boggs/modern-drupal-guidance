---
name: the-editor-image-upload-settings-form-is-deprecated
title: "The editor_image_upload_settings_form() is deprecated"
description: "The editor_image_upload_settings_form() is deprecated"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3570919
change-record-nid: 3570919
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3570917](https://www.drupal.org/node/3570917)

- The `editor_image_upload_settings_form()` is deprecated. Its logic is moved to a service: `\Drupal\editor\EditorImageUploadSettingsTrait::getForm()`
- The whole `core/modules/editor/editor.admin.inc` file is deprecated.

### Before

```php
class Image extends CKEditor5PluginDefault implements CKEditor5PluginConfigurableInterface {
  ...
  public function buildConfigurationForm(array $form, FormStateInterface $form_state) {
    $form_state->loadInclude('editor', 'admin.inc');
    return editor_image_upload_settings_form($form_state->get('editor'));
  }
  ...
}
```

### After

```php
class Image extends CKEditor5PluginDefault implements CKEditor5PluginConfigurableInterface {
  public function __constructor() {
    ...
    protected EditorImageUploadSettings $editorImageUploadSettings,
  }
  ...
  public function buildConfigurationForm(array $form, FormStateInterface $form_state) {
    return $this->editorImageUploadSettings->getForm($form_state->get('editor'));
  }
  ...
}
```

*Source: [The editor_image_upload_settings_form() is deprecated](https://www.drupal.org/node/3570919), a Drupal core change record by [claudiu.cristea](https://www.drupal.org/user/56348) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
