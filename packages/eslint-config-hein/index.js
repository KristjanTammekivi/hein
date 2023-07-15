module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'airbnb-typescript/base',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:mocha/recommended',
        'plugin:unicorn/recommended',
        'plugin:jsdoc/recommended'
    ],
    plugins: [
        'import',
        'mocha',
        'unicorn',
        'jsdoc'
    ],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        project: './tsconfig.json'
    },
    rules: {
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
        '@typescript-eslint/indent': [
            'error',
            4,
            {
                ignoredNodes: [
                    'TSUnionType',
                    'TSTypeLiteral'
                ],
                SwitchCase: 1
            }
        ],
        '@typescript-eslint/comma-dangle': 'off',
        '@typescript-eslint/no-use-before-define': [
            'error',
            {
                variables: false
            }
        ],
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/space-before-function-paren': [
            'error',
            {
                named: 'never'
            }
        ],
        '@typescript-eslint/space-before-blocks': 'error',
        '@typescript-eslint/type-annotation-spacing': 'error',
        'arrow-spacing': 'error',
        '@typescript-eslint/quotes': [
            'error',
            'single',
            {
                avoidEscape: true,
                allowTemplateLiterals: true
            }
        ],
        '@typescript-eslint/no-floating-promises': 'error',
        'mocha/no-mocha-arrows': 'off',
        'unicorn/no-null': 'off',
        'unicorn/prevent-abbreviations': [
            'error',
            {
                replacements: {
                    args: false
                }
            }
        ],
        'unicorn/consistent-function-scoping': 'off',
        'unicorn/empty-brace-spaces': 'off',
        'unicorn/error-message': 'off',
        '@typescript-eslint/no-extra-parens': 'error',
        '@typescript-eslint/no-extra-semi': 'error',
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
        '@typescript-eslint/semi': 'error',
        'comma-dangle': [
            'error',
            'never'
        ],
        '@typescript-eslint/member-delimiter-style': ['error'],
        // 'jsdoc/check-examples': 'error'
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
