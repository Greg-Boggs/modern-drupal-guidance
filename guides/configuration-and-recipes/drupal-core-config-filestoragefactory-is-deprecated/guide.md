---
name: drupal-core-config-filestoragefactory-is-deprecated
title: "\\Drupal\\Core\\Config\\FileStorageFactory is deprecated"
description: "\\Drupal\\Core\\Config\\FileStorageFactory is deprecated"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3586484
change-record-nid: 3586484
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#2951046](https://www.drupal.org/node/2951046)

The class `\Drupal\Core\Config\FileStorageFactory `is deprectated. The only method on the class `getSync()` is replaced by the `config.storage.sync` service.

To work with the configuration sync directory use the `config.storage.sync` service. This service is not new and sites can begin using it before updating to 11.5.0.

Using the sync storage service ensures any configuration for modules or themes that are not installed will be able to use constants and enums from these modules. Read the companion change record to learn [how to write constants and Enums in a yaml file](https://www.drupal.org/node/3403883)

As part of this change, if the `config.storage.sync` service is altered to or decorated by another class and reads config data from YAML sources other than the configuration sync directory, the `FileStorage` object reading the config data should be wrapped in a `Drupal\Core\Config\AutoloadingStorage` object. `AutoloadingStorage` should also wrap any `FileStorage` objects doing similar things in code handling the `ConfigEvents::STORAGE_TRANSFORM_IMPORT` event.

### Example

#### Before

```php
use Drupal\Core\Config\FileStorage;

// ...

  public function foo(): void {
    $storage = new FileStorage('path/to/additional/yaml_directory');
    $data = $storage->read('my.config.name');
  }

// ...
```

#### After

```php
use Drupal\Core\Config\FileStorage;
use Drupal\Core\Config\SyncFactory;

// ...

  // Note the 'Drupal\Core\Config\SyncFactory' service must be injected because it is private.
  public function __construct(
    protected readonly SyncFactory $syncFactory,
  ) {}

// ...

  public function foo(): void {
    $storage = new FileStorage('path/to/additional/yaml_directory');
    $wrappedStorage = $this->syncFactory->wrapStorageWithAutoloadingStorage($storage);
    $data = $wrappedStorage->read('my.config.name');
  }

// ...
```

*Source: [\Drupal\Core\Config\FileStorageFactory is deprecated](https://www.drupal.org/node/3586484), a Drupal core change record by [alexpott](https://www.drupal.org/user/157725) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
