# Expectations

- The script defines a property on `Drupal.behaviors` with an `attach` method.
- Element lookups inside `attach` call `once()` with a string ID and pass `context` as the third argument.
- The script does not call `$.fn.once`, `jQuery.once` or `$(...).once()`.
- The script does not use `$(document).ready()`, `DOMContentLoaded` or `window.onload`.
- The library definition in `*.libraries.yml` lists `core/drupal` and `core/once` as dependencies.
- The library lists `core/drupalSettings` when the script reads `settings` or `drupalSettings`.
- The library is attached through `#attached` on the render array that outputs the markup.
- Each processed element carries a `data-once` attribute containing the once ID.
- Running `Drupal.attachBehaviors()` a second time on the same markup does not add a second event handler.
- When the behavior defines `detach`, it calls `once.remove()` with the same ID when `trigger` is `'unload'`.
