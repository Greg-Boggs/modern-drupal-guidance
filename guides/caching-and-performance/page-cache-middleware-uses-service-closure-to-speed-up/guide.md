---
name: page-cache-middleware-uses-service-closure-to-speed-up
title: "Page Cache Middleware uses Service Closure to speed up serving cached pages"
description: "Page Cache Middleware uses Service Closure to speed up serving cached pages"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3538740
change-record-nid: 3538740
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3538294](https://www.drupal.org/node/3538294)

The page cache middleware is responsible for storing and serving cached pages. When a page is served from the cache, it shortcuts all inner middlewares including the HTTP kernel.

In order to further speed up cached pages, the page cache middleware was supposed to prevent the construction of services further up the stack. This has been the responsibility of the `responder` attribute on the `http_middleware` service tag. This mechanism has been implemented using lazy services during the development of Drupal 8.0 but was rendered ineffective by an unrelated change inadvertedly before 8.0 was even released.

The optimization has now been restored. The page cache middleware now takes a service closure as its first argument. Services further up the stack and their dependencies are only constructed in case of a cache `MISS`. On a cache `HIT`, a response is served with considerable reduced overhead compared to previous versions.

In order to transition from the (dysfunctional) `responder` attribute, the following changes are necessary:

1. Drop the `responder` attribute from the `http_middleware` service tag:

   ```php
   diff --git a/core/modules/page_cache/page_cache.services.yml b/core/modules/page_cache/page_cache.services.yml
   index ec0f90d24b1..2f1ec6a4af9 100644
   --- a/core/modules/page_cache/page_cache.services.yml
   +++ b/core/modules/page_cache/page_cache.services.yml
   @@ -8,7 +8,7 @@ services:
        class: Drupal\page_cache\StackMiddleware\PageCache
        arguments: ['@cache.page', '@page_cache_request_policy', '@page_cache_response_policy']
        tags:
   -      - { name: http_middleware, priority: 200, responder: true }
   +      - { name: http_middleware, priority: 200 }

      cache.page:
        class: Drupal\Core\Cache\CacheBackendInterface
   ```

2. Modify the constructor of the middleware to take a closure as its first argument:

   ```php
     /**
      * Constructs a PageCache object.
      *
      * @param \Symfony\Component\HttpKernel\HttpKernelInterface|\Closure $http_kernel
      *   The decorated kernel.
      * @param \Drupal\Core\Cache\CacheBackendInterface $cache
      *   The cache bin.
      * @param \Drupal\Core\PageCache\RequestPolicyInterface $request_policy
      *   A policy rule determining the cacheability of a request.
      * @param \Drupal\Core\PageCache\ResponsePolicyInterface $response_policy
      *   A policy rule determining the cacheability of the response.
      */
     public function __construct(HttpKernelInterface|\Closure $http_kernel, CacheBackendInterface $cache, RequestPolicyInterface $request_policy, ResponsePolicyInterface $response_policy) {
       if ($http_kernel instanceof HttpKernelInterface) {
         @trigger_error('Calling ' . __METHOD__ . '() without a service closure $http_kernel argument is deprecated in drupal:11.3.0 and it will throw an error in drupal:12.0.0. See https://www.drupal.org/node/3538740', E_USER_DEPRECATED);
         $http_kernel = static fn() => $http_kernel;
       }
       $this->httpKernel = $http_kernel;
       $this->cache = $cache;
       $this->requestPolicy = $request_policy;
       $this->responsePolicy = $response_policy;
     }
   ```

*Source: [Page Cache Middleware uses Service Closure to speed up serving cached pages](https://www.drupal.org/node/3538740), a Drupal core change record by [znerol](https://www.drupal.org/user/63999) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
