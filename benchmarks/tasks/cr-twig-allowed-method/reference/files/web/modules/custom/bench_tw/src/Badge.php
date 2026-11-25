<?php

declare(strict_types=1);

namespace Drupal\bench_tw;

use Drupal\Core\Template\Attribute\TwigAllowed;

/**
 * A badge whose shout() method templates may call.
 */
final class Badge {

  public function __construct(private readonly string $label) {}

  #[TwigAllowed]
  public function shout(): string {
    return mb_strtoupper($this->label) . '!';
  }

}
