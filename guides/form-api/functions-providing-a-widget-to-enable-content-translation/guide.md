---
name: functions-providing-a-widget-to-enable-content-translation
title: "Functions providing a widget to enable content translation on bundle form are moved to a service"
description: "Functions providing a widget to enable content translation on bundle form are moved to a service"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3566911
change-record-nid: 3566911
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3566890](https://www.drupal.org/node/3566890)

The following functions are used to create a widget which could be placed on the bundle entity forms to enable content translation for those bundles, in the situation in which a language_configuration form element is not used:

- `content_translation_enable_widget()`
- `content_translation_language_configuration_element_process()`
- `content_translation_language_configuration_element_validate()`
- `content_translation_language_configuration_element_submit()`

The functions are deprecated and the functionality is converted to a new service: `Drupal\content_translation\ContentTranslationEnableTranslationPerBundle`

### Before

```php
class FooHooks {

  #[Hook('form_field_config_edit_form_alter')]
  public function formFieldConfigEditFormAlter(array &$form, FormStateInterface $form_state) : void {
    $form['lang'] = content_translation_enable_widget();
  }

}
```

### After

```php
use Drupal\content_translation\ContentTranslationEnableTranslationPerBundle;
use Drupal\Core\Hook\Attribute\Hook;

class FooHooks {

  public function __construct(
    protected ContentTranslationEnableTranslationPerBundle $contentTranslationWidget
  ) {}

  #[Hook('form_field_config_edit_form_alter')]
  public function formFieldConfigEditFormAlter(array &$form, FormStateInterface $form_state) : void {
    $form['lang'] = $this->contentTranslationWidget->getWidget('user', 'user', $form, $form_state);
  }

}
```

*Source: [Functions providing a widget to enable content translation on bundle form are moved to a service](https://www.drupal.org/node/3566911), a Drupal core change record by [claudiu.cristea](https://www.drupal.org/user/56348) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
