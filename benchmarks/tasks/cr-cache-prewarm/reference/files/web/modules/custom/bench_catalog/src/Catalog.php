<?php

declare(strict_types=1);

namespace Drupal\bench_catalog;

use Drupal\Core\Cache\CacheBackendInterface;
use Drupal\Core\PreWarm\PreWarmableInterface;

/**
 * Provides the catalog items, cached in the default bin.
 */
final class Catalog implements PreWarmableInterface {

  public function __construct(private readonly CacheBackendInterface $cache) {}

  public function getItems(): array {
    if ($cached = $this->cache->get('bench_catalog:items')) {
      return $cached->data;
    }
    $items = ['alpha', 'beta', 'gamma'];
    $this->cache->set('bench_catalog:items', $items);
    return $items;
  }

  public function preWarm(): void {
    $this->getItems();
  }

}
