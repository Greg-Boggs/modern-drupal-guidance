<?php

declare(strict_types=1);

namespace Drupal\bench_badge\Hook;

use Drupal\Core\Hook\Attribute\Hook;

/**
 * Hook implementations for bench_badge.
 */
final class BenchBadgeHooks {

  #[Hook('theme')]
  public function theme(): array {
    return [
      'bench_badge' => [
        'variables' => ['label' => '', 'color' => 'grey'],
        'initial preprocess' => static::class . ':preprocessBadge',
      ],
    ];
  }

  public function preprocessBadge(array &$variables): void {
    $variables['classes'] = 'badge badge--' . $variables['color'];
  }

}
