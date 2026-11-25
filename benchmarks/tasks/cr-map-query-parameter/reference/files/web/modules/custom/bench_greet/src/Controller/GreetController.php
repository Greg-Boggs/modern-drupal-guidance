<?php

declare(strict_types=1);

namespace Drupal\bench_greet\Controller;

use Symfony\Component\HttpKernel\Attribute\MapQueryParameter;

/**
 * Greets the visitor named in the query string.
 */
final class GreetController {

  public function greet(#[MapQueryParameter] string $name = 'guest'): array {
    return [
      '#markup' => 'Hello, ' . htmlspecialchars($name) . '!',
      '#cache' => ['contexts' => ['url.query_args:name']],
    ];
  }

}
