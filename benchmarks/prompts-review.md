## code-behaviors-once: Badge behavior that runs once per element


Create a module called `bench_js` in `web/modules/custom` and turn it on. On every front-end page, add a small "New" label, the markup `<span class="bench-badge">New</span>`, at the end of each element with the class `node__content`. Some of that content is loaded into the page later without a full page reload, so do it in the browser with a script. Every one of those elements must end up with exactly one label, including the ones that arrive later.

## code-cache-metadata: Cached published-article counter block


Create a module called `bench_cache` in `web/modules/custom` and turn it on. It adds a block (internal ID `bench_article_count`, listed for admins as `Article count`) that shows `Published articles: N`, where N is the number of published articles. Put the block in the Sidebar region of the Olivero theme. When an article is published or unpublished, anonymous visitors must see the new number right away, without anyone clearing caches. The site must stay fast: pages with the block must still be cached for anonymous visitors.

## code-dependency-injection: Latest article service and route


Create a module called `bench_di` in `web/modules/custom` and turn it on. Anyone allowed to view published content should be able to visit `/bench/latest-article` and see `Latest article: <title>` for the most recently created published article, or `No articles yet` when there is none. Other custom code on the site needs the same lookup, so make it reusable as `bench_di.latest_article`, with a method that returns that title, or NULL when there is no published article.

## code-oop-hooks: Hooks for article titles and module help


Create a module called `bench_hooks` in `web/modules/custom` and turn it on. Editors type article titles carelessly. When an article is saved, remove spaces at the start and end of its title and capitalise each word, so `  hello drupal world ` is saved as `Hello Drupal World`. Leave the titles of other content types alone. The module's help page at `/admin/help/bench_hooks` should say `Bench hooks tidies article titles.`

## code-plugin-attributes: Configurable greeting block plugin


Create a module called `bench_block` in `web/modules/custom` and turn it on. It adds a greeting block (internal ID `bench_greeting`, listed for admins as `Bench greeting`). By default the block shows `Hello from the benchmark`. When admins configure the block they get one text field, Greeting, and once they save a greeting the block shows it instead. Put the block in the Content region of the Olivero theme so it shows on every page.

## cr-access-neutral-reason: Members-only access result with a reason


Create a module called `bench_members` in `web/modules/custom` and turn it on. Our members-only pages will ask it who may see member content: other code calls `check($account)` on `bench_members.access` and gets an access result back. Accounts with the `member` role are allowed. A blocked account is forbidden, with the reason `Blocked accounts cannot see member content.` Everyone else gets a neutral result (so other access rules can still decide) with the reason `Only members can see this content.` The answer depends on the account's roles, so it must never be reused for someone with different roles.

## cr-aggregate-compression-off: Stop writing precompressed CSS and JS aggregates


This site sits behind a CDN that compresses every response itself, so Drupal no longer needs to write its own compressed copies of the combined CSS and JavaScript files. Stop that for both CSS and JavaScript. Leave the setting that combines CSS and JavaScript files as it is.

## cr-asset-gc-threshold: Keep CSS and JS aggregates for ten days across cache clears


When caches are cleared, Drupal deletes old combined CSS and JavaScript files. On this site it should delete only the ones older than ten days and keep newer ones, so CDN and browser caches stay warm. Put the setting in `web/sites/default/settings.php`.

## cr-autowire-container-param: Controller that receives a container parameter


Create a module called `bench_param` in `web/modules/custom` and turn it on. Add a page at `/bench-site-path`, titled `Site path` and open to everyone, that shows `Site path: <value>`, where the value is this site's directory as Drupal records it (for example `sites/default`).

## cr-batch-callback-service: Batch operations on an injected service


Create a module called `bench_batch` in `web/modules/custom` and turn it on. We need a job that runs in three steps through Drupal's batch processing (the progress bar). Each step adds 1 to the value `bench_batch.count` in site state, and when the job finishes it sets `bench_batch.done` to TRUE. Our admin tools get the job from `bench_batch.counter`: its `buildBatch()` returns the job definition as an array ready to hand to Drupal's batch system. Keep the step and finish code in `bench_batch.counter` itself.

## cr-batch-set-once: Add a batch set only once per request


Create a module called `bench_onceb` in `web/modules/custom` and turn it on. Several parts of the site may ask for a search index rebuild during the same request by calling `queue()` on `bench_onceb.queuer`. Each call should add a batch job titled `Rebuild index` with one step to the current request's batch, but only once: however many times `queue()` is called in a request, the job is added a single time. Give the batch set the ID `bench_onceb_rebuild` so other code can recognise it.

