<?php

declare(strict_types=1);

namespace Drupal\bench_stats\Plugin\Block;

use Drupal\Core\Block\Attribute\Block;
use Drupal\Core\Block\BlockBase;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\Core\StringTranslation\TranslatableMarkup;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Shows the number of published nodes, always in its own placeholder.
 */
#[Block(
  id: 'bench_stats_count',
  admin_label: new TranslatableMarkup('Content count'),
)]
final class ContentCountBlock extends BlockBase implements ContainerFactoryPluginInterface {

  public function __construct(array $configuration, $plugin_id, $plugin_definition, private readonly EntityTypeManagerInterface $entityTypeManager) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
  }

  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition): static {
    return new static($configuration, $plugin_id, $plugin_definition, $container->get('entity_type.manager'));
  }

  public function build(): array {
    $count = $this->entityTypeManager->getStorage('node')->getQuery()
      ->accessCheck(FALSE)
      ->condition('status', 1)
      ->count()
      ->execute();
    return [
      '#markup' => $this->t('Published content: @count', ['@count' => $count]),
      '#cache' => ['tags' => ['node_list']],
    ];
  }

  public function createPlaceholder(): bool {
    return TRUE;
  }

}
