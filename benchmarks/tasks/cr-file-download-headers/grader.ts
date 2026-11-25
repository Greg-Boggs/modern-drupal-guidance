import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { mod, moduleEnabled, noDeprecatedApis, noPattern, phpCheck, practice } from '../_cr/lib.ts';

const M = 'bench_filehdr';

const grader: Grader = {
  checks: [
    moduleEnabled(M),
    phpCheck('headers', 'forFile() equals File::getDownloadHeaders() for a text file, including Content-Type text/plain.', M, String.raw`file_put_contents('public://bench-hdr.txt', 'hello');
$f = \Drupal\file\Entity\File::create(['uri' => 'public://bench-hdr.txt', 'filename' => 'bench-hdr.txt', 'filemime' => 'text/plain', 'status' => 1]); $f->save();
$h = \Drupal::service('bench_filehdr.headers')->forFile($f);
print json_encode(['pass' => $h == $f->getDownloadHeaders() && str_starts_with((string) ($h['Content-Type'] ?? ''), 'text/plain'), 'detail' => $h]);`),
    noPattern('no-legacy-api', 'The module does not call file_get_content_headers().', mod(M), /\bfile_get_content_headers\s*\(/),
    noDeprecatedApis(M),
  ],
};

export default practice(grader, ['no-legacy-api', 'no-deprecated-api']);
