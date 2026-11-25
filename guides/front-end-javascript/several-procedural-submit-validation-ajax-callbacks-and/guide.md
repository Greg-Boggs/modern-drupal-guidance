---
name: several-procedural-submit-validation-ajax-callbacks-and
title: "Several procedural submit, validation, Ajax callbacks and other functions were converted to methods and deprecated"
description: "Several procedural submit, validation, Ajax callbacks and other functions were converted to methods and deprecated"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3566774
change-record-nid: 3566774
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3566768](https://www.drupal.org/node/3566768), [#3566792](https://www.drupal.org/node/3566792), [#3566888](https://www.drupal.org/node/3566888), [#3567163](https://www.drupal.org/node/3567163), [#3568092](https://www.drupal.org/node/3568092), [#3568124](https://www.drupal.org/node/3568124), [#3226806](https://www.drupal.org/node/3226806), [#3570235](https://www.drupal.org/node/3570235), [#3566536](https://www.drupal.org/node/3566536), [#3570238](https://www.drupal.org/node/3570238), [#3570863](https://www.drupal.org/node/3570863), [#3570839](https://www.drupal.org/node/3570839), [#3035340](https://www.drupal.org/node/3035340), [#3571400](https://www.drupal.org/node/3571400), [#3574727](https://www.drupal.org/node/3574727), [#3572173](https://www.drupal.org/node/3572173), [#3580662](https://www.drupal.org/node/3580662), [#941970](https://www.drupal.org/node/941970), [#3571172](https://www.drupal.org/node/3571172)

### Important note!

This CR is a living document, we have added the issues to the table so you can see if the issue is merged or not yet.

The following form submit, validation Ajax callbacks and functions were converted to methods and the procedural functions were deprecated:

| Deprecated procedural callback | Converted to... | Progress |
| --- | --- | --- |
| `automated_cron_settings_submit()` | `\Drupal\automated_cron\Hook\AutomatedCronHooks::automatedCronSettingsSubmit()` | [#3566768: Change \Drupal\system\Form\CronForm to use ConfigFormBase and use #config_target](https://www.drupal.org/project/drupal/issues/3566768) |
| `ckeditor5_filter_format_edit_form_submit()` | `\Drupal\ckeditor5\Hook\Ckeditor5Hooks::filterFormatEditFormSubmit()` | [#3566792: Deprecate remaining ckeditor5.module procedural code](https://www.drupal.org/project/drupal/issues/3566792) |
| `_update_ckeditor5_html_filter()` | `\Drupal\ckeditor5\Hook\Ckeditor5Hooks::updateCkeditor5HtmlFilter()` | [#3566792: Deprecate remaining ckeditor5.module procedural code](https://www.drupal.org/project/drupal/issues/3566792) |
| `contact_user_profile_form_submit()` | `\Drupal\contact\Hook\ContactFormHooks::profileFormSubmit()` | [#3566888: Move contact module form callbacks from procedural to hook class](https://www.drupal.org/project/drupal/issues/3566888) |
| `contact_form_user_admin_settings_submit()` | `\Drupal\contact\Hook\ContactFormHooks::userAdminSettingsSubmit()` | [#3566888: Move contact module form callbacks from procedural to hook class](https://www.drupal.org/project/drupal/issues/3566888) |
| `field_ui_form_manage_field_form_submit()` | `\Drupal\field_ui\Hook\FieldUiHooks::manageFieldFormSubmit()` | [#3567163: Move field_ui form callback to hook class](https://www.drupal.org/project/drupal/issues/3567163) |
| `editor_form_filter_admin_format_editor_configure()` | `\Drupal\editor\Hook\EditorHooks::editorFormFilterAdminFormatEditorConfigure()` | [#3568092: Convert editor.module procedural submit, validate and Ajax callbacks to methods](https://www.drupal.org/project/drupal/issues/3568092) |
| `editor_form_filter_admin_format_editor_configure()` | `\Drupal\editor\Hook\EditorHooks::editorFormFilterAdminFormatEditorConfigure()` | [#3568092: Convert editor.module procedural submit, validate and Ajax callbacks to methods](https://www.drupal.org/project/drupal/issues/3568092) |
| `editor_form_filter_admin_format_validate()` | `\Drupal\editor\Hook\EditorHooks::editorFormFilterAdminFormatValidate()` | [#3568092: Convert editor.module procedural submit, validate and Ajax callbacks to methods](https://www.drupal.org/project/drupal/issues/3568092) |
| `editor_form_filter_admin_format_submit()` | `\Drupal\editor\Hook\EditorHooks::editorFormFilterAdminFormatSubmit()` | [#3568092: Convert editor.module procedural submit, validate and Ajax callbacks to methods](https://www.drupal.org/project/drupal/issues/3568092) |
| `language_process_language_select()` | `\Drupal\language\Hook\LanguageHooks::processLanguageSelect()` | [#3574727: Deprecate remaining language.module code](https://www.drupal.org/project/drupal/issues/3574727) |
| `language_configuration_element_submit()` | `\Drupal\language\Element\LanguageConfiguration::submit()` | [#3574727: Deprecate remaining language.module code](https://www.drupal.org/project/drupal/issues/3574727) |
| `media_filter_format_edit_form_validate()` | `\Drupal\media\Hook\MediaHooks::formatEditFormValidate()` | [#3568124: Deprecate remaining functions in media.module](https://www.drupal.org/project/drupal/issues/3568124) |
| `_menu_ui_node_save()` | `\Drupal\menu_ui\Hook\MenuUiHooks:: menuUiNodeSave()` | [#3571400: Deprecate functions in menu_ui.module and move to hooks or helper class](https://www.drupal.org/project/drupal/issues/3571400) |
| `menu_ui_get_menu_link_defaults()` | `\Drupal\menu_ui\Hook\MenuUiHooks:: getMenuLinkDefaults()` | [#3571400: Deprecate functions in menu_ui.module and move to hooks or helper class](https://www.drupal.org/project/drupal/issues/3571400) |
| `menu_ui_node_builder()` | `\Drupal\menu_ui\Hook\MenuUiHooks:: nodeBuilder()` | [#3571400: Deprecate functions in menu_ui.module and move to hooks or helper class](https://www.drupal.org/project/drupal/issues/3571400) |
| `menu_ui_form_node_form_submit()` | `\Drupal\menu_ui\Hook\MenuUiHooks:: formNodeFormSubmit()` | [#3571400: Deprecate functions in menu_ui.module and move to hooks or helper class](https://www.drupal.org/project/drupal/issues/3571400) |
| `menu_ui_form_node_type_form_validate()` | `\Drupal\menu_ui\Hook\MenuUiHooks:: formNodeTypeFormValidate()` | [#3571400: Deprecate functions in menu_ui.module and move to hooks or helper class](https://www.drupal.org/project/drupal/issues/3571400) |
| `menu_ui_form_node_type_form_builder()` | `\Drupal\menu_ui\Hook\MenuUiHooks:: formNodeTypeFormBuilder()` | [#3571400: Deprecate functions in menu_ui.module and move to hooks or helper class](https://www.drupal.org/project/drupal/issues/3571400) |
| views_view_is_enabled views_view_is_disabled views_enable_view views_disable_view | `\Drupal\views\ViewStatusTrait` ->isViewEnabled ->isViewDisabled ->enableView ->disableView | [#3572243: Deprecate several views functions](https://www.drupal.org/project/drupal/issues/3572243) |
| `views_invalidate_cache` | \Drupal\views\Views invalidateCache routeRebuildNeeded | [#941970: Rebuild router only when something related to routing changes](https://www.drupal.org/project/drupal/issues/941970) |
| `views_ui_add_limited_validation()` | `\Drupal\views\ViewsFormAjaxHelperTrait::addLimitedValidation()` | [#3035340: Deprecate core/modules/views_ui/admin.inc](https://www.drupal.org/project/drupal/issues/3035340) |
| `views_ui_add_ajax_wrapper()` | `\Drupal\views\ ViewsFormAjaxHelperTrait::addAjaxWrapper()` | [#3035340: Deprecate core/modules/views_ui/admin.inc](https://www.drupal.org/project/drupal/issues/3035340) |
| `views_ui_ajax_update_form()` | `\Drupal\views\ ViewsFormAjaxHelperTrait::ajaxUpdateForm()` | [#3035340: Deprecate core/modules/views_ui/admin.inc](https://www.drupal.org/project/drupal/issues/3035340) |
| `views_ui_nojs_submit()` | `\Drupal\views\ ViewsFormAjaxHelperTrait::noJsSubmit()` | [#3035340: Deprecate core/modules/views_ui/admin.inc](https://www.drupal.org/project/drupal/issues/3035340) |
| `views_ui_form_button_was_clicked()` | `\Drupal\views\ViewsFormHelperTrait::formButtonWasClicked()` | [#3035340: Deprecate core/modules/views_ui/admin.inc](https://www.drupal.org/project/drupal/issues/3035340) |

### The following functions have been removed or deprecated without replacement

| Deprecated procedural callback | Progress |
| --- | --- |
| \_ckeditor5_theme_css | [#3566792: Deprecate remaining ckeditor5.module procedural code](https://www.drupal.org/project/drupal/issues/3566792) |
| \_field_create_entity_from_ids field_form_field_config_edit_form_entity_builder | [#3572173: Deprecate field.module remaining functions](https://www.drupal.org/project/drupal/issues/3572173) |
| \_filter_tips | [#3580662: Deprecate \_filter_tips()](https://www.drupal.org/project/drupal/issues/3580662) |
| \_filter_url \_filter_url_parse_full_links \_filter_url_parse_email_links \_filter_url_parse_partial_links \_filter_url_escape_comments \_filter_url_trim \_filter_autop \_filter_html_escape \_filter_html_image_secure_process | [#3226806: Move filter implementations from filter.module to plugin classes](https://www.drupal.org/project/drupal/issues/3226806) |
| language_get_default_langcode language_negotiation_url_prefixes_update language_get_browser_drupal_langcode_mappings | [#3574727: Deprecate remaining language.module code](https://www.drupal.org/project/drupal/issues/3574727) |
| \_media_get_add_url | [#3568124: Deprecate remaining functions in media.module](https://www.drupal.org/project/drupal/issues/3568124) |
| \_media_library_views_form_media_library_after_build \_media_library_media_type_form_submit \_media_library_configure_form_display \_media_library_configure_view_display | [#3570839: Deprecate remaining underscore functions in media_library.module](https://www.drupal.org/project/drupal/issues/3570839) |
| \_menu_link_content_update_path_alias | [#3570863: Deprecate \_menu_link_content_update_path_alias](https://www.drupal.org/project/drupal/issues/3570863) |
| syslog_logging_settings_submit syslog_facility_list | [#3570235: Deprecate functions in syslog.module](https://www.drupal.org/project/drupal/issues/3570235) |
| system_sort_themes system_check_directory | [#3571172: Deprecate system_sort_themes() and system_check_directory() in system module](https://www.drupal.org/project/drupal/issues/3571172) |
| taxonomy_build_node_index taxonomy_delete_node_index | [#3570238: Deprecate remaining functions in taxonomy](https://www.drupal.org/project/drupal/issues/3570238) |
| views_ui_add_ajax_trigger views_ui_standard_display_dropdown views_ui_build_form_url | [#3035340: Deprecate core/modules/views_ui/admin.inc](https://www.drupal.org/project/drupal/issues/3035340) |

*Source: [Several procedural submit, validation, Ajax callbacks and other functions were converted to methods and deprecated](https://www.drupal.org/node/3566774), a Drupal core change record by [claudiu.cristea](https://www.drupal.org/user/56348) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
