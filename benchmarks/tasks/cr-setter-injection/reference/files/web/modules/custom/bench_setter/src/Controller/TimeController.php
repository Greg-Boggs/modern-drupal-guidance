<?php

declare(strict_types=1);

namespace Drupal\bench_setter\Controller;

use Drupal\Component\Datetime\TimeInterface;
use Drupal\Core\Controller\ControllerBase;
use Symfony\Contracts\Service\Attribute\Required;

/**
 * Shows the request time.
 */
final class TimeController extends ControllerBase {

  private TimeInterface $time;

  #[Required]
  public function setTime(TimeInterface $time): void {
    $this->time = $time;
  }

  public function show(): array {
    return [
      '#markup' => $this->t('Request time: @t', ['@t' => $this->time->getRequestTime()]),
      '#cache' => ['max-age' => 0],
    ];
  }

}
