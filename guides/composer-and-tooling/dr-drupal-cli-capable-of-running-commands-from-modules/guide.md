---
name: dr-drupal-cli-capable-of-running-commands-from-modules
title: "dr - Drupal CLI capable of running commands from modules"
description: "dr - Drupal CLI capable of running commands from modules"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3584928
change-record-nid: 3584928
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3453474](https://www.drupal.org/node/3453474), [#3583795](https://www.drupal.org/node/3583795)

The command-line interface (CLI) in `core/scripts/drupal` had limited use for core-provided commands only. The CLI and all existing commands are refactored to be discoverable by `vendor/bin/dr` (implemented in `core/scripts/dr`).

## Summary of changes

- Commands created by modules can be discovered by using the `AsCommand` Attribute.
- The entry point for the drupal CLI, `WEBROOT/core/scripts/drupal`, is deprecated and replaced with `WEBROOT/core/scripts/dr`, which is installed into composer’s bin-dir as `vendor/bin/dr`. It is preferred to run the CLI from `vendor/bin/dr` or locally in DDev `ddev exec dr`.
- `Drupal\Core\Command\BootableCommandTrait` is deprecated and no longer necessary.
- `Drupal\Core\Command\CacheRebuildCommand` is implemented to serve as an example and can be used as `vendor/bin/dr cache:rebuild` to rebuild caches.
- `Drupal\system\Command\StatusCommand` and `Drupal\system\Command\CronCommand` are implemented to serve as examples for module-provided commands.
- Commands should use the Symfony Command return types `Command::SUCCESS`, `Command::ERROR`, etc...
- The dr CLI will log output to the `logger.console` / `Drupal\Core\Command\DrupalConsoleLogger` logger.

The `dr` CLI and commands should be considered @internal and experimental as more commands are added to Drupal Core. It is recommended to join #cli-in-core [Drupal Slack](https://drupal.org/slack) channel or follow discussions in issues under [\[meta\] CLI in Core community initiative](https://www.drupal.org/node/3582246) to discuss any contributed or custom module requirements.

## Providing commands

Modules implementing commands should use their module name as the namespace when creating commands substituting hyphens for underscores in the namespace and command name e.g. `my_module` becomes `my-module:my-command`. Commands without a namespace, `core`, and core module namespaces are reserved for Drupal core, and using them may result in conflicts in the future.

### Before

```php
final class RecipeInfoCommand extends Command {

  use BootableCommandTrait;

  public function __construct($class_loader) {
    parent::__construct('recipe:info');
    $this->classLoader = $class_loader;
  }

  protected function execute() {
    $this->boot();
    // ...
  }

  // ...

}
```

### After

- Use the `AsCommand` class attribute for discovery. Once Drupal core adopts Symfony 8.1, the `AsCommand` attribute will be available for methods as well allowing multiple commands on a class.
- Use the `Autowire` attribute for service injection.

```php
use Composer\Autoload\ClassLoader;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\DependencyInjection\Attribute\Autowire;

#[AsCommand(
  name: 'recipe:info',
  description: 'Shows information about a recipe.',
)]
final class RecipeInfoCommand extends Command {

  public function __construct(
    #[Autowire(service: 'class_loader')]
    protected ClassLoader $class_loader,
  ) {
    parent::__construct();
  }

  protected function execute(InputInterface $input, OutputInterface $output): int {
    $io = new SymfonyStyle($input, $output);
    // ...
  }

  // ...

}
```

## dr CLI usage

```php
% ./vendor/bin/dr
Drupal 11.4.0

Usage:
  command [options] [arguments]

Options:
  -h, --help            Display help for the given command. When no command is given display help for the list command
      --silent          Do not output any message
  -q, --quiet           Only errors are displayed. All other output is suppressed
  -V, --version         Display this application version
      --ansi|--no-ansi  Force (or disable --no-ansi) ANSI output
  -n, --no-interaction  Do not ask any interactive question
      --url=URL         A base URL (e.g. example.com). Used for building links, selecting a multi-site, etc.
  -e, --env=ENV         The Environment name. [default: "prod"]
      --no-debug        Switches off debug mode.
  -v|vv|vvv, --verbose  Increase the verbosity of messages: 1 for normal output, 2 for more verbose output and 3 for debug

Available commands:
  completion      Dump the shell completion script
  generate-theme  Generates a new theme based on latest default markup.
  help            Display help for a command
  install         Install Drupal using an install profile or recipe.
  list            List commands
  quick-start     Installs a Drupal site and starts a web server for local testing or development.
  server          Starts up a webserver for a site.
 cache
  cache:rebuild   [cr|rebuild] Rebuild all caches.
 content
  content:export  Exports content entities in YAML format.
 recipe
  recipe:apply    [recipe] Applies a recipe to a site.
  recipe:info     Shows information about a recipe.
 system
  system:cron     [cron|core:cron] Runs cron implementations.
  system:status   [status] Show system status.
```

## Porting guide for Drush command authors

[A full porting guide is available at for Drush command authors](<https://www.drupal.org/docs/develop/drupal-apis/command-line-interface-cli-api/drush-command-porting-guide-to-the-new-dr-drupal-core-cli >).

*Source: [dr - Drupal CLI capable of running commands from modules](https://www.drupal.org/node/3584928), a Drupal core change record by [mradcliffe](https://www.drupal.org/user/157079) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
