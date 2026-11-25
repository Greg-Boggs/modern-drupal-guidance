---
id: cr-reorder-other-hook
title: Move another module's hook implementation to the end
kind: code
guides: [reorder-hook-implementations-in-other-modules-with-the, oop-hooks]
---

Create a module called `zbench_reorder` in `web/modules/custom` and turn it on. It marks every form by setting `#zbench_reorder` to TRUE in the form. Field UI's own changes to forms must happen after every other module's, including this one's.
