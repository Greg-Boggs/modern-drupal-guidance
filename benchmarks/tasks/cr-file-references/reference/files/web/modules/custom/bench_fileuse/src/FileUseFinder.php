<?php

declare(strict_types=1);

namespace Drupal\bench_fileuse;

use Drupal\file\FileInterface;
use Drupal\file\FileReferenceResolver;

/**
 * Finds nodes that reference a file.
 */
final class FileUseFinder {

  public function __construct(private readonly FileReferenceResolver $resolver) {}

  public function nodeIds(FileInterface $file): array {
    $ids = [];
    foreach ($this->resolver->getReferences($file) as $usage) {
      $entity = $this->resolver->loadEntityFromUsage($usage);
      if ($entity && $entity->getEntityTypeId() === 'node') {
        $ids[] = (int) $entity->id();
      }
    }
    $ids = array_values(array_unique($ids));
    sort($ids);
    return $ids;
  }

}
