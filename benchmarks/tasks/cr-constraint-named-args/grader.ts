import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { mod, moduleEnabled, noDeprecatedApis, noPattern, phpCheck, practice } from '../_cr/lib.ts';

const M = 'bench_zip';
const V = String.raw`$val = fn ($x) => \Drupal::typedDataManager()->create(\Drupal\Core\TypedData\DataDefinition::create('string')->addConstraint('BenchZip'), $x)->validate();`;
const SYM = String.raw`$sv = \Symfony\Component\Validator\Validation::createValidatorBuilder()->setConstraintValidatorFactory(new \Drupal\Core\Validation\ConstraintValidatorFactory(\Drupal::classResolver()))->getValidator();`;

const grader: Grader = {
  checks: [
    moduleEnabled(M),
    phpCheck('validates', 'The BenchZip plugin accepts "12345" and rejects "1234a" with the default message.', M, V + String.raw`
$ok = count($val('12345')) === 0; $bad = $val('1234a');
print json_encode(['pass' => $ok && count($bad) === 1 && str_contains((string) $bad[0]->getMessage(), 'is not a valid postal code.'), 'detail' => count($bad) ? (string) $bad[0]->getMessage() : NULL]);`),
    phpCheck('named-arguments', 'new BenchZipConstraint(message: \'Bad code\') works and its violation message is "Bad code".', M, SYM + String.raw`$c = new \Drupal\bench_zip\Plugin\Validation\Constraint\BenchZipConstraint(message: 'Bad code');
$bad = $sv->validate('x', [$c]);
print json_encode(['pass' => count($bad) === 1 && (string) $bad[0]->getMessage() === 'Bad code', 'detail' => count($bad) ? (string) $bad[0]->getMessage() : NULL]);`),
    phpCheck('has-constructor', 'The constraint class declares its own constructor with a named $message parameter.', M, String.raw`$r = new \ReflectionMethod('Drupal\bench_zip\Plugin\Validation\Constraint\BenchZipConstraint', '__construct');
$names = array_map(fn ($p) => $p->getName(), $r->getParameters());
print json_encode(['pass' => $r->getDeclaringClass()->getName() === 'Drupal\bench_zip\Plugin\Validation\Constraint\BenchZipConstraint' && in_array('message', $names, TRUE), 'detail' => $names]);`),
    noPattern('no-annotation', 'The constraint uses an @Constraint annotation.', mod(M), /@Constraint\s*\(/),
    noDeprecatedApis(M),
  ],
};

export default practice(grader, ['has-constructor', 'no-annotation', 'no-deprecated-api']);
