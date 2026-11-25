<?php

declare(strict_types=1);

namespace Drupal\bench_typelabel;

use Drupal\node\NodeInterface;

/**
 * Returns a node's content type label.
 */
final class TypeLabel {

  public function label(NodeInterface $node): string {
    return (string) $node->getBundleEntity()->label();
  }

}
