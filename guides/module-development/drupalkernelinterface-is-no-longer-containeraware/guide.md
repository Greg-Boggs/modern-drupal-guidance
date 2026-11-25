---
name: drupalkernelinterface-is-no-longer-containeraware
title: "DrupalKernelInterface is no longer ContainerAware"
description: "DrupalKernelInterface is no longer ContainerAware"
drupal-core: ">=11.0"
source-url: https://www.drupal.org/node/3424376
change-record-nid: 3424376
introduced-in-version: "11.0.0"
introduced-in-branch: "11.0.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.0.x\
Introduced in version: 11.0.0\
Issue links: [#3424177](https://www.drupal.org/node/3424177)

`\Symfony\Component\DependencyInjection\ContainerAwareInterface` is deprecated in Symfony 6.4 and removed from Symfony 7.0.

`\Drupal\Core\DrupalKernelInterface` extended `ContainerAwareInterface` to allow containers to be injected into the kernel. In core this was previously used in kernel tests, but has since been refactored away and the `setContainer()` method is no longer called.

If you were extending DrupalKernel and injecting or accessing the container directly then you will need to add support directly to your custom kernel class.

*Source: [DrupalKernelInterface is no longer ContainerAware](https://www.drupal.org/node/3424376), a Drupal core change record by [longwave](https://www.drupal.org/user/246492) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
