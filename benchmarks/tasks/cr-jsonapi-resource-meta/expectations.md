# Expectations: Add a computed value to JSON:API resource metadata

Checks create article nodes through Drush and fetch their JSON:API resources over HTTP as an anonymous visitor.

Source: the change record [node/3280569](https://www.drupal.org/node/3280569), imported as the guide `drupals-json-api-now-supports-adding-metadata`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `module-enabled` | MUST | Outcome | Module bench_apimeta exists in web/modules/custom/bench_apimeta and is enabled. |
| `jsonapi-enabled` | MUST | Outcome | The jsonapi module is enabled. |
| `meta` | MUST | Outcome | GET /jsonapi/node/article/<uuid> for an article titled "Hello JSON" has data.meta.bench_title_length = 10. |
| `meta-updates` | MUST | Outcome | After the title changes to "Hi" the cached response reports 2. |
| `no-override` | MUST NOT | Practice | The module does not decorate or replace JSON:API normalizers or serializer services. |
| `no-deprecated-api` | MUST NOT | Practice | The module uses no core API that data/drupal/deprecations.json lists as deprecated or removed. |
