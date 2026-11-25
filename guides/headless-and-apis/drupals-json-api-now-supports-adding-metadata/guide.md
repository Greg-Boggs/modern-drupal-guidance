---
name: drupals-json-api-now-supports-adding-metadata
title: "Drupal's JSON:API now supports adding metadata programmatically"
description: "Drupal's JSON:API now supports adding metadata programmatically"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3280569
change-record-nid: 3280569
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3100732](https://www.drupal.org/node/3100732)

Some sites might want to add metadata to resources or their relations to convey implementation-specific information.

Before this release you could not adjust metadata without overriding internal classes. To allow developers to add metadata a new set of events has been introduced that are dispatched.

1. `CollectResourceObjectMetaEvent`
2. `CollectRelationshipMetaEvent`

Subscribers can use the following methods to adjust the metadata of the resource:

- `CollectResourceObjectMetaEvent::setMetaValue($property, $value)` to set the meta property of the resource.
- `CollectRelationshipMetaEvent::setMetaValue($property, $value)` to set the meta property of the relations of a resource.

These events have the related resource and context available in the event. See `\Drupal\jsonapi_test_meta_events\EventSubscriber\MetaEventSubscriber` for an example of how to add meta information to your resources.

## Example

Something you might want to do with this feature is add metadata about an external service to your JSON:API response. This would be data that is related to your resource, but it not part of the data model. For this example, we need to add some external payment information on the order for the client. This data is generated based on an external service.

```php
namespace Drupal\custom_payment\EventSubscriber;

use Drupal\jsonapi\Events\CollectResourceObjectMetaEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class PaymentMetaEventSubscriber implements EventSubscriberInterface {

  /**
    * {@inheritDoc}
    */ 
  public static function getSubscribedEvents() {
    return [
      CollectResourceObjectMetaEvent::class => 'addPaymentInfoToResourceObjectMeta'
    ];
  }

  /**
    * Custom method to addd payment info to the order object.
    *
    * @param \Drupal\jsonapi\Events\CollectResourceObjectMetaEvent $event
    *   The event to add meta resources for.
    *
    * @return void
    */ 
  public function addPaymentInfoToResourceObjectMeta(CollectResourceObjectMetaEvent $event) {
    if ($event->getResourceObject()->getTypeName() !== 'order--order') {
      return;
    }

    $event->setMetaValue('payment_iframe_url', \Drupal::service('custom_payment.payment_data')->getIframeUrl());
  }

}
```

*Source: [Drupal's JSON:API now supports adding metadata programmatically](https://www.drupal.org/node/3280569), a Drupal core change record by [bbrala](https://www.drupal.org/user/3366066) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
