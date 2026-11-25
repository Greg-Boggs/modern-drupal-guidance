# Expectations: Preload a web font through a library

Checks read the library definition through Drush and fetch a page over HTTP.

Source: the change record [node/3585574](https://www.drupal.org/node/3585574), imported as the guide `library-definitions-now-support-a-fonts-key-for-preloading`. The prompt describes what the site owner wants and names no API, hook or pattern.

Outcome checks test what the prompt asks for and accept any working solution. Practice checks test the approach the guides teach, which the prompt does not ask for: they are what guidance should change.

| Id | Kind | Measures | Check |
|---|---|---|---|
| `module-enabled` | MUST | Outcome | Module bench_fonts exists in web/modules/custom/bench_fonts and is enabled. |
| `library` | MUST | Practice | The library bench_fonts/typography declares fonts/inter.woff2 with preload enabled. |
| `preload-link` | MUST | Outcome | The front page head has <link rel="preload" ... as="font"> for inter.woff2. |
| `no-manual-head` | MUST NOT | Practice | The module does not add the preload link by hand (html_head attachments or a rel="preload" string in code or templates). |
| `no-legacy-pattern` | MUST NOT | Practice | No procedural hook implementations (legacy-scan oop-hooks rules). |
| `no-deprecated-api` | MUST NOT | Practice | The module uses no core API that data/drupal/deprecations.json lists as deprecated or removed. |
