<?php

declare(strict_types=1);

namespace Drupal\bench_errhint\Plugin\Block;

use Drupal\Core\Block\Attribute\Block;
use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\Core\StringTranslation\TranslatableMarkup;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;

/**
 * Shows a hint on 403 and 404 pages.
 */
#[Block(
  id: 'bench_errhint',
  admin_label: new TranslatableMarkup('Error hint'),
)]
final class ErrorHintBlock extends BlockBase implements ContainerFactoryPluginInterface {

  public function __construct(array $configuration, $plugin_id, $plugin_definition, private readonly RequestStack $requestStack) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
  }

  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition): static {
    return new static($configuration, $plugin_id, $plugin_definition, $container->get('request_stack'));
  }

  public function build(): array {
    $build = ['#cache' => ['contexts' => ['exception_status_code']]];
    $exception = $this->requestStack->getCurrentRequest()?->attributes->get('exception');
    if ($exception instanceof HttpExceptionInterface && in_array($exception->getStatusCode(), [403, 404], TRUE)) {
      $build['#markup'] = $this->t('Try the search page.');
    }
    return $build;
  }

  public function getCacheContexts(): array {
    return ['exception_status_code'];
  }

}
