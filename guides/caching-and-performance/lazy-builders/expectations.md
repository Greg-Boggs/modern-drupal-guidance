# Expectations

- The personalized or uncacheable part of the output is a render element with a `#lazy_builder` property whose value is a two-item array: a callback and an array of arguments.
- Every lazy builder argument is a scalar or `NULL`.
- The element with `#lazy_builder` has no child elements and no properties other than `#lazy_builder`, `#cache`, `#create_placeholder`, `#lazy_builder_preview`, `#preview`, `#placeholder_strategy_denylist` and `#weight`.
- The element with `#lazy_builder` sets `#create_placeholder` to `TRUE`.
- The lazy builder callback is trusted: the method carries `#[TrustedCallback]`, or its class implements `TrustedCallbackInterface` and lists the method in `trustedCallbacks()`, or its class implements `RenderCallbackInterface`.
- The callback is a service method referenced as `'<service_id>:<method>'`, or a class method referenced as `'<class>::<method>'`.
- Services the callback uses are injected into its class, not fetched with `\Drupal::service()` inside the callback.
- The array the callback returns carries the cache metadata of what the callback reads (for example the `user` context for per-user output).
- The block or element that contains the personalized output does not set `max-age` to `0` and does not add the `user` cache context outside the lazy builder.
- Rendering the element produces the personalized output for the current user.
- For an authenticated user, a second request for a page containing the element returns `X-Drupal-Dynamic-Cache: HIT`.
- For an authenticated user, with cacheability headers enabled, the page's `X-Drupal-Cache-Contexts` header does not include `user`.
- Rendering the page triggers no assertion or exception about lazy builder properties or untrusted callbacks.
