<?php

declare(strict_types=1);

namespace Drupal\bench_zip\Plugin\Validation\Constraint;

use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

/**
 * Validates the BenchZip constraint.
 */
final class BenchZipConstraintValidator extends ConstraintValidator {

  public function validate(mixed $value, Constraint $constraint): void {
    if ($value === NULL || $value === '') {
      return;
    }
    if (!preg_match('/^\d{5}$/', (string) $value)) {
      $this->context->addViolation($constraint->message, ['%value' => $value]);
    }
  }

}
