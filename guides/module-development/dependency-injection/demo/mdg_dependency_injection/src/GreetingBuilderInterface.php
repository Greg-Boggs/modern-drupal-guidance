<?php

declare(strict_types=1);

namespace Drupal\mdg_dependency_injection;

/**
 * Builds greetings.
 */
interface GreetingBuilderInterface {

  /**
   * Returns a greeting for the current user.
   */
  public function build(): string;

}
