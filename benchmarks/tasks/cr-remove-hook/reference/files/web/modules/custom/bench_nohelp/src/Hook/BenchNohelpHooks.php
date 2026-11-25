<?php

declare(strict_types=1);

namespace Drupal\bench_nohelp\Hook;

use Drupal\announcements_feed\Hook\AnnouncementsFeedHelpHooks;
use Drupal\Core\Hook\Attribute\RemoveHook;

/**
 * Hook implementations for bench_nohelp.
 */
#[RemoveHook('help', class: AnnouncementsFeedHelpHooks::class, method: 'help')]
final class BenchNohelpHooks {
}
