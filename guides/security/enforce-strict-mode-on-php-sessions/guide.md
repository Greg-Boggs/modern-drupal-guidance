---
name: enforce-strict-mode-on-php-sessions
title: "Enforce strict mode on PHP sessions"
description: "Enforce strict mode on PHP sessions"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3492563
change-record-nid: 3492563
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#2631220](https://www.drupal.org/node/2631220)

In order to better defend against anonymous user session fixation attacks, Drupal enforces the PHP ini value [session.use_strict_mode = 1](https://www.php.net/manual/en/session.configuration.php#ini.session.use-strict-mode).

The built-in `SessionHandler` class has been adapted to implement [\SessionUpdateTimestampHandlerInterface](https://www.php.net/manual/en/class.sessionupdatetimestamphandlerinterface.php) in order to make it compatible with strict session mode.

Contrib and custom implementations of `SessionHandler` should implement `\SessionUpdateTimestampHandlerInterface` either by themselves or by reusing one of the following symfony base classes:

- [Symfony\Component\HttpFoundation\Session\Storage\Handler\AbstractSessionHandler](https://github.com/symfony/symfony/blob/7.3/src/Symfony/Component/HttpFoundation/Session/Storage/Handler/AbstractSessionHandler.php)
- [Symfony\Component\HttpFoundation\Session\Storage\Proxy\AbstractProxy](https://github.com/symfony/symfony/blob/7.3/src/Symfony/Component/HttpFoundation/Session/Storage/Proxy/AbstractProxy.php)

*Source: [Enforce strict mode on PHP sessions](https://www.drupal.org/node/3492563), a Drupal core change record by [znerol](https://www.drupal.org/user/63999) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
