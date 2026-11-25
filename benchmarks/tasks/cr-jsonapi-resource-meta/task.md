---
id: cr-jsonapi-resource-meta
title: Add a computed value to JSON:API resource metadata
kind: code
guides: [drupals-json-api-now-supports-adding-metadata]
---

Turn on core's JSON:API module. Create a module called `bench_apimeta` in `web/modules/custom` and turn it on. Every article returned by JSON:API (for example `GET /jsonapi/node/article/<uuid>`) should include `bench_title_length`, the number of characters in its title, in the resource's top-level `meta` section. Don't add a field to the content type. When a title changes, the API must report the new length right away, also from cached responses.
