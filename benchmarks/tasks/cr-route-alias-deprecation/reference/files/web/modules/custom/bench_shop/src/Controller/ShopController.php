<?php

declare(strict_types=1);

namespace Drupal\bench_shop\Controller;

/**
 * The shop page.
 */
final class ShopController {

  public function catalog(): array {
    return ['#markup' => 'Welcome to the shop.'];
  }

}
