<?php

declare(strict_types=1);

namespace Drupal\bench_themeset;

use Drupal\Core\Extension\ThemeSettingsProvider;

/**
 * Reads theme settings.
 */
final class ThemeSettingsReader {

  public function __construct(private readonly ThemeSettingsProvider $provider) {}

  public function setting(string $name, ?string $theme = NULL): mixed {
    return $this->provider->getSetting($name, $theme);
  }

}
