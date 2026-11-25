<?php

declare(strict_types=1);

namespace Drupal\bench_bulk;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\node\NodeBulkUpdate;

/**
 * Unpublishes all nodes of a content type.
 */
final class Unpublisher {

  public function __construct(
    private readonly EntityTypeManagerInterface $entityTypeManager,
    private readonly NodeBulkUpdate $bulkUpdate,
  ) {}

  public function unpublishType(string $type): void {
    $ids = $this->entityTypeManager->getStorage('node')->getQuery()->accessCheck(FALSE)->condition('type', $type)->execute();
    if ($ids) {
      $this->bulkUpdate->process(array_values($ids), ['status' => 0], NULL, TRUE);
    }
  }

}
