import { runLegacyScanCli } from '../cli.ts';

const result = await runLegacyScanCli(process.argv.slice(2));
process.stdout.write(result.output);
process.exitCode = result.exitCode;
