<?php

declare(strict_types=1);

namespace Drupal\bench_req\Hook;

use Drupal\Core\Extension\Requirement\RequirementSeverity;
use Drupal\Core\Hook\Attribute\Hook;
use Drupal\Core\State\StateInterface;
use Drupal\Core\StringTranslation\StringTranslationTrait;

/**
 * Hook implementations for bench_req.
 */
final class BenchReqHooks {

  use StringTranslationTrait;

  public function __construct(private readonly StateInterface $state) {}

  #[Hook('runtime_requirements')]
  public function runtimeRequirements(): array {
    $configured = (bool) $this->state->get('bench_req.api_key');
    $requirements['bench_req_api_key'] = [
      'title' => $this->t('Bench API key'),
      'value' => $configured ? $this->t('Configured') : $this->t('Not configured'),
      'severity' => $configured ? RequirementSeverity::OK : RequirementSeverity::Warning,
    ];
    if (!$configured) {
      $requirements['bench_req_api_key']['description'] = $this->t('Set the bench_req.api_key state value.');
    }
    return $requirements;
  }

}
