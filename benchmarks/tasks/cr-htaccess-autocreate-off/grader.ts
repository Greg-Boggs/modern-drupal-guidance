import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { php } from '../_cr/lib.ts';

const grader: Grader = {
  checks: [
    {
      id: 'setting', kind: 'must', text: 'Settings::get(\'auto_create_htaccess\') is FALSE.',
      run: async (ctx) => {
        const v = php(ctx, String.raw`print json_encode(\Drupal\Core\Site\Settings::get('auto_create_htaccess', 'unset'));`);
        return { pass: v === false, detail: JSON.stringify(v) };
      },
    },
    {
      id: 'no-file-written', kind: 'must', text: 'Asking core to protect a new directory under public:// writes no .htaccess file there.',
      run: async (ctx) => {
        const v = php(ctx, String.raw`$d = 'public://bench-ht-' . rand(); \Drupal::service('file_system')->prepareDirectory($d, \Drupal\Core\File\FileSystemInterface::CREATE_DIRECTORY);
\Drupal::service('file.htaccess_writer')->write($d, TRUE);
print json_encode(!file_exists($d . '/.htaccess'));`);
        return { pass: v === true };
      },
    },
  ],
};

export default grader;
