<?php

declare(strict_types=1);

namespace Drupal\mdg_dependency_injection;

use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Session\AccountInterface;
use Drupal\Core\StringTranslation\StringTranslationTrait;
use Psr\Log\LoggerInterface;
use Symfony\Component\DependencyInjection\Attribute\Autowire;

/**
 * Builds greetings for the current user.
 */
class GreetingBuilder implements GreetingBuilderInterface {

  use StringTranslationTrait;

  public function __construct(
    protected readonly ConfigFactoryInterface $configFactory,
    protected readonly AccountInterface $currentUser,
    #[Autowire(service: 'logger.channel.mdg_dependency_injection')]
    protected readonly LoggerInterface $logger,
  ) {}

  /**
   * {@inheritdoc}
   */
  public function build(): string {
    $site = $this->configFactory->get('system.site')->get('name');
    $suffix = $this->configFactory->get('mdg_dependency_injection.settings')->get('suffix');
    $this->logger->debug('Greeting built.');
    return (string) $this->t('Hello @name, welcome to @site@suffix', [
      '@name' => $this->currentUser->getDisplayName(),
      '@site' => $site,
      '@suffix' => $suffix,
    ]);
  }

}
