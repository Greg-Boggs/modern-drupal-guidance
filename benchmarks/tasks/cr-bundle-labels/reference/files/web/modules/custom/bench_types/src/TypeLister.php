<?php

declare(strict_types=1);

namespace Drupal\bench_types;

use Drupal\Core\Entity\EntityTypeBundleInfoInterface;

/**
 * Lists content type labels.
 */
final class TypeLister {

  public function __construct(private readonly EntityTypeBundleInfoInterface $bundleInfo) {}

  public function nodeTypeNames(): array {
    return array_map('strval', $this->bundleInfo->getBundleLabels('node'));
  }

}
