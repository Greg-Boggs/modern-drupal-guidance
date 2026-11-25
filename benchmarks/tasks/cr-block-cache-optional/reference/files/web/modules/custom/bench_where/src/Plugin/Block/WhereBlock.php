<?php

declare(strict_types=1);

namespace Drupal\bench_where\Plugin\Block;

use Drupal\Core\Block\Attribute\Block;
use Drupal\Core\Block\BlockBase;
use Drupal\Core\Cache\CacheOptionalInterface;
use Drupal\Core\Path\CurrentPathStack;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\Core\StringTranslation\TranslatableMarkup;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Prints the current path. Too cheap to be worth its own render cache entry.
 */
#[Block(
  id: 'bench_where_path',
  admin_label: new TranslatableMarkup('You are here'),
)]
final class WhereBlock extends BlockBase implements ContainerFactoryPluginInterface, CacheOptionalInterface {

  public function __construct(array $configuration, $plugin_id, $plugin_definition, private readonly CurrentPathStack $currentPath) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
  }

  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition): static {
    return new static($configuration, $plugin_id, $plugin_definition, $container->get('path.current'));
  }

  public function build(): array {
    return [
      '#markup' => $this->t('You are at: @path', ['@path' => $this->currentPath->getPath()]),
      '#cache' => ['contexts' => ['url.path']],
    ];
  }

}
