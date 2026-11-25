---
name: new-workspaceswitchevent-event-added
title: "New WorkspaceSwitchEvent event added"
description: "New WorkspaceSwitchEvent event added"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3553871
change-record-nid: 3553871
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3553581](https://www.drupal.org/node/3553581)

A new `WorkspaceSwitchEvent` event has been added, which provides the ability to react when the active workspaces changes, either on switching from Live to a workspace or the other way around.

## Code example

```php
class WorkspaceSwitchSubscriber implements EventSubscriberInterface {

  public function onWorkspaceSwitch(WorkspaceSwitchEvent $event): void {
    // Clear a custom static cache entry.
  }

  public static function getSubscribedEvents(): array {
    $events[WorkspaceSwitchEvent::class][] = 'onWorkspaceSwitch';

    return $events;
  }

}
```

*Source: [New WorkspaceSwitchEvent event added](https://www.drupal.org/node/3553871), a Drupal core change record by [amateescu](https://www.drupal.org/user/729614) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
