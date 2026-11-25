<?php

namespace Drupal\legacy_example\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Greets the current user.
 *
 * @Block(
 *   id = "legacy_example_greeting",
 *   admin_label = @Translation("Greeting"),
 * )
 */
class GreetingBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    $account = \Drupal::currentUser();
    return [
      '#theme' => 'legacy_example_greeting',
      '#name' => $account->getDisplayName(),
      '#attached' => ['library' => ['legacy_example/greeting']],
    ];
  }

}
