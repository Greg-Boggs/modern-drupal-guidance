<?php

declare(strict_types=1);

namespace Drupal\bench_members;

use Drupal\Core\Access\AccessResult;
use Drupal\Core\Access\AccessResultInterface;
use Drupal\Core\Session\AccountInterface;

/**
 * Decides access to member content.
 */
final class MemberAccess {

  public function check(AccountInterface $account): AccessResultInterface {
    $is_member = in_array('member', $account->getRoles(), TRUE);
    if (!$is_member && $account->isAuthenticated() && $account->isBlocked()) {
      return AccessResult::forbiddenIf(TRUE, 'Blocked accounts cannot see member content.')->cachePerUser();
    }
    return AccessResult::allowedIf($is_member, 'Only members can see this content.')->addCacheContexts(['user.roles']);
  }

}
