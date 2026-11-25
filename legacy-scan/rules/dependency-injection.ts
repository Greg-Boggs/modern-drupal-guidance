import type { PhpNode, PhpRuleMatcher, ScanMatch, ScanRule } from '../schema.ts';
import {
  attributeNames,
  calledFunctionName,
  classesIn,
  drupalStaticMethod,
  lineOf,
  nameText,
  walk,
  type ClassInfo,
} from '../scanners/php.ts';
import { GUIDE_IDS, PENDING_GUIDE_HASH } from './guide-ids.ts';
import { REMOVED_DRUPAL_STATIC_METHODS } from './removed-apis.ts';

/** Base classes whose subclasses get services injected (create() or autowiring). */
const INJECTABLE_BASES: ReadonlySet<string> = new Set([
  'ControllerBase',
  'FormBase',
  'ConfigFormBase',
  'ConfirmFormBase',
  'EntityForm',
  'ContentEntityForm',
  'BundleEntityFormBase',
  'EntityConfirmFormBase',
  'ContentEntityConfirmFormBase',
  'EntityDeleteForm',
  'ContentEntityDeleteForm',
  'BlockBase',
  'PluginBase',
  'FormatterBase',
  'WidgetBase',
  'FilterBase',
  'ActionBase',
  'ConditionPluginBase',
  'QueueWorkerBase',
  'ProcessPluginBase',
  'SourcePluginBase',
  'SqlBase',
  'DestinationBase',
  'FieldPluginBase',
  'FilterPluginBase',
  'ArgumentPluginBase',
  'SortPluginBase',
  'AreaPluginBase',
  'StylePluginBase',
  'RowPluginBase',
  'DisplayPluginBase',
  'ResourceBase',
  'DeriverBase',
  'EntityListBuilder',
  'ConfigEntityListBuilder',
  'EntityAccessControlHandler',
  'EntityViewBuilder',
  'DrushCommands',
]);

const INJECTABLE_INTERFACES: ReadonlySet<string> = new Set([
  'ContainerInjectionInterface',
  'ContainerFactoryPluginInterface',
  'ContainerDeriverInterface',
  'EntityHandlerInterface',
  'EventSubscriberInterface',
]);

/** Classes Drupal instantiates without the container (no DI available). */
const NON_INJECTABLE_BASES: ReadonlySet<string> = new Set([
  'ContentEntityBase',
  'ConfigEntityBase',
  'EntityBase',
  'RevisionableContentEntityBase',
  'EditorialContentEntityBase',
  'FieldItemBase',
  'FieldItemList',
  'EntityReferenceItem',
  'TypedData',
  'Map',
  'TestCase',
  'UnitTestCase',
  'KernelTestBase',
  'BrowserTestBase',
  'WebDriverTestBase',
]);

/** Methods where \Drupal:: is expected even in injectable classes. */
const EXEMPT_METHODS: ReadonlySet<string> = new Set(['__wakeup', '__sleep']);

/** \Drupal:: methods that are not service lookups. */
const NON_SERVICE_STATIC_METHODS: ReadonlySet<string> = new Set([
  'hasContainer',
  'hasService',
  'getContainer',
  'setContainer',
  'unsetContainer',
  'root',
  'hasRequest',
]);

function injectableKind(cls: ClassInfo): string | null {
  if (cls.extendsName && NON_INJECTABLE_BASES.has(cls.extendsName)) return null;
  if (/\\(Tests?|Entity)(\\|$)/.test(cls.namespace) && !/\\(Form|Controller)(\\|$)/.test(cls.namespace)) {
    // Entity classes and tests: no constructor injection.
    if (!cls.implementsNames.some((i) => INJECTABLE_INTERFACES.has(i))) return null;
  }
  if (cls.implementsNames.includes('EventSubscriberInterface')) return 'event-subscriber';
  if (cls.implementsNames.some((i) => INJECTABLE_INTERFACES.has(i))) return 'container-factory';
  if (/\\Hook(\\|$)/.test(cls.namespace) || cls.methods.some((m) => attributeNames(m).includes('Hook'))) return 'hook-class';
  if (cls.extendsName && INJECTABLE_BASES.has(cls.extendsName)) {
    if (cls.extendsName === 'DrushCommands') return 'drush-command';
    if (/Form/.test(cls.extendsName)) return 'form';
    if (cls.extendsName === 'ControllerBase') return 'controller';
    return 'plugin';
  }
  if (/\\(Controller|Form|EventSubscriber|Plugin|Commands|Drush)(\\|$)/.test(cls.namespace)) return 'namespace';
  // A class with constructor parameters is almost always a service.
  const ctor = cls.methods.find((m) => nameText(m.name) === '__construct');
  if (ctor && ((ctor.arguments as readonly PhpNode[] | undefined)?.length ?? 0) > 0) return 'service';
  return null;
}

