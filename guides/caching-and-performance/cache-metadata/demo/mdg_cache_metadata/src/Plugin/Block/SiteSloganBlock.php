<?php

declare(strict_types=1);

namespace Drupal\mdg_cache_metadata\Plugin\Block;

use Drupal\Core\Block\Attribute\Block;
use Drupal\Core\Block\BlockBase;
use Drupal\Core\Cache\Cache;
use Drupal\Core\StringTranslation\TranslatableMarkup;

/**
 * Shows a welcome message.
 */
#[Block(
  id: 'mdg_cache_metadata_site_slogan',
  admin_label: new TranslatableMarkup('Site slogan'),
)]
class SiteSloganBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build(): array {
    return ['#markup' => $this->t('Welcome')];
  }

  /**
   * {@inheritdoc}
   */
  public function getCacheTags(): array {
    return Cache::mergeTags(parent::getCacheTags(), ['config:system.site']);
  }

  /**
   * {@inheritdoc}
   */
  public function getCacheContexts(): array {
    return Cache::mergeContexts(parent::getCacheContexts(), ['user.roles:authenticated']);
  }

}
