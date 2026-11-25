<?php

declare(strict_types=1);

namespace Drupal\bench_hooks\Hook;

use Drupal\Core\Hook\Attribute\Hook;
use Drupal\Core\Routing\RouteMatchInterface;
use Drupal\node\NodeInterface;

/**
 * Hook implementations for bench_hooks.
 */
final class BenchHooks {

  /**
   * Trims and title-cases article titles before they are saved.
   */
  #[Hook('node_presave')]
  public function nodePresave(NodeInterface $node): void {
    if ($node->bundle() !== 'article') {
      return;
    }
    $node->setTitle(mb_convert_case(trim($node->getTitle()), MB_CASE_TITLE));
  }

  /**
   * Implements hook_help().
   */
  #[Hook('help')]
  public function help(string $route_name, RouteMatchInterface $route_match): ?string {
    if ($route_name === 'help.page.bench_hooks') {
      return '<p>' . t('Bench hooks tidies article titles.') . '</p>';
    }
    return NULL;
  }

}
