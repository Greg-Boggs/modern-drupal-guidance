<?php

declare(strict_types=1);

namespace Drupal\mdg_single_directory_components\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Url;

/**
 * Renders the card component from PHP and from Twig.
 */
class CardController extends ControllerBase {

  /**
   * Builds the page.
   */
  public function page(): array {
    $build['render_element'] = [
      '#type' => 'component',
      '#component' => 'mdg_single_directory_components:card',
      '#props' => [
        'heading' => $this->t('Getting started'),
        'url' => Url::fromRoute('<front>')->toString(),
      ],
      '#slots' => [
        'body' => ['#markup' => $this->t('Read the guide.')],
      ],
    ];
    // The same component from Twig, with include and with embed.
    $build['twig'] = [
      '#type' => 'inline_template',
      '#template' => "{{ include('mdg_single_directory_components:card', { heading: heading }, with_context = false) }}
{% embed 'mdg_single_directory_components:card' with { heading: heading } only %}
  {% block body %}Embedded body{% endblock %}
{% endembed %}",
      '#context' => ['heading' => 'From Twig'],
    ];
    return $build;
  }

}
