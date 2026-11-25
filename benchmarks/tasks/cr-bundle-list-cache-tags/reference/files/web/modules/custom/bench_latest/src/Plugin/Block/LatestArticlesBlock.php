<?php

declare(strict_types=1);

namespace Drupal\bench_latest\Plugin\Block;

use Drupal\Core\Block\Attribute\Block;
use Drupal\Core\Block\BlockBase;
use Drupal\Core\Cache\CacheableMetadata;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\Core\StringTranslation\TranslatableMarkup;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Lists the three newest published articles.
 */
#[Block(
  id: 'bench_latest_articles',
  admin_label: new TranslatableMarkup('Latest articles'),
)]
final class LatestArticlesBlock extends BlockBase implements ContainerFactoryPluginInterface {

  public function __construct(array $configuration, $plugin_id, $plugin_definition, private readonly EntityTypeManagerInterface $entityTypeManager) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
  }

  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition): static {
    return new static($configuration, $plugin_id, $plugin_definition, $container->get('entity_type.manager'));
  }

  public function build(): array {
    $storage = $this->entityTypeManager->getStorage('node');
    $ids = $storage->getQuery()
      ->accessCheck(TRUE)
      ->condition('type', 'article')
      ->condition('status', 1)
      ->sort('created', 'DESC')
      ->range(0, 3)
      ->execute();
    $items = [];
    $cache = new CacheableMetadata();
    $cache->addCacheTags($this->entityTypeManager->getDefinition('node')->getBundleListCacheTags('article'));
    foreach ($storage->loadMultiple($ids) as $node) {
      $items[] = $node->label();
      $cache->addCacheableDependency($node);
    }
    $build = ['#theme' => 'item_list', '#items' => $items];
    $cache->applyTo($build);
    return $build;
  }

}
