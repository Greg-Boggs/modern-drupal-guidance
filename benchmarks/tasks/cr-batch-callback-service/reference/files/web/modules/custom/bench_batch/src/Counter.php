<?php

declare(strict_types=1);

namespace Drupal\bench_batch;

use Drupal\Core\Batch\BatchBuilder;
use Drupal\Core\State\StateInterface;

/**
 * Builds and runs a counting batch.
 */
final class Counter {

  public function __construct(private readonly StateInterface $state) {}

  public function buildBatch(): array {
    $builder = (new BatchBuilder())
      ->setTitle('Counting')
      ->setFinishCallback('bench_batch.counter:finished');
    for ($i = 0; $i < 3; $i++) {
      $builder->addOperation('bench_batch.counter:increment', []);
    }
    return $builder->toArray();
  }

  public function increment(array &$context): void {
    $this->state->set('bench_batch.count', (int) $this->state->get('bench_batch.count', 0) + 1);
  }

  public function finished(bool $success, array $results, array $operations): void {
    $this->state->set('bench_batch.done', TRUE);
  }

}
