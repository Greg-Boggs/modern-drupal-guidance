<?php

declare(strict_types=1);

namespace Drupal\bench_grants;

use Drupal\node\NodeAccessRebuild;

/**
 * Flags and runs node access rebuilds.
 */
final class Maintenance {

  public function __construct(private readonly NodeAccessRebuild $nodeAccessRebuild) {}

  public function flag(): void {
    $this->nodeAccessRebuild->setNeedsRebuild();
  }

  public function isFlagged(): bool {
    return $this->nodeAccessRebuild->needsRebuild();
  }

  public function rebuildNow(): void {
    $this->nodeAccessRebuild->rebuild();
  }

}
