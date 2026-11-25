<?php

declare(strict_types=1);

namespace Drupal\bench_login;

use Drupal\user\OneTimeAuthentication;
use Drupal\user\UserInterface;

/**
 * Builds one-time login links.
 */
final class LoginLinks {

  public function __construct(private readonly OneTimeAuthentication $oneTimeAuthentication) {}

  public function loginUrl(UserInterface $account): string {
    return $this->oneTimeAuthentication->generateOneTimeLoginUrl($account, ['absolute' => TRUE])->toString();
  }

}
