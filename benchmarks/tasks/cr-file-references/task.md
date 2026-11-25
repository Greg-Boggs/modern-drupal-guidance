---
id: cr-file-references
title: Find nodes that use a file
kind: code
guides: [file-get-file-references-is-deprecated-in-favor-of-the]
---

Create a module called `bench_fileuse` in `web/modules/custom` and turn it on. Before deleting a file, editors want to know where it is used. Provide `bench_fileuse.finder`, whose `nodeIds($file)` returns the sorted IDs of every node that uses the file in any file or image field, including nodes where only an older or draft revision uses it.
