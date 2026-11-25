<?php

declare(strict_types=1);

namespace Drupal\bench_typedesc;

use Drupal\Core\Entity\EntityTypeManagerInterface;

/**
 * Returns content type descriptions.
 */
final class TypeDescription {

  public function __construct(private readonly EntityTypeManagerInterface $entityTypeManager) {}

  public function description(string $type): string {
    return (string) $this->entityTypeManager->getStorage('node_type')->load($type)?->getDescription();
  }

}