/** True for `$x ?? \Drupal::service(...)` / `$x ?: \Drupal::...` BC fallbacks. */
function isFallbackOperand(ancestors: readonly PhpNode[], node: PhpNode): boolean {
  const parent = ancestors[ancestors.length - 1];
  if (!parent) return false;
  if (parent.kind === 'bin' && parent.type === '??' && parent.right === node) return true;
  if (parent.kind === 'retif' && parent.trueExpr === null && parent.falseExpr === node) return true;
  if (parent.kind === 'assign' && parent.operator === '??=') return true;
  return false;
}

/** True when an enclosing `if` block also calls trigger_error (constructor BC layer). */
function isInDeprecationBlock(ancestors: readonly PhpNode[]): boolean {
  for (let i = ancestors.length - 1; i >= 0; i--) {
    const a = ancestors[i];
    if (!a) continue;
    if (a.kind === 'method') return false;
    if (a.kind !== 'if') continue;
    let triggers = false;
    walk(a, (n) => {
      if (calledFunctionName(n) === 'trigger_error') triggers = true;
    });
    if (triggers) return true;
  }
  return false;
}

const matcher: PhpRuleMatcher = {
  kind: 'php',
  fastTokens: ['Drupal::'],
  matchFile(program): ScanMatch[] {
    const matches: ScanMatch[] = [];
    for (const cls of classesIn(program)) {
      const kind = injectableKind(cls);
      if (!kind) continue;
      for (const method of cls.methods) {
        if (method.isStatic) continue;
        const methodName = nameText(method.name) ?? '';
        if (EXEMPT_METHODS.has(methodName)) continue;
        walk(method, (node, ancestors) => {
          // Closures passed as static callbacks still run on the instance; keep walking.
          const call = drupalStaticMethod(node);
          if (!call) return;
          if (NON_SERVICE_STATIC_METHODS.has(call)) return;
          if (REMOVED_DRUPAL_STATIC_METHODS.has(call)) return; // reported by removed-apis
          if (isFallbackOperand(ancestors, node)) return;
          if (methodName === '__construct' && isInDeprecationBlock(ancestors)) return;
          matches.push({
            line: lineOf(node),
            subPattern: kind,
            message: `\\Drupal::${call}() inside ${cls.name}::${methodName}(); inject the service through the constructor (autowiring or create()) instead of reaching into the global container.`,
          });
        });
      }
    }
    return matches;
  },
};

export const drupalStaticInInjectableClassRule: ScanRule = {
  id: 'drupal-static-call-in-injectable-class',
  guideId: GUIDE_IDS.dependencyInjection,
  guideHash: PENDING_GUIDE_HASH,
  summary:
    '\\Drupal:: static service calls inside controllers, forms, plugins, hook classes, event subscribers and services should be constructor-injected dependencies.',
  matcher,
  verifierRubric: {
    keepWhen: [
      'A non-static method of a class that Drupal builds through the container (controller, form, plugin with ContainerFactoryPluginInterface or a DI-capable base class, OOP hook class, event subscriber, Drush command class or a service registered in *.services.yml) calls \\Drupal::service(), \\Drupal::entityTypeManager(), \\Drupal::currentUser(), \\Drupal::config() or another \\Drupal:: service accessor.',
      'The service is available to inject: the class already has, or can be given, a constructor and create()/autowiring.',
    ],
    dropWhen: [
      'The class is instantiated without the container: content or config entity classes, field item classes, typed data, value objects, or static callbacks (#pre_render, #lazy_builder, trusted callbacks) that run as static methods.',
      'The call is a backward-compatibility fallback for an optional constructor argument (`$service ?? \\Drupal::service(...)` after @trigger_error) kept until the next major.',
      'The code is a trait or base class shipped by core or contrib that must work for subclasses without changing their constructors.',
      'The call is in a test class, a __sleep/__wakeup serialization method, or a hook_update_N/post_update function where the container may be rebuilt.',
    ],
  },
};

export default [drupalStaticInInjectableClassRule];
