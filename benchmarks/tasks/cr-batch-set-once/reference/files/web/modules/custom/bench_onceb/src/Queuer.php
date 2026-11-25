<?php

declare(strict_types=1);

namespace Drupal\bench_onceb;

use Drupal\Core\Batch\BatchBuilder;

/**
 * Queues the rebuild batch set at most once per request.
 */
final class Queuer {

  public function queue(): void {
    if (BatchBuilder::isSetIdRegistered('bench_onceb_rebuild')) {
      return;
    }
    $builder = (new BatchBuilder())
      ->registerSetId('bench_onceb_rebuild')
      ->setTitle('Rebuild index')
      ->addOperation([self::class, 'rebuild'], []);
    batch_set($builder->toArray());
  }

  public static function rebuild(array &$context): void {
    $context['finished'] = 1;
  }

}
