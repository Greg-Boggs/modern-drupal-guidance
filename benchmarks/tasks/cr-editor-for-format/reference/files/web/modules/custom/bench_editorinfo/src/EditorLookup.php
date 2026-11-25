<?php

declare(strict_types=1);

namespace Drupal\bench_editorinfo;

use Drupal\Core\Entity\EntityTypeManagerInterface;

/**
 * Looks up text editors.
 */
final class EditorLookup {

  public function __construct(private readonly EntityTypeManagerInterface $entityTypeManager) {}

  public function editorFor(string $format_id): ?string {
    $editor = $this->entityTypeManager->getStorage('editor')->load($format_id);
    return $editor?->getEditor();
  }

}
