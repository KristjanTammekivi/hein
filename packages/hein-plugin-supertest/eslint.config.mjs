import eslintConfigHein from 'eslint-config-hein';
import { globalIgnores } from 'eslint/config';

export default [globalIgnores(['tsdown.config.ts']), ...eslintConfigHein];
