import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { mod, moduleEnabled, noDeprecatedApis, noPattern, phpCheck, practice } from '../_cr/lib.ts';

const M = 'bench_note';

const grader: Grader = {
  checks: [
    moduleEnabled(M),
    phpCheck('definition', 'The entity type bench_note exists as a content entity type labelled "Note" with base table bench_note and keys id, uuid and label => title.', M, String.raw`$d = \Drupal::entityTypeManager()->getDefinition('bench_note', FALSE);
print json_encode(['pass' => $d && $d->entityClassImplements('Drupal\Core\Entity\ContentEntityInterface') && (string) $d->getLabel() === 'Note' && $d->getBaseTable() === 'bench_note' && $d->getKey('label') === 'title' && $d->getKey('uuid') === 'uuid', 'detail' => $d ? $d->getKeys() : NULL]);`),
    phpCheck('save-load', 'A note titled "Buy milk" can be saved and loaded back with its title and a UUID.', M, String.raw`$s = \Drupal::entityTypeManager()->getStorage('bench_note');
$n = $s->create(['title' => 'Buy milk']); $n->save();
$l = $s->loadUnchanged($n->id());
print json_encode(['pass' => $l && $l->label() === 'Buy milk' && \Drupal\Component\Uuid\Uuid::isValid($l->uuid()), 'detail' => $l ? $l->label() : NULL]);`),
    noPattern('no-annotation', 'The module declares no entity type with a @ContentEntityType docblock annotation.', mod(M), /@ContentEntityType\s*\(/, /\.php$/),
    noDeprecatedApis(M),
  ],
};

export default practice(grader, ['no-annotation', 'no-deprecated-api']);
