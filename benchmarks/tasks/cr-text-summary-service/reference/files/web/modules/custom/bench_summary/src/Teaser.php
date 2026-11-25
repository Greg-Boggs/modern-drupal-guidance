<?php

declare(strict_types=1);

namespace Drupal\bench_summary;

use Drupal\text\TextSummary;

/**
 * Generates text summaries.
 */
final class Teaser {

  public function __construct(private readonly TextSummary $textSummary) {}

  public function summarize(string $html, int $size): string {
    return (string) $this->textSummary->generate($html, NULL, $size);
  }

}
