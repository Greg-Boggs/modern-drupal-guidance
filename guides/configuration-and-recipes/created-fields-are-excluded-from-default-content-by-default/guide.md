---
name: created-fields-are-excluded-from-default-content-by-default
title: "\"Created\" fields are excluded from default content by default"
description: "\"Created\" fields are excluded from default content by default"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3557689
change-record-nid: 3557689
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3557465](https://www.drupal.org/node/3557465)

Default content is now exported without the `created` field by default. The reasoning is that it's confusing, upon import, to see content that was created at an arbitrary time, rather than the time of import (which, as far as Drupal is concerned, is *the* time the content was created).

If you want to include created times in default content, you can do this with an event subscriber that marks the fields as included:

```php
use Drupal\Core\DefaultContent\PreExportEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

/**
 * Subscribes to default content-related events.
 *
 * @internal
 *   Event subscribers are internal.
 */
class DefaultContentSubscriber implements EventSubscriberInterface {

  /**
   * {@inheritdoc}
   */
  public static function getSubscribedEvents(): array {
    return [PreExportEvent::class => 'preExport'];
  }

  /**
   * Reacts before an entity is exported.
   *
   * @param \Drupal\Core\DefaultContent\PreExportEvent $event
   *   The event object.
   */
  public function preExport(PreExportEvent $event): void {
    // To automatically export all `created` fields:
    foreach ($event->entity->getFieldDefinitions() as $field_definition) {
      if ($field_definition->getType() === 'created') {
        $event->setExportable($field_definition->getName());
      }
    }

    // To only export a specific one:
    if ($event->entity->getEntityTypeId() === 'node') {
      $event->setExportable('created');
    }
  }

}
```

*Source: ["Created" fields are excluded from default content by default](https://www.drupal.org/node/3557689), a Drupal core change record by [phenaproxima](https://www.drupal.org/user/205645) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
