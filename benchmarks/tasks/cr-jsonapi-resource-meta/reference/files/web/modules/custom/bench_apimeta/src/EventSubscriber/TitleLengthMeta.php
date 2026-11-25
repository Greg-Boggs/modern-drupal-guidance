<?php

declare(strict_types=1);

namespace Drupal\bench_apimeta\EventSubscriber;

use Drupal\jsonapi\Events\CollectResourceObjectMetaEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

/**
 * Adds the title length of article nodes to JSON:API resource meta.
 */
final class TitleLengthMeta implements EventSubscriberInterface {

  public static function getSubscribedEvents(): array {
    return [CollectResourceObjectMetaEvent::class => 'addMeta'];
  }

  public function addMeta(CollectResourceObjectMetaEvent $event): void {
    $object = $event->getResourceObject();
    if ($object->getResourceType()->getTypeName() !== 'node--article') {
      return;
    }
    $title = (string) $object->getField('title')?->value;
    $event->setMetaValue('bench_title_length', mb_strlen($title));
    $event->addCacheableDependency($object);
  }

}
