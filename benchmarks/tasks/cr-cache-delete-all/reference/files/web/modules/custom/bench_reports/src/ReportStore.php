<?php

declare(strict_types=1);

namespace Drupal\bench_reports;

use Drupal\Core\Cache\CacheBackendInterface;

/**
 * Stores report data in its own cache bin.
 */
final class ReportStore {

  public function __construct(private readonly CacheBackendInterface $cache) {}

  public function save(string $cid, array $data): void {
    $this->cache->set($cid, $data);
  }

  public function reset(): void {
    $this->cache->deleteAll();
  }

}
