<?php

declare(strict_types=1);

namespace Drupal\mdg_plugin_attributes;

/**
 * Interface for Greeter plugins.
 */
interface GreeterInterface {

  /**
   * Returns a greeting.
   */
  public function greet(string $name): string;

}