## cr-block-cache-optional: Cheap per-URL block without its own render cache entries


Create a module called `bench_where` in `web/modules/custom` and turn it on. It adds a block (internal ID `bench_where_path`, listed for admins as `You are here`) that shows `You are at: ` followed by the current path, for example `You are at: /node/1`. The block is so cheap to build that saving a separate cached copy of it for every path wastes more space than it saves, so Drupal should not keep cached copies of this block on its own. The pages that show it must still be cached.

## cr-block-placeholder: Always-placeholdered statistics block


Create a module called `bench_stats` in `web/modules/custom` and turn it on. It adds a block (internal ID `bench_stats_count`, listed for admins as `Content count`) that shows `Published content: N`, where N is the number of published nodes. The number has to update whenever content is saved, and right now every save would throw away the cached copy of every page that shows the block. Pages must keep their cached copy, and only this block should be worked out again, whatever cache information the block carries. Keep the block itself cacheable.

## cr-bundle-class-attribute: Article bundle class without hooks


Create a module called `bench_bundle` in `web/modules/custom` and turn it on. Our theme code calls `shout()` on articles to get the title in capitals. Loading or creating an article must give an object of the class `Drupal\bench_bundle\Entity\Article`, based on core's node class, whose `shout()` returns the title in upper case. Basic pages stay ordinary nodes.

## cr-bundle-labels: List content type labels


Create a module called `bench_types` in `web/modules/custom` and turn it on. Our reporting code needs the names of all content types. Make them available as `bench_types.lister`, whose `nodeTypeNames()` returns every content type's name keyed by its machine name, for example `['article' => 'Article', 'page' => 'Basic page']`. Content types added later must show up too.

## cr-bundle-list-cache-tags: Latest articles block with precise cache invalidation


Create a module called `bench_latest` in `web/modules/custom` and turn it on. It adds a block (internal ID `bench_latest_articles`, listed for admins as `Latest articles`) that lists the titles of the three newest published articles. When an article is added, changed or deleted, the block must show it straight away. Changes to other content types, such as basic pages, must not throw away the block's cached copy.

## cr-cache-delete-all: Empty a custom cache bin completely


Create a module called `bench_reports` in `web/modules/custom` and turn it on. It keeps report data in a cache of its own, available as `cache.bench_reports`. Other code saves reports with `save($cid, $data)` on `bench_reports.store`, which stores the array in that cache, and empties the cache with `reset()`. After `reset()`, nothing saved before may come back, not even for code that asks for expired or invalidated items.

## cr-cache-prewarm: Catalog service that Drupal can warm ahead of requests


Create a module called `bench_catalog` in `web/modules/custom` and turn it on. `getItems()` on `bench_catalog.catalog` returns `['alpha', 'beta', 'gamma']`. Building that list is slow on the real site, so keep it in the `default` cache bin under the ID `bench_catalog:items`: return the cached copy when there is one, otherwise build it and store it. After caches are cleared we don't want the first visitor to wait, so Drupal's cache warm-up after a rebuild should be able to fill `bench_catalog:items` before any request asks for it.

## cr-clear-cache-block: One-click cache clearing for editors


Site administrators want a way to clear all caches from every admin page instead of going to the Performance page. Put it in the Content region of the Claro administration theme, using what Drupal core already offers, without writing custom code.

## cr-constraint-named-args: Validation constraint plugin with named arguments


Create a module called `bench_zip` in `web/modules/custom` and turn it on. Add a postal code validation rule called `BenchZip` that accepts only five-digit codes and otherwise reports `%value is not a valid postal code.` Our import code also creates the rule directly with its own message, as `new \Drupal\bench_zip\Plugin\Validation\Constraint\BenchZipConstraint(message: 'Bad code')`, and expects that message when a code is rejected.

## cr-content-export: Export a page as recipe default content


Publish a Basic page titled `About us` with the body `We build websites.` We want new sites to start with this page, so export it into a recipe: create a recipe in `recipes/bench_about`, named `Bench about`, that brings this page with it as content when it is applied.

## cr-content-type-body: Event content type with a body field


Add an Event content type (machine name `event`, label `Event`) with the same Body field that articles and basic pages have, labelled `Body`. Editors should see the body when they add or edit an event, and visitors should see it on the event's page.

## cr-decoration-on-invalid: Optional service decorator


