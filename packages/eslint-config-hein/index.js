module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'airbnb-typescript/base',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:mocha/recommended',
        'plugin:unicorn/recommended',
        'plugin:jsdoc/recommended',
        'plugin:prettier/recommended',
        'plugin:eslint-comments/recommended',
        'plugin:@stylistic/disable-legacy'
    ],
    plugins: [
        'import',
        'mocha',
        'unicorn',
        'jsdoc',
        '@stylistic'
    ],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        project: './tsconfig.json'
    },
    rules: {
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
        'no-multi-spaces': 'error',
        'spaced-comment': [
            'error',
            'always',
            {
                markers: [
                    '/'
                ]
            }
        ],
        'template-curly-spacing': [
            'error',
            'always'
        ],
        'no-irregular-whitespace': [
            'error',
            {
                skipStrings: false
            }
        ],
        'no-trailing-spaces': 'error',
        'eol-last': 'error',
        '@typescript-eslint/comma-dangle': 'off',
        '@typescript-eslint/no-unnecessary-type-assertion': 'error',
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
        '@stylistic/space-before-blocks': 'error',
        '@stylistic/type-annotation-spacing': 'error',
        'arrow-spacing': 'error',
        '@stylistic/quotes': [
            'error',
            'single',
            {
                avoidEscape: true,
                allowTemplateLiterals: true
            }
        ],
        '@typescript-eslint/no-floating-promises': 'error',
        '@typescript-eslint/no-non-null-assertion': 'off',
        'mocha/no-mocha-arrows': 'off',
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
        '@typescript-eslint/no-extra-parens': 'off',
        '@stylistic/no-extra-semi': 'error',
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: 'variable',
                format: [
                    'camelCase',
                    'PascalCase'
                ]
            },
            {
                selector: 'function',
                format: [
                    'camelCase',
                    'PascalCase'
                ]
            },
            {
                selector: 'typeLike',
                format: [
                    'PascalCase'
                ]
            },
            {
                selector: 'variable',
                format: [
                    'camelCase',
                    'PascalCase',
                    'UPPER_CASE',
                    'snake_case'
                ],
                modifiers: [
                    'destructured'
                ]
            },
            {
                selector: 'variable',
                format: [
                    'camelCase',
                    'PascalCase',
                    'UPPER_CASE'
                ],
                modifiers: [
                    'const'
                ]
            },
            {
                selector: 'typeParameter',
                format: [
                    'UPPER_CASE'
                ]
            }
        ],
        curly: [
            'error',
            'all'
        ],
        '@stylistic/semi': 'error',
        'comma-dangle': [
            'error',
            'never'
        ],
        '@stylistic/member-delimiter-style': ['error'],
        // 'jsdoc/check-examples': 'error'

        'eslint-comments/no-unused-disable': 'error',
        'eslint-comments/disable-enable-pair': 'off',

        // Rule was renamed
        '@typescript-eslint/no-throw-literal': 'off',
        '@typescript-eslint/only-throw-error': 'error'
    },
    overrides: [
        {
            files: [
                './src/test/**/*.ts'
            ],
            rules: {
                'import/no-extraneous-dependencies': 'off'
            }
        }
    ]
}
