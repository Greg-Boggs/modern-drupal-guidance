<?php

declare(strict_types=1);

namespace Drupal\bench_dup\Hook;

use Drupal\Core\Hook\Attribute\Hook;
use Drupal\node\NodeInterface;

/**
 * Hook implementations for bench_dup.
 */
final class BenchDupHooks {

  #[Hook('node_duplicate')]
  public function nodeDuplicate(NodeInterface $duplicate, NodeInterface $entity): void {
    $duplicate->setTitle($duplicate->label() . ' (copy)');
    $duplicate->setUnpublished();
  }

}
