import { globalIgnores, defineConfig } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';
import json from '@eslint/json';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';
import prettier from 'eslint-plugin-prettier/recommended';
import mocha from 'eslint-plugin-mocha';
import unicorn from 'eslint-plugin-unicorn';
import comments from '@eslint-community/eslint-plugin-eslint-comments/configs';
import importPlugin from 'eslint-plugin-import';

const jsTsPattern = '**/*.{js,mjs,cjs,ts}';
const tsPattern = '**/*.ts';
export default defineConfig([
    globalIgnores(['.*', 'dist', '**/*.d.ts']),
    js.configs.recommended,
    tseslint.configs.recommended,
    { files: [jsTsPattern] },
    {
        files: [jsTsPattern],
        languageOptions: {
            globals: globals.node,
            sourceType: 'module'
        }
    },
    {
        files: [jsTsPattern],
        plugins: {
            js,
            '@stylistic': stylistic
        },
        extends: ['js/recommended']
    },
    {
        files: [jsTsPattern],
        ...mocha.configs.recommended
    },
    prettier,
    {
        ...unicorn.configs.recommended,
        files: [jsTsPattern]
    },
    {
        ...comments.recommended,
        files: [jsTsPattern]
    },
    importPlugin.flatConfigs.recommended,
    importPlugin.flatConfigs.typescript,
    {
        plugins: {
            json
        },
        files: ['**/*.json'],
        ignores: ['package-lock.json'],
        language: 'json/json',
        ...json.configs.recommended
    },
    {
        files: [tsPattern],
        languageOptions: {
            parser: tseslint.parser,
            sourceType: 'module',
            parserOptions: {
                ecmaVersion: 'latest',
                projectService: true,
                tsconfigRootDir: import.meta.dirname
            }
        },
        rules: {
            '@typescript-eslint/no-unnecessary-type-assertion': 'error',
            '@typescript-eslint/no-floating-promises': 'error',
            '@typescript-eslint/only-throw-error': 'error'
        }
    },
    {
        files: [jsTsPattern],
        rules: {
            // eslint
            curly: ['error', 'all'],
            'comma-dangle': ['error', 'never'],
            'no-irregular-whitespace': [
                'error',
                {
                    skipStrings: false
                }
            ],
            'no-multi-spaces': 'error',
            'no-trailing-spaces': 'error',
            'no-unused-vars': 'off',
            'spaced-comment': [
                'error',
                'always',
                {
                    markers: ['/']
                }
            ],
            'template-curly-spacing': ['error', 'always'],

            'eol-last': 'error',
            'arrow-spacing': 'error',

            // prettier
            'prettier/prettier': [
                'error',
                {
                    singleQuote: true,
                    tabWidth: 4,
                    printWidth: 120,
                    trailingComma: 'none',
                    endOfLine: 'lf'
                }
            ],

            // typescript-eslint
            '@typescript-eslint/comma-dangle': 'off',
            '@typescript-eslint/no-use-before-define': [
                'error',
                {
                    variables: false
                }
            ],
            '@typescript-eslint/no-explicit-any': 'off',
            '@stylistic/space-before-function-paren': [
                'error',
                {
                    named: 'never'
                }
            ],
            '@typescript-eslint/no-non-null-assertion': 'off',
            '@typescript-eslint/naming-convention': [
                'error',
                {
                    selector: 'variable',
                    format: ['camelCase', 'PascalCase']
                },
                {
                    selector: 'function',
                    format: ['camelCase', 'PascalCase']
                },
                {
                    selector: 'typeLike',
                    format: ['PascalCase']
                },
                {
                    selector: 'variable',
                    format: ['camelCase', 'PascalCase', 'UPPER_CASE', 'snake_case'],
                    modifiers: ['destructured']
                },
                {
                    selector: 'variable',
                    format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
                    modifiers: ['const']
                },
                {
                    selector: 'typeParameter',
                    format: ['UPPER_CASE']
                }
            ],
            '@typescript-eslint/no-extra-parens': 'off',

            // stylistic
            '@stylistic/space-before-blocks': 'error',
            '@stylistic/type-annotation-spacing': 'error',
            '@stylistic/quotes': [
                'error',
                'single',
                {
                    avoidEscape: true,
                    allowTemplateLiterals: true
                }
            ],
            '@stylistic/no-extra-semi': 'error',

            '@stylistic/semi': 'error',
            '@stylistic/member-delimiter-style': ['error'],

            // unicorn
            'unicorn/no-null': 'off',
            'unicorn/prevent-abbreviations': [
                'error',
                {
                    replacements: {
                        args: false,
                        fn: false,
                        cb: false,
                        params: false
                    }
                }
            ],
            'unicorn/consistent-function-scoping': 'off',
            'unicorn/empty-brace-spaces': 'off',
            'unicorn/error-message': 'off',

            // eslint-comments
            '@eslint-community/eslint-comments/no-use': [
                'error',
                { allow: ['eslint-disable-line', 'eslint-disable-next-line'] }
            ],
            '@eslint-community/eslint-comments/no-unused-disable': 'error',
            '@eslint-community/eslint-comments/disable-enable-pair': 'off',

            'mocha/no-mocha-arrows': 'off',

            'import/no-unresolved': 'off'
        }
    }
]);
