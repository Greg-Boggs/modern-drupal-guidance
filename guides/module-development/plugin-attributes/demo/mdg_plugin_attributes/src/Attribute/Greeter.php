<?php

declare(strict_types=1);

namespace Drupal\mdg_plugin_attributes\Attribute;

use Drupal\Component\Plugin\Attribute\Plugin;
use Drupal\Core\StringTranslation\TranslatableMarkup;

/**
 * Defines a Greeter plugin attribute.
 *
 * Plugin namespace: Plugin\Greeter.
 */
#[\Attribute(\Attribute::TARGET_CLASS)]
class Greeter extends Plugin {

  /**
   * Constructs a Greeter attribute.
   *
   * @param string $id
   *   The plugin ID.
   * @param \Drupal\Core\StringTranslation\TranslatableMarkup $label
   *   The human-readable name.
   * @param class-string|null $deriver
   *   (optional) The deriver class.
   */
  public function __construct(
    public readonly string $id,
    public readonly TranslatableMarkup $label,
    public readonly ?string $deriver = NULL,
  ) {}

}
