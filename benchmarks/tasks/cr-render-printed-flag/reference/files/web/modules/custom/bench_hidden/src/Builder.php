<?php

declare(strict_types=1);

namespace Drupal\bench_hidden;

/**
 * Builds a render array with an optionally skipped child.
 */
final class Builder {

  public function build(bool $showSecret): array {
    $build = [
      'intro' => ['#markup' => 'Welcome.'],
      'secret' => ['#markup' => 'Staff only.'],
      'outro' => ['#markup' => 'Goodbye.'],
    ];
    // Marking the element as printed makes the renderer skip it.
    $build['secret']['#printed'] = !$showSecret;
    return $build;
  }

}
