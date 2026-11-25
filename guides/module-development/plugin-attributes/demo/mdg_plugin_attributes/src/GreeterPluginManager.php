<?php

declare(strict_types=1);

namespace Drupal\mdg_plugin_attributes;

use Drupal\Core\Cache\CacheBackendInterface;
use Drupal\Core\Extension\ModuleHandlerInterface;
use Drupal\Core\Plugin\DefaultPluginManager;
use Drupal\mdg_plugin_attributes\Attribute\Greeter;

/**
 * Manages Greeter plugins.
 */
class GreeterPluginManager extends DefaultPluginManager {

  public function __construct(\Traversable $namespaces, CacheBackendInterface $cache_backend, ModuleHandlerInterface $module_handler) {
    parent::__construct('Plugin/Greeter', $namespaces, $module_handler, GreeterInterface::class, Greeter::class);
    $this->alterInfo('mdg_plugin_attributes_greeter_info');
    $this->setCacheBackend($cache_backend, 'mdg_plugin_attributes_greeter_plugins');
  }

}
