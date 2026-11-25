<?php

declare(strict_types=1);

namespace Drupal\bench_apifilter\Hook;

use Drupal\Core\Access\AccessResult;
use Drupal\Core\Entity\EntityTypeInterface;
use Drupal\Core\Hook\Attribute\Hook;
use Drupal\Core\Session\AccountInterface;
use Drupal\jsonapi\JsonApiFilter;

/**
 * Hook implementations for bench_apifilter.
 */
final class BenchApifilterHooks {

  #[Hook('jsonapi_user_filter_access')]
  public function userFilterAccess(EntityTypeInterface $entity_type, AccountInterface $account): array {
    return [
      JsonApiFilter::AMONG_ENABLED => AccessResult::allowedIfHasPermission($account, 'access user profiles'),
    ];
  }

}
