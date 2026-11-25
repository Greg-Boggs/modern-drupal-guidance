<?php

declare(strict_types=1);

namespace Drupal\mdg_dependency_injection\Plugin\Block;

use Drupal\Core\Block\Attribute\Block;
use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\Core\StringTranslation\TranslatableMarkup;
use Drupal\mdg_dependency_injection\GreetingBuilderInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Shows the greeting.
 */
#[Block(
  id: 'mdg_dependency_injection_greeting',
  admin_label: new TranslatableMarkup('Greeting'),
)]
class GreetingBlock extends BlockBase implements ContainerFactoryPluginInterface {

  public function __construct(
    array $configuration,
    $plugin_id,
    $plugin_definition,
    protected readonly GreetingBuilderInterface $greetingBuilder,
  ) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition): static {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->get(GreetingBuilderInterface::class),
    );
  }

  /**
   * {@inheritdoc}
   */
  public function build(): array {
    return [
      '#markup' => $this->greetingBuilder->build(),
      '#cache' => [
        'contexts' => ['user'],
        'tags' => ['config:system.site', 'config:mdg_dependency_injection.settings'],
      ],
    ];
  }

}
