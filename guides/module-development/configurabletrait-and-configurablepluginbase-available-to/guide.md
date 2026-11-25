---
name: configurabletrait-and-configurablepluginbase-available-to
title: "ConfigurableTrait and ConfigurablePluginBase available to reduce plugin boilerplate"
description: "ConfigurableTrait and ConfigurablePluginBase available to reduce plugin boilerplate"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/2853355
change-record-nid: 2853355
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#2852463](https://www.drupal.org/node/2852463)

A majority of plugins implement `\Drupal\Component\Plugin\ConfigurableInterface`, and each have to provide the getter and setter methods.

Due to the existence of `public function defaultConfiguration();`, they must also handle merging defaults in with explicit configuration.

To reduce the boilerplate, there is now \Drupal\Core\Plugin\ConfigurablePluginBase class as well as \Drupal\Core\Plugin\ConfigurableTrait.

The trait uses NestedArray::MergeDeepArray to merge the provided configuration with the defaults, which properly merges nested keys while preserving integer keys.

Where possible, a plugin should extend ConfigurablePluginBase to implement ConfigurableInterface. This will properly merge the plugin defaults with the provided configuration in the constructor, and provide the getConfiguration and setConfiguration methods. It will also provide a defaultConfiguration method which returns an empty array. Plugins should override this method with their own defaults.

For plugins that must extend a different plugin base class (and when the base class itself can not extend ConfigurablePluginBase) a trait is also provided to provide the getConfiguration, setConfiguration, and defaultConfiguration methods provided by the interface. If using the trait instead of the base class, it is important to call ->setConfiguration in the class constructor after calling the parent constructor in order to properly merge the provided configuration with the defaults. see [https://www.drupal.org/node/2852190](https://www.drupal.org/node/2852190) for more detail.

The following plugin base classes have been converted to use the new boilerplate:

ConfigurableActionBase\
VariantBase\
SelectionPluginBase\
LayoutDefault\
ImageEffectBase\
ConfigurableSearchPluginBase\
WorkflowTypeBase

Of those above, All except for ImageEffectBase and WorkflowTypeBase have had their merging logic converted to use mergeDeepArray from either mergeDeep or simple array addition. These should be functionally equivalent, but may return the array keys in a slightly different order, which might require test updates in contrib.

*Source: [ConfigurableTrait and ConfigurablePluginBase available to reduce plugin boilerplate](https://www.drupal.org/node/2853355), a Drupal core change record by [tim.plunkett](https://www.drupal.org/user/241634) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
