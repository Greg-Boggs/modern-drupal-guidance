<?php

declare(strict_types=1);

namespace Drupal\bench_notice\Plugin\Block;

use Drupal\big_pipe\Render\Placeholder\BigPipeStrategy;
use Drupal\Core\Block\Attribute\Block;
use Drupal\Core\Block\BlockBase;
use Drupal\Core\Security\TrustedCallbackInterface;
use Drupal\Core\StringTranslation\TranslatableMarkup;

/**
 * A tiny lazily built notice that BigPipe must not stream.
 */
#[Block(
  id: 'bench_notice_banner',
  admin_label: new TranslatableMarkup('Maintenance notice'),
)]
final class NoticeBlock extends BlockBase implements TrustedCallbackInterface {

  public function build(): array {
    return [
      'notice' => [
        '#lazy_builder' => [static::class . '::renderNotice', []],
        '#create_placeholder' => TRUE,
        '#placeholder_strategy_denylist' => [
          BigPipeStrategy::class => TRUE,
        ],
      ],
    ];
  }

  public static function renderNotice(): array {
    return ['#markup' => 'Scheduled maintenance on Sunday.'];
  }

  public static function trustedCallbacks(): array {
    return ['renderNotice'];
  }

}
