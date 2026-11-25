<?php

declare(strict_types=1);

namespace Drupal\bench_zip\Plugin\Validation\Constraint;

use Drupal\Core\StringTranslation\TranslatableMarkup;
use Drupal\Core\Validation\Attribute\Constraint;
use Symfony\Component\Validator\Constraint as SymfonyConstraint;

/**
 * Accepts five-digit postal codes only.
 */
#[Constraint(
  id: 'BenchZip',
  label: new TranslatableMarkup('Postal code', [], ['context' => 'Validation']),
)]
final class BenchZipConstraint extends SymfonyConstraint {

  public function __construct(
    public string $message = '%value is not a valid postal code.',
    ?array $groups = NULL,
    mixed $payload = NULL,
  ) {
    parent::__construct(NULL, $groups, $payload);
  }

}
