(function ($, Drupal) {
  'use strict';

  Drupal.behaviors.legacyExample = {
    attach: function (context) {
      $('.legacy-example-greeting', context).once('legacy-example').each(function () {
        $(this).addClass('is-processed');
      });
    }
  };
})(jQuery, Drupal);
