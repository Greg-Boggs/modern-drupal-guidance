---
name: hooks-in-themes-can-now-be-oop
title: "Hooks in themes can now be OOP"
description: "Hooks in themes can now be OOP"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3551652
change-record-nid: 3551652
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3544715](https://www.drupal.org/node/3544715)

Themes now support OOP hooks.\
Theme namespaces are now registered in the container.\
ThemeInstaller now resets the container in install and uninstall.

Use the same `#[Hook()]` attribute in themes as modules.

Object oriented hooks in themes must be in the hook namespace, i.e. src/Hook/HookClass.php

The hook method must have a `#[Hook()]` attribute.

**Before in YOURTHEME.theme**

```php
/**
 * Implements hook_preprocess_HOOK().
 */
function YOURTHEME_preprocess_html(&$variables): void {
}
```

**After in YOURTHEME/src/Hook/YourThemePreprocessHooks.php**

```php
namespace Drupal\YOURTHEME\Hook;

use Drupal\Core\Hook\Attribute\Hook;

/**
 * Page preprocess hooks for olivero.
 */
class YourThemePreprocessHooks {

  /**
   * Implements hook_preprocess_HOOK().
   */
  #[Hook('preprocess_html')]
  public function preprocessHtml(array &$variables): void {
  }
}
```

Like modules, these hook classes support autowiring dependencies, see for example `\Drupal\olivero\Hook\OliveroPagePreprocessHooks`.

## Limitations / Differences to modules

There are some ***important*** differences between hooks in themes and hooks in modules.

The Hook attribute in themes does not support the order or module parameters.\
Themes do not support `ReorderHook`.\
Themes do not support `RemoveHook`.\
The order of hook implementations in themes cannot be modified. Base theme hooks run before the active theme. Hooks in non active themes do not execute.

Themes generally only support a subset of alters and a select few normal hooks.\
Supported alter hooks in core: (contrib can support others) check for themeManager->alter and themeManager->alterForTheme

- css_alter
- js_alter
- js_settings_alter
- library_info_alter
- form_alter
- form_BASE_FORM_ID_alter
- form_FORM_ID_alter
- element_info_alter
- page_attachments_alter
- theme_registry_alter
- hook_theme_suggestions_alter
- hook_theme_suggestions_HOOK_alter
- views_ui_display_tab_alter
- views_ui_display_top_alter
- plugin_filter_layout_alter
- plugin_filter_layout__layout_alter

- hook_views_pre_render
- hook_views_post_render
- hook_theme

- hook_preprocess
- hook_preprocess_HOOK

ThemeInstaller last parameter must be the Drupal kernel not the component plugin manager.

ThemeManager now requires keyvalue and cache bootstrap.

The DrupalKernel has deprecated the following methods:

- getModulesParameter
- getModuleFileNames
- getModuleNamespacesPsr4

Edge cases that are no longer supported:

- Themes cannot implement oop hooks on behalf of other themes.
- Modules cannot implement hooks on behalf of themes.

## Backwards compatibility

If you have a contrib or custom theme that needs to support Drupal &lt; 11.2\
When a hook has been converted add `#[LegacyHook]` to the procedural implementation.\
You **MUST** maintain the current procedural implementation for themes.\
Using Drupal::service('HookService') will not work since this feature also introduced adding the autowired services.

## Notes

**File extensions** - Breaking changes\
If you separate your hooks into separate files they must be in a .theme or .inc file extension to be collected.\
For example if your .theme file includes .php files like this:

```php
include 'theme-functions/preprocess-block.php';
include 'theme-functions/preprocess-html.php';
```

your hooks will not be collected.\
Change the extensions to .inc and they will work as expected.

**hook_theme**\
This does not affect module hooks in any way including preprocess and hook_theme.

*Source: [Hooks in themes can now be OOP](https://www.drupal.org/node/3551652), a Drupal core change record by [nicxvan](https://www.drupal.org/user/531480) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
