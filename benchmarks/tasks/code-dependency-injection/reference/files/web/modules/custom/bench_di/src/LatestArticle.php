<?php

declare(strict_types=1);

namespace Drupal\bench_di;

use Drupal\Core\Entity\EntityTypeManagerInterface;

/**
 * Looks up the most recently created published article.
 */
final class LatestArticle {

  public function __construct(
    private readonly EntityTypeManagerInterface $entityTypeManager,
  ) {}

  /**
   * Returns the newest published article's title, or NULL.
   */
  public function title(): ?string {
    $storage = $this->entityTypeManager->getStorage('node');
    $ids = $storage->getQuery()
      ->accessCheck(TRUE)
      ->condition('type', 'article')
      ->condition('status', 1)
      ->sort('created', 'DESC')
      ->range(0, 1)
      ->execute();
    return $ids ? $storage->load(reset($ids))?->label() : NULL;
  }

}
