---
name: the-addcacheddiscovery-method-has-been-removed-from
title: "The addCachedDiscovery() method has been removed from CachedDiscoveryClearerInterface"
description: "The addCachedDiscovery() method has been removed from CachedDiscoveryClearerInterface"
drupal-core: ">=11.1"
source-url: https://www.drupal.org/node/3442229
change-record-nid: 3442229
introduced-in-version: "11.1.0"
introduced-in-branch: "11.1.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.1.x\
Introduced in version: 11.1.0\
Issue links: [#3432827](https://www.drupal.org/node/3432827)

The `addCachedDiscovery()` method was removed from the `CachedDiscoveryClearerInterface`. Drupal 11.1 stopped calling the `addCachedDiscovery()` method during construction of the `plugin.cache_clearer` service. Instead, a tagged iterator is injected into `CachedDiscoveryClearer` constructor.

Implementations of `CachedDiscoveryClearerInterface` should follow that example and remove their `addCachedDiscovery()` methods as well and use the `#[AutowireIterator(tag: 'plugin_manager_cache_clear')]` attribute in their constructor. Note, that this requires `autowire: true` on the service definition as well.

### Before

```php
class CachedDiscoveryClearer implements CachedDiscoveryClearerInterface {

  /**
   * The stored discoveries.
   *
   * @var \Drupal\Component\Plugin\Discovery\CachedDiscoveryInterface[]
   */
  protected $cachedDiscoveries = [];

  /**
   * {@inheritdoc}
   */
  public function addCachedDiscovery(CachedDiscoveryInterface $cached_discovery) {
    $this->cachedDiscoveries[] = $cached_discovery;
  }
```

### After

```php
class CachedDiscoveryClearer implements CachedDiscoveryClearerInterface {

  /**
   * Constructs the CachedDiscoveryClearer service.
   *
   * @param \Traversable $cachedDiscoveries
   *   The cached discoveries.
   */
  public function __construct(
    #[AutowireIterator(tag: 'plugin_manager_cache_clear')]
    protected \Traversable $cachedDiscoveries,
  ) {}
```

*Source: [The addCachedDiscovery() method has been removed from CachedDiscoveryClearerInterface](https://www.drupal.org/node/3442229), a Drupal core change record by [catch](https://www.drupal.org/user/35733) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
