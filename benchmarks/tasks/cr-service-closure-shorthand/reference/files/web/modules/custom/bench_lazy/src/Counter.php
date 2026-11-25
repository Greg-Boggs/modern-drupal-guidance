<?php

declare(strict_types=1);

namespace Drupal\bench_lazy;

/**
 * Counts nodes, fetching the entity type manager lazily.
 */
final class Counter {

  /**
   * @param \Closure $entityTypeManager
   *   Returns the entity type manager.
   */
  public function __construct(private readonly \Closure $entityTypeManager) {}

  public function nodeCount(): int {
    return (int) ($this->entityTypeManager)()->getStorage('node')->getQuery()->accessCheck(FALSE)->count()->execute();
  }

}