Create a module called `bench_decor` in `web/modules/custom` and turn it on. When the Ban module is in use, we want every IP ban logged. Add `bench_decor.ban_logger`, which wraps Ban's `ban.ip_manager`, logs each ban and passes every call on to it. Ban is not installed on this site and may never be: the module must install and the site must keep working without Ban, and in that case the logger should simply not exist.

## cr-editor-for-format: Look up the editor of a text format


Create a module called `bench_editorinfo` in `web/modules/custom` and turn it on. Other code needs to know which editor a text format uses. Provide `bench_editorinfo.lookup`, whose `editorFor($format_id)` returns the ID of the editor configured for that text format (for example `ckeditor5`), or NULL when the format has no editor.

## cr-entity-links-filter: Link suggestions for site content in Basic HTML


Editors using the Basic HTML text format want to link to other content by typing part of its title in the editor's link dialog and picking it from the suggestions, and those links must keep working when the target's URL alias changes. Turn this on for Basic HTML with what Drupal core offers, without writing custom code, and keep the format's other settings as they are.

## cr-entity-operation-cacheability: Permission-gated node operation with correct cacheability


Create a module called `bench_ops` in `web/modules/custom` and turn it on. Add a permission `view bench report` (title `View bench report`). On the content overview, the operations menu of every node should get a `Report` link (key `bench_report`) to the node's page, but only for users with that permission. The overview is cached, so users with and without the permission must never see each other's version of the menu.

## cr-entity-type-attribute: Minimal content entity type


Create a module called `bench_note` in `web/modules/custom` and turn it on. We need a simple Note record stored in the site's database: type ID `bench_note`, label `Note`, database table `bench_note`, with an ID, a UUID and a required `title` text field that serves as its label. Use Drupal's standard storage and access handling. Saving a note and loading it again must work as soon as the module is installed.

## cr-exception-status-cache-context: Error-page hint block with a cheap cache context


Create a module called `bench_errhint` in `web/modules/custom` and turn it on. It adds a block (internal ID `bench_errhint`, listed for admins as `Error hint`) that shows `Try the search page.` on "access denied" (403) and "page not found" (404) pages, and nothing on normal pages. Put it in the Content region of the Olivero theme. Bots request thousands of missing URLs, so the block must not be cached separately for every URL: one cached copy per kind of page (normal, 403, 404) is enough.

## cr-file-download-headers: HTTP headers for a file download


Create a module called `bench_filehdr` in `web/modules/custom` and turn it on. Provide `bench_filehdr.headers`, whose `forFile($file)` returns the HTTP headers Drupal sends when that file is downloaded (content type, length and cache control), exactly as Drupal works them out.

## cr-file-references: Find nodes that use a file


Create a module called `bench_fileuse` in `web/modules/custom` and turn it on. Before deleting a file, editors want to know where it is used. Provide `bench_fileuse.finder`, whose `nodeIds($file)` returns the sorted IDs of every node that uses the file in any file or image field, including nodes where only an older or draft revision uses it.

## cr-filter-format-repository: Text formats an account may use


Create a module called `bench_formats` in `web/modules/custom` and turn it on. Provide `bench_formats.lister` with two methods: `formatIds($account)` returns the IDs of the text formats that account may use, in the order Drupal lists them, and `defaultFormatId($account)` returns the ID of that account's default text format.

## cr-form-autowire: Form with constructor injection and no factory method


Create a module called `bench_autoform` in `web/modules/custom` and turn it on. Add a form at `/bench-autoform` (form ID `bench_autoform`, open to everyone) that shows `Last saved: <value>`, where the value is the site state value `bench_autoform.last` (or `never` when it is empty), with a `note` text field and a `Save` button that stores the note in `bench_autoform.last`.

## cr-form-callback-service: Form submit handler on an injected service


Create a module called `bench_feedback` in `web/modules/custom` and turn it on. Add a feedback form at `/feedback` (form ID `bench_feedback_form`) with a required `message` text area and a submit button. Saving feedback is the job of `bench_feedback.recorder`, which other forms will reuse: its `record(array &$form, FormStateInterface $form_state)` saves the submitted `message` to the site state value `bench_feedback.last`. The feedback form should hand its submissions to that recorder.

## cr-form-render-cache: Render-cacheable signup form


Create a module called `bench_signup` in `web/modules/custom` and turn it on. Add a signup form at `/signup` (form ID `bench_signup_form`) with an `email` field labelled `Email` and a `Sign up` button; when submitted it shows the message `Thanks for signing up.` The form looks the same for every visitor, so we want Drupal to keep a cached copy of the form for up to one hour instead of building it every time. The rest of the page should keep caching the way it does now.

