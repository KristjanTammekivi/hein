import eslintConfigHein from 'eslint-config-hein';
import { globalIgnores } from 'eslint/config';

export default [
    globalIgnores(['tsdown.config.ts']),
    ...eslintConfigHein,
    {
        files: ['src/expect.types.ts'],
        rules: {
            '@typescript-eslint/no-empty-object-type': 'off'
        }
    }
];
