---
name: sessionmanager-delete-is-deprecated
title: "SessionManager::delete() is deprecated"
description: "SessionManager::delete() is deprecated"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3570851
change-record-nid: 3570851
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3570849](https://www.drupal.org/node/3570849)

`SessionManager::delete()` is deprecated in Drupal 11.4.0 and is removed from Drupal 13.0.0. Use `Drupal\Core\Session\UserSessionRepository::deleteAll()` instead.

**Before:**

```php
  public function postSave(EntityStorageInterface $storage, $update = TRUE) {
    parent::postSave($storage, $update);

    if ($update) {
      $session_manager = \Drupal::service('session_manager');
      // If the password has been changed, delete all open sessions for the
      // user and recreate the current one.
      if ($this->pass->value != $this->getOriginal()->pass->value) {
        $session_manager->delete($this->id());
        // [...]
}
```

**After:**

```php
  public function postSave(EntityStorageInterface $storage, $update = TRUE) {
    parent::postSave($storage, $update);

    if ($update) {
      $session_repository = \Drupal::service(UserSessionRepositoryInterface::class);
      // If the password has been changed, delete all open sessions for the
      // user and recreate the current one.
      if ($this->pass->value != $this->getOriginal()->pass->value) {
        $session_repository->deleteAll($this->id());
        // [...]
}
```

*Source: [SessionManager::delete() is deprecated](https://www.drupal.org/node/3570851), a Drupal core change record by [znerol](https://www.drupal.org/user/63999) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
