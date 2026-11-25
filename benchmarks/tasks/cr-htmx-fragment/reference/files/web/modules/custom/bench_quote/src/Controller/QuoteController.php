<?php

declare(strict_types=1);

namespace Drupal\bench_quote\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Htmx\Htmx;
use Drupal\Core\Url;

/**
 * A page that swaps in a quote with HTMX.
 */
final class QuoteController extends ControllerBase {

  public function page(): array {
    $build['quote'] = [
      '#type' => 'html_tag',
      '#tag' => 'div',
      '#attributes' => ['id' => 'bench-quote'],
    ];
    $build['button'] = [
      '#type' => 'html_tag',
      '#tag' => 'button',
      '#value' => $this->t('Next quote'),
      '#attributes' => ['type' => 'button'],
    ];
    (new Htmx())
      ->get(Url::fromRoute('bench_quote.next'))
      ->target('#bench-quote')
      ->applyTo($build['button']);
    return $build;
  }

  public function next(): array {
    return ['#markup' => 'Quote: Simplicity is a prerequisite for reliability.'];
  }

}
