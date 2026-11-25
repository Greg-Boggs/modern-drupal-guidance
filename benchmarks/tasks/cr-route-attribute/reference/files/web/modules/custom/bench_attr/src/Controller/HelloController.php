<?php

declare(strict_types=1);

namespace Drupal\bench_attr\Controller;

use Drupal\Core\StringTranslation\TranslatableMarkup;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Says hello.
 */
final class HelloController {

  #[Route(
    path: '/bench-hello',
    name: 'bench_attr.hello',
    requirements: ['_access' => 'TRUE'],
    defaults: ['_title' => new TranslatableMarkup('Hello')],
  )]
  public function hello(): array {
    return ['#markup' => 'Hello from a controller.'];
  }

}
