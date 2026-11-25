---
name: new-workspace-provider-system
title: "New Workspace Provider system"
description: "New Workspace Provider system"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3553089
change-record-nid: 3553089
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3095414](https://www.drupal.org/node/3095414)

## Overview

The workspace provider system introduces a plugin-like architecture based on tagged services that allows different implementations of workspace behavior. This enables modules to create custom workspace types with specialized behavior while keeping standard Drupal workspaces separate in the UI.

## Architecture

All workspace providers must implement `Drupal\workspaces\Provider\WorkspaceProviderInterface`, which defines a `getId()` method, custom access control via `checkAccess()`, and entity lifecycle hooks.

`Drupal\workspaces\Provider\WorkspaceProviderBase` provides the default workspace behavior. Custom providers should extend this class and override only the methods they need to customize.

`Drupal\workspaces\Provider\DefaultWorkspaceProvider` is the built-in provider used by standard Drupal workspaces.

## How It Works

### Entity Operations Delegation

All entity operations now delegate to the active workspace's provider. This means when content is edited in a workspace, the workspace's provider determines the behavior.

### UI Filtering

By default, only workspaces using the `default` provider are shown in:

- The workspaces listing page (`/admin/config/workflow/workspaces`)
- Entity reference fields (parent workspace selector)
- The workspace switcher form

## Creating a custom provider

### 1. Define Your Provider Class

```php
namespace Drupal\my_module\Provider;

use Drupal\workspaces\Provider\WorkspaceProviderBase;

class MyCustomProvider extends WorkspaceProviderBase {

  public static function getId(): string {
    return 'my_custom';
  }

  // Override only the methods you need to customize
  public function entityPresave(EntityInterface $entity): void {
    // Your custom workspace behavior
  }
}
```

### 2. Register Your Provider as a Service

`# my_module.services.yml services: Drupal\my_module\Provider\MyCustomProvider: autowire: true `

### 3. Create Workspaces with Your Provider

```php
use Drupal\workspaces\Entity\Workspace;

$workspace = Workspace::create([
  'id' => 'my_workspace',
  'label' => 'My Custom Workspace',
  'provider' => 'my_custom',  // Your provider ID
]);
$workspace->save();
```

*Source: [New Workspace Provider system](https://www.drupal.org/node/3553089), a Drupal core change record by [amateescu](https://www.drupal.org/user/729614) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
