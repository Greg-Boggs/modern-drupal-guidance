<?php

declare(strict_types=1);

namespace Drupal\bench_users\Plugin\Block;

use Drupal\Core\Block\Attribute\Block;
use Drupal\Core\Block\BlockBase;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\Core\StringTranslation\TranslatableMarkup;

/**
 * Shows the number of user accounts.
 */
#[Block(
  id: 'bench_users_count',
  admin_label: new TranslatableMarkup('User count'),
)]
final class UserCountBlock extends BlockBase implements ContainerFactoryPluginInterface {

  public function __construct(
    array $configuration,
    $plugin_id,
    $plugin_definition,
    private readonly EntityTypeManagerInterface $entityTypeManager,
  ) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
  }

  public function build(): array {
    $count = $this->entityTypeManager->getStorage('user')->getQuery()->accessCheck(FALSE)->condition('uid', 0, '>')->count()->execute();
    return ['#markup' => $this->t('Users: @count', ['@count' => $count])];
  }

}