## cr-front-page-alias: Front page set by URL alias


Publish a Basic page titled `Welcome` with the body `Hello from the welcome page.` at the address `/welcome`, and make it the site's home page. Later we will move the `/welcome` address to other pages to change the home page, so the home page setting must point at `/welcome` itself, not at this particular page. Visiting `/` must show the page without redirecting.

## cr-hook-entity-duplicate: Adjust node duplicates when they are created


Create a module called `bench_dup` in `web/modules/custom` and turn it on. When a node is duplicated (for example by code that copies a node for an editor), the copy, not the original, must get ` (copy)` added to its title and be unpublished straight away, before anyone saves it.

## cr-hook-order-first: Run a form alter before every other module


Create a module called `zbench_first` in `web/modules/custom` and turn it on. It marks every form by setting `#zbench_first` to TRUE in the form. Its change to forms must happen before any other module changes the form, including Field UI.

## cr-htaccess-autocreate-off: Stop Drupal writing .htaccess files


This site runs on nginx, whose configuration already protects the public, private and temporary file folders, so Drupal should stop creating `.htaccess` files in them. Put the setting in `web/sites/default/settings.php`.

## cr-html5-validation-off: Turn off browser-native form validation site-wide


Screen reader users report that the browser's own validation pop-ups get in the way of Drupal's accessible error messages. Make every form on the site skip the browser's built-in validation, so Drupal's own error messages always show. Fields must stay marked as required and keep their input types. Set this once for the whole site in `web/sites/default/settings.php`, without writing custom code.

## cr-htmx-fragment: Swap in a fragment with core's declarative AJAX


Create a module called `bench_quote` in `web/modules/custom` and turn it on. The page `/bench-quote` (title `Quote`, open to anonymous visitors) shows a box, `<div id="bench-quote">`, and a button labelled `Next quote`. Clicking the button loads `/bench-quote/next` into the box without reloading the page. `/bench-quote/next` returns `Quote: Simplicity is a prerequisite for reliability.` on its own, without the site's header, footer or other page regions, however it is requested. We don't want custom JavaScript files to maintain for this.

## cr-image-style-options: List image styles for a select element


Create a module called `bench_styles` in `web/modules/custom` and turn it on. Our forms need an image style dropdown. Provide `bench_styles.options`, whose `options($includeEmpty = TRUE)` returns the image styles as dropdown options (machine name => label), with Drupal's usual empty option first when `$includeEmpty` is TRUE: exactly the list Drupal's image module shows in its own forms.

## cr-initial-preprocess: Theme hook with a preprocess callback on a hook class


Create a module called `bench_badge` in `web/modules/custom` and turn it on. Add a reusable badge that other code renders as `bench_badge`, passing a `label` (empty by default) and a `color` (`grey` by default). Its template, `templates/bench-badge.html.twig`, outputs `<span class="{{ classes }}">{{ label }}</span>`, and the module works out `classes` as `badge badge--<color>`.

## cr-jsonapi-filter-access: JSON:API filter access for published users


Turn on core's JSON:API module. Create a module called `bench_apifilter` in `web/modules/custom` and turn it on. API users with the `access user profiles` permission should be able to filter the JSON:API list of users, limited to active (not blocked) accounts. Users without that permission get no such access.

## cr-jsonapi-resource-meta: Add a computed value to JSON:API resource metadata


Turn on core's JSON:API module. Create a module called `bench_apimeta` in `web/modules/custom` and turn it on. Every article returned by JSON:API (for example `GET /jsonapi/node/article/<uuid>`) should include `bench_title_length`, the number of characters in its title, in the resource's top-level `meta` section. Don't add a field to the content type. When a title changes, the API must report the new length right away, also from cached responses.

## cr-library-font-preload: Preload a web font through a library


Create a module called `bench_fonts` in `web/modules/custom` and turn it on. It ships the font file `fonts/inter.woff2` (placeholder content is fine) in an asset library called `bench_fonts/typography`, used on every front-end page. The font appears late on slow connections, so the page head should tell browsers to start downloading it early (preload).

## cr-link-suggestions-terms: Offer tags as CKEditor link suggestions


When editors add a link in the text editor, the link dialog suggests site content as they type, but never tags. Create a module called `bench_termlinks` in `web/modules/custom` and turn it on. Terms from the `tags` vocabulary should be suggested too. Other vocabularies and other kinds of things on the site must stay as they are.

## cr-map-query-parameter: Controller argument from a query parameter


