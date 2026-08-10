import { defineConfig, globalIgnores } from 'eslint/config';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import angular from 'angular-eslint';
import stylistic from '@stylistic/eslint-plugin';
import prettier from 'eslint-config-prettier';

export default defineConfig([
    globalIgnores(['projects/**/*', 'e2e/**/*']),
    {
        files: ['**/*.ts'],
        extends: [
            js.configs.recommended,
            ...tseslint.configs.recommended,
            ...tseslint.configs.stylistic,
            ...angular.configs.tsRecommended,
            prettier,
        ],
        processor: angular.processInlineTemplates,
        plugins: {
            '@stylistic': stylistic,
        },

        rules: {
            '@angular-eslint/directive-selector': [
                'error',
                {
                    type: 'attribute',
                    prefix: 'app',
                    style: 'camelCase',
                },
            ],

            '@angular-eslint/component-selector': [
                'error',
                {
                    type: 'element',
                    prefix: 'app',
                    style: 'kebab-case',
                },
            ],

            '@angular-eslint/component-class-suffix': 'error',
            '@angular-eslint/contextual-lifecycle': 'error',
            '@angular-eslint/directive-class-suffix': 'error',
            '@angular-eslint/no-input-rename': 'error',
            '@angular-eslint/no-inputs-metadata-property': 'error',
            '@angular-eslint/no-output-native': 'error',
            '@angular-eslint/no-output-on-prefix': 'error',
            '@angular-eslint/no-output-rename': 'error',
            '@angular-eslint/no-outputs-metadata-property': 'error',
            '@angular-eslint/prefer-on-push-component-change-detection': 'off',
            '@angular-eslint/use-lifecycle-interface': 'error',
            '@angular-eslint/use-pipe-transform-interface': 'error',
            '@typescript-eslint/adjacent-overload-signatures': 'error',
            '@typescript-eslint/array-type': 'off',
            '@typescript-eslint/no-unsafe-function-type': 'error',
            '@typescript-eslint/no-empty-object-type': 'error',
            '@typescript-eslint/no-wrapper-object-types': 'error',

            '@typescript-eslint/consistent-type-assertions': 'error',
            '@typescript-eslint/consistent-type-definitions': 'error',
            '@typescript-eslint/dot-notation': 'off',

            '@typescript-eslint/explicit-member-accessibility': [
                'off',
                {
                    accessibility: 'explicit',
                },
            ],

            '@typescript-eslint/explicit-module-boundary-types': [
                'error',
                {
                    allowArgumentsExplicitlyTypedAsAny: true,
                    allowDirectConstAssertionInArrowFunctions: true,
                    allowHigherOrderFunctions: false,
                    allowTypedFunctionExpressions: false,
                },
            ],

            '@stylistic/member-delimiter-style': [
                'error',
                {
                    multiline: {
                        delimiter: 'semi',
                        requireLast: true,
                    },

                    singleline: {
                        delimiter: 'semi',
                        requireLast: false,
                    },
                },
            ],
            '@stylistic/type-annotation-spacing': [
                'error',
                {
                    before: false,
                    after: true,
                },
            ],
            '@stylistic/indent': ['error', 4],

            '@typescript-eslint/member-ordering': [
                'error',
                {
                    classes: ['field', 'constructor', 'method'],
                },
            ],

            '@typescript-eslint/naming-convention': [
                'error',
                {
                    selector: 'variable',
                    format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
                    leadingUnderscore: 'allow',
                    trailingUnderscore: 'forbid',
                },
                {
                    selector: 'memberLike',
                    modifiers: ['private'],
                    format: ['camelCase'],
                    leadingUnderscore: 'require',
                },
            ],

            '@typescript-eslint/no-empty-function': 'off',
            '@typescript-eslint/no-empty-interface': 'error',
            '@typescript-eslint/no-explicit-any': 'off',

            '@typescript-eslint/no-inferrable-types': [
                'error',
                {
                    ignoreParameters: true,
                },
            ],

            '@typescript-eslint/no-misused-new': 'error',
            '@typescript-eslint/no-namespace': 'error',
            '@typescript-eslint/no-non-null-assertion': 'error',

            '@typescript-eslint/no-shadow': [
                'error',
                {
                    hoist: 'all',
                },
            ],

            '@typescript-eslint/no-unused-expressions': 'error',

            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    varsIgnorePattern: '_',
                    argsIgnorePattern: '_',
                },
            ],

            '@typescript-eslint/no-use-before-define': 'error',
            '@typescript-eslint/no-var-requires': 'off',
            '@typescript-eslint/prefer-for-of': 'warn',
            '@typescript-eslint/prefer-function-type': 'error',
            '@typescript-eslint/prefer-namespace-keyword': 'error',
            '@stylistic/quotes': ['error', 'single'],
            '@stylistic/semi': ['error', 'always'],

            '@typescript-eslint/triple-slash-reference': [
                'error',
                {
                    path: 'always',
                    types: 'prefer-import',
                    lib: 'always',
                },
            ],

            '@typescript-eslint/typedef': 'error',
            '@typescript-eslint/unified-signatures': 'error',
            complexity: 'off',
            'constructor-super': 'error',
            curly: 'error',
            'dot-notation': 'off',
            'eol-last': 'error',
            eqeqeq: ['error', 'smart'],
            'guard-for-in': 'error',

            'id-denylist': [
                'error',
                'any',
                'Number',
                'number',
                'String',
                'string',
                'Boolean',
                'boolean',
                'Undefined',
                'undefined',
            ],

            'id-match': 'error',
            indent: 'off',
            'max-classes-per-file': 'off',

            'max-len': [
                'warn',
                {
                    code: 200,
                },
            ],

            'new-parens': 'error',
            'no-bitwise': 'error',
            'no-caller': 'error',
            'no-cond-assign': 'error',

            'no-console': [
                'error',
                {
                    allow: [
                        'log',
                        'warn',
                        'dir',
                        'timeLog',
                        'assert',
                        'clear',
                        'count',
                        'countReset',
                        'group',
                        'groupEnd',
                        'table',
                        'dirxml',
                        'error',
                        'groupCollapsed',
                        'Console',
                        'profile',
                        'profileEnd',
                        'timeStamp',
                        'context',
                    ],
                },
            ],

            'no-debugger': 'error',
            'no-empty': 'off',
            'no-empty-function': 'off',
            'no-eval': 'error',
            'no-fallthrough': 'error',
            'no-invalid-this': 'off',
            'no-new-wrappers': 'error',
            'no-restricted-imports': ['error', 'rxjs/Rx'],
            'no-shadow': 'off',
            'no-throw-literal': 'error',
            'no-trailing-spaces': 'error',
            'no-undef-init': 'error',
            'no-underscore-dangle': 'off',
            'no-unsafe-finally': 'error',
            'no-unused-expressions': 'off',
            'no-unused-labels': 'error',
            'no-use-before-define': 'off',
            'no-var': 'error',
            'object-shorthand': 'error',
            'one-var': ['error', 'never'],
            'prefer-const': 'error',
            'quote-props': ['error', 'as-needed'],
            quotes: 'off',
            radix: 'error',
            semi: 'off',

            'space-before-function-paren': [
                'error',
                {
                    anonymous: 'always',
                    asyncArrow: 'always',
                    named: 'never',
                },
            ],

            'spaced-comment': [
                'error',
                'always',
                {
                    markers: ['/'],
                },
            ],

            'use-isnan': 'error',
            'valid-typeof': 'off',
        },
    },
    {
        files: ['**/*.html'],
        extends: [
            ...angular.configs.templateRecommended,
            ...angular.configs.templateAccessibility,
        ],

        rules: {
            '@angular-eslint/template/eqeqeq': [
                'error',
                {
                    allowNullOrUndefined: true,
                },
            ],
        },
    },
]);
