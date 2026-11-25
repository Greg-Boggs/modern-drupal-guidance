---
name: installer-specific-extension-list-implementations-are
title: "Installer-specific extension list implementations are deprecated"
description: "Installer-specific extension list implementations are deprecated"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3577846
change-record-nid: 3577846
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#2934063](https://www.drupal.org/node/2934063), [#2719315](https://www.drupal.org/node/2719315)

Drupal previously used installer-specific extension list implementations to preserve pathnames added with `setPathname() ` during installer container rebuilds.

That is no longer necessary. The base extension list behavior now preserves added pathnames across `reset(),` so the installer-specific trait and classes no\
longer provide any unique behavior. Core also no longer replaces the `extension.list.module` and `extension.list.theme `services with installer-specific classes\
during installation.

### What changed

The following installer-specific APIs are deprecated in Drupal 11.5.0 and will be removed in Drupal 13.0.0:

\- `Drupal\Core\Installer\ExtensionListTrait`\
\- `Drupal\Core\Installer\InstallerModuleExtensionList`\
\- `Drupal\Core\Installer\InstallerThemeEngineExtensionList`\
\- `Drupal\Core\Installer\InstallerThemeExtensionList`

Use these instead:

\- `Drupal\Core\Extension\ModuleExtensionList`\
\- `Drupal\Core\Extension\ThemeExtensionList`

There is no replacement for `Drupal\Core\Installer\ExtensionListTrait`. The base extension list behavior now provides the same functionality.

**Before**

```php
  use Drupal\Core\Installer\ExtensionListTrait;
  use Drupal\Core\Installer\InstallerModuleExtensionList;
  use Drupal\Core\Installer\InstallerThemeExtensionList;

  class MyInstallerModuleExtensionList extends InstallerModuleExtensionList {
  }

  class MyInstallerThemeExtensionList extends InstallerThemeExtensionList {
  }

  class MyCustomExtensionList extends ModuleExtensionList {
    use ExtensionListTrait;
  }
```

**After**

```php
  use Drupal\Core\Extension\ModuleExtensionList;
  use Drupal\Core\Extension\ThemeExtensionList;

  class MyModuleExtensionList extends ModuleExtensionList {
  }

  class MyThemeExtensionList extends ThemeExtensionList {
  }

  class MyCustomExtensionList extends ModuleExtensionList {
  }
```

How to update your code

\- If your code typehints `InstallerModuleExtensionList`, change it to `ModuleExtensionList`.\
\- If your code typehints `InstallerThemeExtensionList`, change it to `ThemeExtensionList`.\
\- If your custom extension list class uses `ExtensionListTrait`, remove the trait. The inherited behavior from the base extension list class is sufficient.

Notes

The deprecated installer classes remain as backward-compatibility wrappers for now, but core no longer uses them during installation.

*Source: [Installer-specific extension list implementations are deprecated](https://www.drupal.org/node/3577846), a Drupal core change record by [andypost](https://www.drupal.org/user/118908) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