Create a module called `bench_greet` in `web/modules/custom` and turn it on. Add a page at `/bench-greet` (title `Greeting`, open to everyone) that shows `Hello, <name>!` using the `name` in the address, so `/bench-greet?name=Ann` shows `Hello, Ann!`, and `Hello, guest!` when there is no name. Every visitor must see their own name, even when the page is cached.

## cr-memory-cache-bin: Request-scoped memoization through core's memory cache bin


Create a module called `bench_memo` in `web/modules/custom` and turn it on. `square($n)` on `bench_memo.squares` returns n squared. Pretend that working out a square is expensive: remember each result for the rest of the current request only, never across requests, under the cache ID `bench_memo:square:<n>` with the cache tag `bench_memo`, so that invalidating that tag later in the same request forgets them.

## cr-menu-block-no-active-trail: Main menu without active-trail classes


The main navigation on this site has a single level and is styled without highlighting the current section, and marking that section makes Drupal cache the menu separately for every page. Change the existing Main navigation block in the Olivero theme so it no longer marks the menu items leading to the current page. Keep the block's other settings.

## cr-migrate-config-entity-source: Migration that reads this site's config entities


Create a module called `bench_cfgmig` in `web/modules/custom` and turn it on. Also turn on core's Migrate module, but not Migrate Drupal. The module contains a migration with the ID `bench_cfgmig_types` that reads the Article and Basic page content type settings (`node.type.article` and `node.type.page`) from this site's own active configuration, through its `default` database connection, maps each content type's label to `label`, and writes to the `null` destination, because for now we only want to try out the source.

## cr-node-access-rebuild-service: Flag and run a node access rebuild from a service


Create a module called `bench_grants` in `web/modules/custom` and turn it on. Our deploy tooling manages content access permissions through `bench_grants.maintenance`: `flag()` marks them as needing a rebuild (so the status report shows the warning), `isFlagged()` says whether a rebuild is pending, and `rebuildNow()` rebuilds them right away, without a progress-bar batch, which also clears the warning.

## cr-node-bulk-update: Unpublish all nodes of a content type


Create a module called `bench_bulk` in `web/modules/custom` and turn it on. `unpublishType($type)` on `bench_bulk.updater` unpublishes every node of that content type immediately, in one go and without a progress-bar batch, however many there are. Nodes of other types must not change.

## cr-node-edit-front-theme: Edit content in the front-end theme


Editors want to add and edit content in the front-end theme (Olivero), so they see the real styling while they write, instead of the administration theme. All other admin pages must keep the administration theme.

## cr-node-form-namespace: Custom node add/edit form class


Create a module called `bench_nodeform` in `web/modules/custom` and turn it on. Every node add and edit form should show `Remember to proofread.` at the top. Do it by making Drupal use the class `Drupal\bench_nodeform\Form\BenchNodeForm` as the node add and edit form. It builds on core's own node form, keeps everything that form does, and adds an element keyed `bench_reminder` with the reminder.

## cr-node-grants-helper: Report a user's node access grants


Create a module called `bench_grantinfo` in `web/modules/custom` and turn it on. For a site audit, provide `bench_grantinfo.reporter` with two methods: `grants($op, $account)` returns the node access grants (realm => grant IDs) the account gets for that operation, exactly as Drupal works them out when it filters content lists, and `canViewAll($account)` says whether the grants give the account view access to all content.

## cr-node-title-list: Render a list of linked node titles


Create a module called `bench_titles` in `web/modules/custom` and turn it on. `build($nids, $title = '')` on `bench_titles.builder` returns a renderable list of links to those nodes, in the order given, each showing the node's title in the current language, with `$title` as the list's heading. The list must refresh when any of those nodes changes.

## cr-node-type-description: Content type description of a node type


Create a module called `bench_typedesc` in `web/modules/custom` and turn it on. `description($type)` on `bench_typedesc.helper` returns the description of the content type with that machine name, or an empty string when it has none.

## cr-node-type-label: Content type label of a node


Create a module called `bench_typelabel` in `web/modules/custom` and turn it on. `label($node)` on `bench_typelabel.helper` returns the name of the node's content type as people see it, for example `Article`.

## cr-one-time-login-url: Generate one-time login links


Create a module called `bench_login` in `web/modules/custom` and turn it on. Support staff need to send people one-time login links. `loginUrl($account)` on `bench_login.links` returns an absolute one-time login link for that account, the same kind of `/user/reset/...` link Drupal emails for password resets, and Drupal must accept it.

## cr-oop-cache-flush: Count cache flushes from a hook class


