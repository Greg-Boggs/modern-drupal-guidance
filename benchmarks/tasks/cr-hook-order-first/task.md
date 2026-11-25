---
id: cr-hook-order-first
title: Run a form alter before every other module
kind: code
guides: [hook-implementations-can-be-ordered-with-an-order-parameter, oop-hooks]
---

Create a module called `zbench_first` in `web/modules/custom` and turn it on. It marks every form by setting `#zbench_first` to TRUE in the form. Its change to forms must happen before any other module changes the form, including Field UI.
