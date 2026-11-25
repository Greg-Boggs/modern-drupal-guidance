<?php

declare(strict_types=1);

namespace Drupal\mdg_lazy_builders;

use Drupal\Core\Security\Attribute\TrustedCallback;
use Drupal\Core\Session\AccountInterface;
use Drupal\Core\StringTranslation\StringTranslationTrait;

/**
 * Builds per-user greetings for placeholders.
 */
class GreetingLazyBuilder {

  use StringTranslationTrait;

  public function __construct(
    protected readonly AccountInterface $currentUser,
  ) {}

  /**
   * Builds the greeting for the current user.
   */
  #[TrustedCallback]
  public function build(string $style): array {
    return [
      '#type' => 'html_tag',
      '#tag' => 'span',
      '#value' => $this->t('Hello, @name', ['@name' => $this->currentUser->getDisplayName()]),
      '#attributes' => ['class' => [$style]],
      '#cache' => ['contexts' => ['user']],
    ];
  }

}