Create a module called `bench_flush` in `web/modules/custom` and turn it on. Every time all of Drupal's caches are cleared (for example with `drush cache:rebuild`), add 1 to the value `bench_flush.count` in site state.

## cr-oop-preprocess: Node preprocessing in a hook class


Create a module called `bench_wordcount` in `web/modules/custom` and turn it on. When a node is shown in its full view, the `<article>` element that wraps it should carry `data-words="<N>"`, where N is the number of words in the node's title.

## cr-original-entity: Log title changes on node update


Create a module called `bench_retitle` in `web/modules/custom` and turn it on. When someone edits a node and changes its title, keep a record of the old and new title: add the line `<old title> -> <new title>` to the list kept in site state under `bench_retitle.log`. Saving a node without changing its title, or creating a new node, must not add a line.

## cr-page-top-attachment: Controller that adds markup to the top of the page


Create a module called `bench_banner` in `web/modules/custom` and turn it on. Add a page at `/bench-banner` (title `Banner demo`, open to anonymous visitors) whose main content is `Main content here.` On that page only, show `Site-wide notice: maintenance tonight.` at the very top of the page, before the site header and outside the main content.

## cr-password-algorithm: Hash passwords with bcrypt cost 12


A compliance rule says new and changed user passwords must be hashed with bcrypt (`$2y$`) at cost 12 instead of Drupal's default. Make the site do that without writing custom code.

## cr-perm-published-status: Editors can publish without administering content


People with the `content_editor` role must be able to tick and untick Published when they edit any content, but they must not get "Administer content" or "Bypass content access control".

## cr-perm-rebuild-node-access: Let site managers rebuild content access


Create a Site manager role (machine name `site_manager`). Site managers must be able to use the page that rebuilds content access permissions (`/admin/reports/status/rebuild`), but they must not get "Administer content" or "Bypass content access control".

## cr-perm-unpublished-block-content: Reviewers can see unpublished custom blocks


Create a Block reviewer role (machine name `block_reviewer`). Block reviewers must be able to view unpublished content blocks (the reusable blocks in the block library), but they must not be able to manage content blocks or open the block library.

## cr-placeholder-strategy-denylist: Lazy notice block that BigPipe must not stream


Create a module called `bench_notice` in `web/modules/custom` and turn it on. It adds a block (internal ID `bench_notice_banner`, listed for admins as `Maintenance notice`) that shows `Scheduled maintenance on Sunday.` The notice will soon show live data, so it must always be filled in separately from the cached page around it, with the text built by a static method on the block's class. It is tiny and on every page, though, so it must never be streamed in late by BigPipe; any other way of filling it in is fine.

## cr-plugin-autowire: Block plugin with constructor injection and no factory method


Create a module called `bench_users` in `web/modules/custom` and turn it on. It adds a block (internal ID `bench_users_count`, listed for admins as `User count`) that shows `Users: N`, the number of user accounts, not counting the anonymous user.

## cr-preview-required: Require preview for articles


Editors must preview an article before they can save it. Set that up for the Article content type.

## cr-procedural-scan-stop: Keep helper functions from being read as hooks


Create a module called `bench_helpers` in `web/modules/custom` and turn it on. Its `bench_helpers.module` file holds plain helper functions, including `bench_helpers_help()`, which returns `Helper text.`, and `bench_helpers_cron_label()`, which returns `Nightly`. None of them are hooks, but Drupal mistakes `bench_helpers_help()` for the module's help text. Keep both functions where they are, under their names, and make Drupal stop treating anything in that file as a hook.

## cr-processed-text: Filter text into a cacheable render array


Create a module called `bench_text` in `web/modules/custom` and turn it on. `format($text)` on `bench_text.formatter` returns the text filtered through the Basic HTML text format (`basic_html`), as an array Drupal can render, so the output updates when the format's settings change.

## cr-promote-default: News items promoted by default


Add a News content type (machine name `news`, label `News`). New news items should be promoted to the front page by default, and editors must see the Promoted checkbox on the news form so they can untick it.

## cr-recipe-create-for-each: Recipe that configures every content type


Write a recipe in `recipes/bench_lang_all` that turns on core's Language module and lets editors choose the language of each node, for every content type that exists when the recipe is applied. The recipe must not name content types: it has to work unchanged on sites with other content types. Apply it to this site.

## cr-recipe-env-input: Recipe that reads the slogan from the environment


Write a recipe in `recipes/bench_slogan` that sets the site slogan. The slogan is a recipe setting named `slogan`: by default it comes from the environment variable `BENCH_SLOGAN`, or is `Made with Drupal` when that variable is not set. Apply the recipe to this site with `BENCH_SLOGAN` set to `Built with recipes` for the command that applies it, without typing the slogan in.

