---
name: fiberresumetype-enum-introduced-to-allow-fiber-suspensions
title: "FiberResumeType enum introduced to allow fiber suspensions to indicate the intent"
description: "FiberResumeType enum introduced to allow fiber suspensions to indicate the intent"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3556785
change-record-nid: 3556785
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3550724](https://www.drupal.org/node/3550724)

Drupal core started using fibers not to asynchronously wait on external resources but attempt to group up expensive operations such as loading entities and and path alias lookups.

However, a large chunk of rendering for now still happens in a single, non-concurrent fiber. This fiber implementation in \Drupal\Core\Render\Renderer::executeInRenderContext() is there to ensure that the render context is fiber-safe. Until now, that fiber waited a short amount of time on suspend to avoid spin-locking.

Large pages that render and load dozens of entities result in an large amount of fiber suspensions, and those calls to usleep() add up and result in a considerably overhead.

The new enum allows suspensions that do not need to wait for an asynchronous event to indicate that a fiber may be resumed immediately if there is no other fiber that may be executed first instead. This needs to be done explicitly and supported both by code that suspends fiber and the code that manages the fiber.

### Indicate that an immediate resume is safe

```php
$fiber->suspend(FiberResumeType::Immediate);
```

### Check if a fiber is safe to resume immediately

```php
    $resume_type = NULL;
    $fiber = new \Fiber(static fn () => $callable());
    $fiber->start();
    $resume_type = NULL;
    while (!$fiber->isTerminated()) {
      if ($fiber->isSuspended()) {
        $resume_type = $fiber->resume();
      }
      // If the fiber has been suspended and has not signaled that it can be
      // immediately resumed, assume that the fiber is waiting on an async
      // operation and wait a bit.
      if (!$fiber->isTerminated() && $resume_type !== FiberResumeType::Immediate) {
        usleep(500);
      }
```

Fibers that wait for API requests, database queries and similar to not need to change, managing multiple fibers generally does not need to consider this and manual fiber management of a single fiber is very rare and generally not needed. Fiber management will likely be handed of to a revolt event loop in the future: [#3394423: Adopt the Revolt event loop for async task orchestration](https://www.drupal.org/project/drupal/issues/3394423)

*Source: [FiberResumeType enum introduced to allow fiber suspensions to indicate the intent](https://www.drupal.org/node/3556785), a Drupal core change record by [berdir](https://www.drupal.org/user/214652) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
