---
id: cr-image-style-options
title: List image styles for a select element
kind: code
guides: [image-path-flush-image-style-options-and-image-derivative]
---

Create a module called `bench_styles` in `web/modules/custom` and turn it on. Our forms need an image style dropdown. Provide `bench_styles.options`, whose `options($includeEmpty = TRUE)` returns the image styles as dropdown options (machine name => label), with Drupal's usual empty option first when `$includeEmpty` is TRUE: exactly the list Drupal's image module shows in its own forms.
