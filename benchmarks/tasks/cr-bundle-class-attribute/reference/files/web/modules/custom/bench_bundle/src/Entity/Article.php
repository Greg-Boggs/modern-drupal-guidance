<?php

declare(strict_types=1);

namespace Drupal\bench_bundle\Entity;

use Drupal\Core\Entity\Attribute\Bundle;
use Drupal\node\Entity\Node;

/**
 * Bundle class for article nodes.
 */
#[Bundle(entityType: 'node', bundle: 'article')]
class Article extends Node {

  public function shout(): string {
    return mb_strtoupper((string) $this->label());
  }

}