## cr-recipe-layout-builder: Recipe that turns on Layout Builder for articles


Write a recipe in `recipes/bench_article_layouts` that turns on Layout Builder for the default display of articles and lets editors change the layout of individual articles. Apply it to this site.

## cr-recipe-menu-link-override: Recipe that hides a code-defined menu link


Write a recipe in `recipes/bench_no_myaccount` that hides the `My account` link (ID `user.page`) in the user account menu and moves the `Log out` link (`user.logout`) to weight `50`. Leave other menu links alone. Apply it to this site.

## cr-recipe-navigation-block: Recipe that adds a link to the admin navigation


Write a recipe in `recipes/bench_nav_docs` that adds a `Drupal docs` link to `https://www.drupal.org/docs` to the content section of the Navigation module's admin sidebar, keeping everything already in the sidebar. Apply it to this site.

## cr-recipe-optional-action: Recipe actions that tolerate missing blocks


Write a recipe in `recipes/bench_quiet_footer` that turns off the block `block.block.olivero_powered`, and also `block.block.olivero_syndicate` and `block.block.bench_promo` where those exist. The recipe must apply cleanly on sites that lack any of them (this site has no `bench_promo` block) and must not create them. Apply it to this site.

## cr-recipe-set-properties: Recipe that renames a content type


Write a recipe in `recipes/bench_story` that renames the Article content type to `Story` and sets its description to `Short stories from our writers.` Apply it to this site.

## cr-recipe-toolbar-items: Recipe that adds two CKEditor toolbar buttons


Write a recipe in `recipes/bench_editor_tools`, named `Bench editor tools`, that adds the Special characters (`specialCharacters`) and Code (`code`) buttons to the Full HTML editor's toolbar, keeping every button it already has. Apply it to this site.

## cr-remove-hook: Remove another module's help text


Create a module called `bench_nohelp` in `web/modules/custom` and turn it on. We don't want the Announcements module's help text anywhere on the site. We still use Announcements, so it must stay installed and unchanged. Help from other modules must keep working.

## cr-render-printed-flag: Skip one child when rendering a render array


Create a module called `bench_hidden` in `web/modules/custom` and turn it on. `build($showSecret)` on `bench_hidden.builder` returns a render array with three children keyed `intro` (`Welcome.`), `secret` (`Staff only.`) and `outro` (`Goodbye.`). When `$showSecret` is FALSE, the `secret` child must stay in the array, with its access setting untouched, because other code inspects it later, but it must not appear in the output. When `$showSecret` is TRUE, all three are shown.

## cr-reorder-other-hook: Move another module's hook implementation to the end


Create a module called `zbench_reorder` in `web/modules/custom` and turn it on. It marks every form by setting `#zbench_reorder` to TRUE in the form. Field UI's own changes to forms must happen after every other module's, including this one's.

## cr-route-alias-deprecation: Rename a route and keep the old name working


Create a module called `bench_shop` in `web/modules/custom` and turn it on. Add a page at `/bench-shop` (title `Shop`, open to everyone, showing `Welcome to the shop.`) with the route name `bench_shop.catalog`. Its route used to be called `bench_shop.list`, and other modules still link to that name. Keep those links working, but warn their developers that the old name is deprecated: package `drupal/bench_shop`, since version `1.1.0`, with a message pointing them to `bench_shop.catalog`.

## cr-route-attribute: Define a route on the controller


Create a module called `bench_attr` in `web/modules/custom` and turn it on. Add a page at `/bench-hello`, titled `Hello` and open to everyone, that shows `Hello from a controller.` Other code links to it by the route name `bench_attr.hello`.

## cr-runtime-requirements: Status report check for a missing API key


Create a module called `bench_req` in `web/modules/custom` and turn it on. On the site's status report (`/admin/reports/status`) it adds an entry with the key `bench_req_api_key` and the title `Bench API key`. When the site state value `bench_req.api_key` is empty, the entry is a warning with the value `Not configured` and a description telling the admin to set it; when it is set, the entry is OK with the value `Configured`.

## cr-sdc-variants: Single-directory component with named variants


Create a module called `bench_sdc` in `web/modules/custom` and turn it on. It provides a reusable component `callout` (ID `bench_sdc:callout`) with a `message` text input. Our designers want two variants of it: `info` (titled `Information`) and `warning` (titled `Warning`, described as `Use for problems the reader must act on.`). It outputs `<div class="callout callout--<variant>">{{ message }}</div>`, with `callout--info` when no variant is chosen.

