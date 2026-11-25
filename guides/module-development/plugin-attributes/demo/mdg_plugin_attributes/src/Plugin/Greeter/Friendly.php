<?php

declare(strict_types=1);

namespace Drupal\mdg_plugin_attributes\Plugin\Greeter;

use Drupal\Core\Plugin\PluginBase;
use Drupal\Core\StringTranslation\TranslatableMarkup;
use Drupal\mdg_plugin_attributes\Attribute\Greeter;
use Drupal\mdg_plugin_attributes\GreeterInterface;

/**
 * A friendly greeter.
 */
#[Greeter(
  id: 'friendly',
  label: new TranslatableMarkup('Friendly'),
)]
class Friendly extends PluginBase implements GreeterInterface {

  /**
   * {@inheritdoc}
   */
  public function greet(string $name): string {
    return "Hello, $name!";
  }

}
