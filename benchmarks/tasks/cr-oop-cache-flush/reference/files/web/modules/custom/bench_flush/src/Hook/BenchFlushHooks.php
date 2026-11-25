<?php

declare(strict_types=1);

namespace Drupal\bench_flush\Hook;

use Drupal\Core\Hook\Attribute\Hook;
use Drupal\Core\State\StateInterface;

/**
 * Hook implementations for bench_flush.
 */
final class BenchFlushHooks {

  public function __construct(private readonly StateInterface $state) {}

  #[Hook('cache_flush')]
  public function cacheFlush(): void {
    $this->state->set('bench_flush.count', (int) $this->state->get('bench_flush.count', 0) + 1);
  }

}
