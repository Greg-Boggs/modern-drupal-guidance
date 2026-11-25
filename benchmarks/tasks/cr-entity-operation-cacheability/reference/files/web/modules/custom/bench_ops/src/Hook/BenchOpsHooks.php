<?php

declare(strict_types=1);

namespace Drupal\bench_ops\Hook;

use Drupal\Core\Access\AccessResult;
use Drupal\Core\Cache\CacheableMetadata;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Hook\Attribute\Hook;
use Drupal\Core\Session\AccountInterface;
use Drupal\Core\StringTranslation\StringTranslationTrait;

/**
 * Hook implementations for bench_ops.
 */
final class BenchOpsHooks {

  use StringTranslationTrait;

  public function __construct(private readonly AccountInterface $currentUser) {}

  #[Hook('entity_operation')]
  public function entityOperation(EntityInterface $entity, CacheableMetadata $cacheability): array {
    if ($entity->getEntityTypeId() !== 'node') {
      return [];
    }
    $access = AccessResult::allowedIfHasPermission($this->currentUser, 'view bench report');
    $cacheability->addCacheableDependency($access);
    if (!$access->isAllowed()) {
      return [];
    }
    return [
      'bench_report' => [
        'title' => $this->t('Report'),
        'weight' => 50,
        'url' => $entity->toUrl(),
      ],
    ];
  }

}
