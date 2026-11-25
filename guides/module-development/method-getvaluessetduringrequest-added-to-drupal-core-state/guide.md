---
name: method-getvaluessetduringrequest-added-to-drupal-core-state
title: "Method getValuesSetDuringRequest() added to Drupal\\Core\\State\\StateInterface"
description: "Method getValuesSetDuringRequest() added to Drupal\\Core\\State\\StateInterface"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3519307
change-record-nid: 3519307
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#229778](https://www.drupal.org/node/229778)

To provide a way to track state value changes within a request, the `getValuesSetDuringRequest()` method has been added to `Drupal\Core\State\StateInterface`. All classes that implement `StateInterface` but do not extend `Drupal\Core\State\State` will need to implement this new method.

Method signature:

```php
/**
   * Returns the values if a key has been modified during the request.
   *
   * @param string $key
   *   The key to get the values for.
   *
   * @return array{value: mixed, original: mixed}|null
   *   An array containing:
   *     - value: The last value set during the request.
   *     - original: The initial value at the start of the request.
   *   If the key was not set, NULL is returned.
   */
  public function getValuesSetDuringRequest(string $key): ?array;
```

An example of how this method is used is in `Drupal\Core\EventSubscriber\MaintenanceModeSubscriber`, which now can log when maintenance mode has been enabled or disabled.

```php
/**
   * Logs changes to maintenance mode.
   *
   * @param \Symfony\Component\HttpKernel\Event\TerminateEvent $event
   *   The event object.
   */
  public function onTerminate(TerminateEvent $event): void {
    $values = $this->state->getValuesSetDuringRequest('system.maintenance_mode');
    if ($values && $values['original'] !== $values['value']) {
      if ($values['value']) {
        $this->logger->info('Maintenance mode enabled.');
      }
      else {
        $this->logger->info('Maintenance mode disabled.');
      }
    }
  }
```

*Source: [Method getValuesSetDuringRequest() added to Drupal\Core\State\StateInterface](https://www.drupal.org/node/3519307), a Drupal core change record by [godotislate](https://www.drupal.org/user/3483619) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
