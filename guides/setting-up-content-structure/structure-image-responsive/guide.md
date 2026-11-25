---
name: structure-image-responsive
title: "Concept: Responsive Image Styles"
description: "Overview of responsive image styles, which allow you to provide different images for different screen sizes."
drupal-core: "^11"
source-url: https://www.drupal.org/docs/user_guide/en/structure-image-responsive.html
source-commit: 464d40566f4e802dca66d4b1bbe59c51fed39e8e
license: CC-BY-SA-2.0
---

## Prerequisite knowledge

* {{ GUIDE_REF("understanding-themes") }}
* {{ GUIDE_REF("structure-content-display") }}
* {{ GUIDE_REF("structure-image-styles") }}
## What are responsive image styles?

The core Responsive Image module provides responsive image styles. This allows
you to have images in your website that are specifically sized for different
screen sizes. This is useful, for example, to make your site load faster on
mobile devices because image sizes are optimized for smaller screens.

A responsive image style is a mapping between image styles and breakpoints.
Breakpoints are the points where a responsive design needs to change in order
to respond to different screen sizes. Responsive image styles can either work
with breakpoints defined in your theme or with breakpoints defined in the
responsive image style settings.

When a responsive image style is defined, it can be used in the display settings
for Image fields. This allows the site to display responsive images using the
HTML5 _picture_ tag, or using the _srcset_ and _sizes_ attributes in an _img_
tag, depending on how the responsive image style is set up.
## Related topics

{{ GUIDE_REF("structure-fields") }}
## Additional resources

* [_Drupal.org_ community documentation page "Responsive web design"](https://www.drupal.org/docs/mobile-guide/responsive-web-design)
* [_Drupal.org_ community documentation page "Responsive Images"](https://www.drupal.org/docs/mobile-guide/responsive-images)
* [_Drupal.org_ community documentation page "Working with breakpoints in Drupal"](https://www.drupal.org/docs/theming-drupal/working-with-breakpoints-in-drupal)
* [Blog post "Responsive Images in Drupal 8 using 'srcset'"](https://chromatichq.com/blog/responsive-images-drupal-8-using-srcset)

*Attributions*

Adapted by [Boris Doesborg](https://www.drupal.org/u/batigolix) from
[Responsive images](https://www.drupal.org/docs/mobile-guide/responsive-images),
copyright 2000-2026 by the individual contributors to the
[Drupal Community Documentation](https://www.drupal.org/documentation).

*Source: [Concept: Responsive Image Styles](https://www.drupal.org/docs/user_guide/en/structure-image-responsive.html), Drupal User Guide, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
