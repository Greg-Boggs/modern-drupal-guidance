<?php

declare(strict_types=1);

namespace Drupal\mdg_lazy_builders\Plugin\Block;

use Drupal\Core\Block\Attribute\Block;
use Drupal\Core\Block\BlockBase;
use Drupal\Core\StringTranslation\TranslatableMarkup;
use Drupal\mdg_lazy_builders\GreetingLazyBuilder;

/**
 * Greets the current user without making the page uncacheable.
 */
#[Block(
  id: 'mdg_lazy_builders_greeting',
  admin_label: new TranslatableMarkup('Greeting'),
)]
class GreetingBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build(): array {
    return [
      '#lazy_builder' => [GreetingLazyBuilder::class . ':build', ['greeting--compact']],
      '#create_placeholder' => TRUE,
      '#lazy_builder_preview' => ['#markup' => '&nbsp;'],
    ];
  }

}
