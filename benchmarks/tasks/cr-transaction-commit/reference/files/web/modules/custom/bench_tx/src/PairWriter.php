<?php

declare(strict_types=1);

namespace Drupal\bench_tx;

use Drupal\Core\Database\Connection;

/**
 * Writes two key-value rows atomically.
 */
final class PairWriter {

  public function __construct(private readonly Connection $database) {}

  public function writePair(string $a, string $b): void {
    $transaction = $this->database->startTransaction();
    try {
      foreach (['a' => $a, 'b' => $b] as $name => $value) {
        $this->database->merge('key_value')
          ->keys(['collection' => 'bench_tx', 'name' => $name])
          ->fields(['value' => serialize($value)])
          ->execute();
      }
      $transaction->commitOrRelease();
    }
    catch (\Throwable $e) {
      $transaction->rollBack();
      throw $e;
    }
  }

}
