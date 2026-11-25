<?php

declare(strict_types=1);

namespace Drupal\bench_param\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\DependencyInjection\Attribute\Autowire;

/**
 * Shows the site path.
 */
final class SitePathController extends ControllerBase {

  public function __construct(
    #[Autowire(param: 'site.path')]
    private readonly string $sitePath,
  ) {}

  public function show(): array {
    return ['#markup' => $this->t('Site path: @p', ['@p' => $this->sitePath])];
  }

}
