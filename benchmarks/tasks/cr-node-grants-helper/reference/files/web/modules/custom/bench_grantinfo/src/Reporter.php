<?php

declare(strict_types=1);

namespace Drupal\bench_grantinfo;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Session\AccountInterface;
use Drupal\node\NodeGrantsHelper;

/**
 * Reports node access grants for an account.
 */
final class Reporter {

  public function __construct(
    private readonly NodeGrantsHelper $grantsHelper,
    private readonly EntityTypeManagerInterface $entityTypeManager,
  ) {}

  public function grants(string $op, AccountInterface $account): array {
    return $this->grantsHelper->nodeAccessGrants($op, $account);
  }

  public function canViewAll(AccountInterface $account): bool {
    return (bool) $this->entityTypeManager->getAccessControlHandler('node')->checkAllGrants($account);
  }

}
