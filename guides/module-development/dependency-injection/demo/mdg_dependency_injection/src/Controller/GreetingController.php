<?php

declare(strict_types=1);

namespace Drupal\mdg_dependency_injection\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\mdg_dependency_injection\GreetingBuilderInterface;

/**
 * Returns the greeting page.
 */
class GreetingController extends ControllerBase {

  public function __construct(
    protected readonly GreetingBuilderInterface $greetingBuilder,
  ) {}

  /**
   * Builds the page.
   */
  public function page(): array {
    return [
      '#markup' => $this->greetingBuilder->build(),
      '#cache' => [
        'contexts' => ['user'],
        'tags' => ['config:system.site', 'config:mdg_dependency_injection.settings'],
      ],
    ];
  }

}
