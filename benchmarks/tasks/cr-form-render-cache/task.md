---
id: cr-form-render-cache
title: Render-cacheable signup form
kind: code
guides: [forms-can-be-opted-in-to-render-caching]
---

Create a module called `bench_signup` in `web/modules/custom` and turn it on. Add a signup form at `/signup` (form ID `bench_signup_form`) with an `email` field labelled `Email` and a `Sign up` button; when submitted it shows the message `Thanks for signing up.` The form looks the same for every visitor, so we want Drupal to keep a cached copy of the form for up to one hour instead of building it every time. The rest of the page should keep caching the way it does now.
