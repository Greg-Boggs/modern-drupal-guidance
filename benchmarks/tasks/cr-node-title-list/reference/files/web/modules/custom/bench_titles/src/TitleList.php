<?php

declare(strict_types=1);

namespace Drupal\bench_titles;

use Drupal\Core\Cache\CacheableMetadata;
use Drupal\Core\Entity\EntityRepositoryInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;

/**
 * Builds linked node title lists.
 */
final class TitleList {

  public function __construct(
    private readonly EntityTypeManagerInterface $entityTypeManager,
    private readonly EntityRepositoryInterface $entityRepository,
  ) {}

  public function build(array $nids, string $title = ''): array {
    $nodes = $this->entityTypeManager->getStorage('node')->loadMultiple($nids);
    $items = [];
    $cache = new CacheableMetadata();
    foreach ($nids as $nid) {
      if (!isset($nodes[$nid])) {
        continue;
      }
      $node = $this->entityRepository->getTranslationFromContext($nodes[$nid]);
      $items[] = $node->toLink()->toRenderable();
      $cache->addCacheableDependency($node);
    }
    $build = ['#theme' => 'item_list__node', '#items' => $items, '#title' => $title];
    $cache->applyTo($build);
    return $build;
  }

}
