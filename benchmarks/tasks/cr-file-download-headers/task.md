---
id: cr-file-download-headers
title: HTTP headers for a file download
kind: code
guides: [file-get-content-headers-is-deprecated]
---

Create a module called `bench_filehdr` in `web/modules/custom` and turn it on. Provide `bench_filehdr.headers`, whose `forFile($file)` returns the HTTP headers Drupal sends when that file is downloaded (content type, length and cache control), exactly as Drupal works them out.
