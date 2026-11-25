<?php

declare(strict_types=1);

namespace Drupal\mdg_plugin_attributes\Plugin\Block;

use Drupal\Core\Block\Attribute\Block;
use Drupal\Core\Block\BlockBase;
use Drupal\Core\StringTranslation\TranslatableMarkup;

/**
 * Displays a greeting.
 */
#[Block(
  id: 'mdg_plugin_attributes_hello',
  admin_label: new TranslatableMarkup('Hello block'),
  category: new TranslatableMarkup('Custom'),
)]
class HelloBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build(): array {
    return ['#markup' => $this->t('Hello!')];
  }

}
