<?php

declare(strict_types=1);

namespace Drupal\bench_button\Hook;

use Drupal\Core\Hook\Attribute\Hook;

/**
 * Hook implementations for bench_button.
 */
final class BenchButtonHooks {

  #[Hook('theme')]
  public function theme(): array {
    return [
      'bench_button' => [
        'variables' => ['label' => '', 'intent' => 'primary', 'size' => 'sm'],
      ],
    ];
  }

}