## cr-service-closure-shorthand: Service that receives a lazy service closure


Create a module called `bench_lazy` in `web/modules/custom` and turn it on. `bench_lazy.counter`, of the class `Drupal\bench_lazy\Counter`, has `nodeCount()`, which returns the number of nodes. The counter is created on many requests but rarely used, so it must not load the entity type manager until `nodeCount()` runs: its constructor receives a closure that returns the entity type manager.

## cr-setter-injection: Controller with setter injection


Create a module called `bench_setter` in `web/modules/custom` and turn it on. Add a page at `/bench-time` (title `Time`, open to everyone) that shows `Request time: <unix timestamp>`, the time at which Drupal received the current request.

## cr-text-summary-service: Generate text summaries


Create a module called `bench_summary` in `web/modules/custom` and turn it on. `summarize($html, $size)` on `bench_summary.teaser` returns the summary Drupal would make from that HTML at that size, cutting at sentence or paragraph boundaries the same way the summary-or-trimmed display does, with no text format given.

## cr-theme-settings-provider: Read theme settings from a service


Create a module called `bench_themeset` in `web/modules/custom` and turn it on. `setting($name, $theme = NULL)` on `bench_themeset.reader` returns a theme setting (for example `logo.use_default` or `features.favicon`) for that theme, or for the active theme when no theme is given, including values the theme takes from the global theme settings, exactly as Drupal resolves them.

## cr-transaction-commit: Commit a database transaction explicitly


Create a module called `bench_tx` in `web/modules/custom` and turn it on. `writePair($a, $b)` on `bench_tx.writer` stores two rows in the `key_value` table (collection `bench_tx`, names `a` and `b`, values PHP-serialized). Both rows are saved or neither: if one insert fails, nothing is kept. By the time the method returns, the work must be committed.

## cr-twig-allowed-method: Let Twig call a value object's method


Create a module called `bench_tw` in `web/modules/custom` and turn it on. It has a class `Drupal\bench_tw\Badge`, created with a label, whose `shout()` returns the label in upper case followed by `!`. Our themers need to write `{{ badge.shout() }}` in templates, but Drupal refuses that call. Make it work for this method without loosening template security for anything else.

## cr-twig-cva: Button template with class variants


Create a module called `bench_button` in `web/modules/custom` and turn it on. Add a button that other code renders as `bench_button`, passing `label`, `intent` (`primary` or `danger`, `primary` by default) and `size` (`sm` or `lg`, `sm` by default). Its template, `templates/bench-button.html.twig`, outputs a `<button>` whose classes are always `btn`, plus `btn--primary` or `btn--danger` for the intent and `btn--sm` or `btn--lg` for the size.

## cr-user-load-by-properties: Find accounts by e-mail and name


Create a module called `bench_finder` in `web/modules/custom` and turn it on. `bench_finder.users` has `byMail($mail)` and `byName($name)`, which return the user account with that email address or user name, or NULL when there is none.

## sb-block: Office hours custom block


Visitors keep asking when we are open. Add an Office hours block to the bottom of every page: in the block library its description should be `Office hours`, and it should say `Open Monday to Friday, 9:00 to 17:00`. Put it in the Footer Top region of the Olivero theme and show its title.

## sb-content-type: Event content type with fields


We want to list community events on the site. Add an Event content type (machine name `event`). Besides the title, each event needs a date (required, a day only, without a time), a location as one line of text, and a link to its registration page. Use the machine names `field_event_date`, `field_event_location` and `field_event_registration`. Editors should see all three when they add or edit an event, and visitors should see them on the event's page. Other content types should not get these fields.

## sb-menu: About us page in the main menu


We need an About us page. Publish a Basic page titled `About us` with a short paragraph of your choice at the address `/about`, and add it to the main menu as `About us` so it shows in the site's main navigation on every page.

## sb-roles: Reviewer role, permissions and user


We want some people to check content before it goes live. Set up a Reviewer role (machine name `reviewer`). Reviewers must be able to open the content list at `/admin/content` and look at every revision of any content, but they must not be able to create, edit or delete content or change anything else on the site. Then create an active account named `rita` with the Reviewer role.

## sb-view: Recent articles view with page and block


We want a list of our latest articles. Create a listing called Recent articles (machine name `recent_articles`) showing the titles of the five newest published articles, newest first, each title linking to its article. Anonymous visitors should be able to see it at `/recent-articles`. We also want a block version of the list for later, but don't put the block anywhere yet.

