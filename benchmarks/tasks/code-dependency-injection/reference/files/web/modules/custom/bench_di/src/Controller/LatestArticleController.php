<?php

declare(strict_types=1);

namespace Drupal\bench_di\Controller;

use Drupal\bench_di\LatestArticle;
use Drupal\Core\Controller\ControllerBase;

/**
 * Responds with the latest article title.
 */
final class LatestArticleController extends ControllerBase {

  public function __construct(
    private readonly LatestArticle $latestArticle,
  ) {}

  public function __invoke(): array {
    $title = $this->latestArticle->title();
    return [
      '#markup' => $title === NULL ? $this->t('No articles yet') : $this->t('Latest article: @title', ['@title' => $title]),
      '#cache' => ['tags' => ['node_list:article']],
    ];
  }

}
