<?php

declare(strict_types=1);

namespace Drupal\bench_memo;

use Drupal\Core\Cache\CacheBackendInterface;

/**
 * Squares numbers, memoized in the request's memory cache bin.
 */
final class Squares {

  public function __construct(private readonly CacheBackendInterface $memoryCache) {}

  public function square(int $n): int {
    $cid = 'bench_memo:square:' . $n;
    if ($cached = $this->memoryCache->get($cid)) {
      return $cached->data;
    }
    $result = $n * $n;
    $this->memoryCache->set($cid, $result, CacheBackendInterface::CACHE_PERMANENT, ['bench_memo']);
    return $result;
  }

}
