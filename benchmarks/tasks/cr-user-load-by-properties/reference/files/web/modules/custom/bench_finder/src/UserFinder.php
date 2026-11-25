<?php

declare(strict_types=1);

namespace Drupal\bench_finder;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\user\UserInterface;

/**
 * Finds user accounts.
 */
final class UserFinder {

  public function __construct(private readonly EntityTypeManagerInterface $entityTypeManager) {}

  public function byMail(string $mail): ?UserInterface {
    $users = $this->entityTypeManager->getStorage('user')->loadByProperties(['mail' => $mail]);
    return $users ? reset($users) : NULL;
  }

  public function byName(string $name): ?UserInterface {
    $users = $this->entityTypeManager->getStorage('user')->loadByProperties(['name' => $name]);
    return $users ? reset($users) : NULL;
  }

}
