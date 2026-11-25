<?php

declare(strict_types=1);

namespace Drupal\bench_retitle\Hook;

use Drupal\Core\Hook\Attribute\Hook;
use Drupal\Core\State\StateInterface;
use Drupal\node\NodeInterface;

/**
 * Hook implementations for bench_retitle.
 */
final class BenchRetitleHooks {

  public function __construct(private readonly StateInterface $state) {}

  #[Hook('node_presave')]
  public function nodePresave(NodeInterface $node): void {
    if ($node->isNew()) {
      return;
    }
    $original = $node->getOriginal();
    if ($original && $original->label() !== $node->label()) {
      $log = $this->state->get('bench_retitle.log', []);
      $log[] = $original->label() . ' -> ' . $node->label();
      $this->state->set('bench_retitle.log', $log);
    }
  }

}
