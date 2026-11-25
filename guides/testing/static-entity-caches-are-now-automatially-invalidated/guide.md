---
name: static-entity-caches-are-now-automatially-invalidated
title: "Static entity caches are now automatially invalidated during POST web requests in tests"
description: "Static entity caches are now automatially invalidated during POST web requests in tests"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3491185
change-record-nid: 3491185
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3040878](https://www.drupal.org/node/3040878)

Similar to many other static caches, statically cached entities are now automatically cleared as part of the core/lib/Drupal/Core/Test/RefreshVariablesTrait.php::refreshVariables() method, which is typically called when submitting forms in web tests but can also be called explicitly.

This means that it is no longer required to explicitly clear static caches before reloading an entity in such tests:

Example from the core issue

```php
     $this->drupalGet('comment/' . $comment->id() . '/edit');
     $this->submitForm($user_edit, 'Save');
-    $comment_storage->resetCache([$comment->id()]);
     $comment_loaded = Comment::load($comment->id());
```

Existing tests that explicitly invalidate caches should continue to work and may be optimized to remove these calls once they require Drupal 11.2+.

This might cause failures in tests if those tests incorrectly relied on static cache masking a problem in the implementation or test code or if they explicitly assert the behavior of the static cache.

*Source: [Static entity caches are now automatially invalidated during POST web requests in tests](https://www.drupal.org/node/3491185), a Drupal core change record by [berdir](https://www.drupal.org/user/214652) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
