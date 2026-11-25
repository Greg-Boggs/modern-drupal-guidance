---
id: cr-node-access-rebuild-service
title: Flag and run a node access rebuild from a service
kind: code
guides: [node-access-rebuild-functions-are-deprecated, dependency-injection]
---

Create a module called `bench_grants` in `web/modules/custom` and turn it on. Our deploy tooling manages content access permissions through `bench_grants.maintenance`: `flag()` marks them as needing a rebuild (so the status report shows the warning), `isFlagged()` says whether a rebuild is pending, and `rebuildNow()` rebuilds them right away, without a progress-bar batch, which also clears the warning.
