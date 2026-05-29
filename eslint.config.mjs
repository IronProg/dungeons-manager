import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';
import reactCompiler from 'eslint-plugin-react-compiler';
import pluginQuery from '@tanstack/eslint-plugin-query';
import importPlugin from 'eslint-plugin-import';
import unicorn from 'eslint-plugin-unicorn';
import reactNative from 'eslint-plugin-react-native';

export default tseslint.config(
  {
    ignores: [
      'node_modules/**',
      '.expo/**',
      'dist/**',
      'build/**',
      'android/**',
      'ios/**',
    ],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginQuery.configs['flat/recommended'],

  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
      '@typescript-eslint/prefer-nullish-coalescing': 'warn',
      '@typescript-eslint/prefer-optional-chain': 'warn',
    },
  },

  {
    files: ['**/*.{js,jsx,ts,tsx}'],

    plugins: {
      react,
      'react-hooks': reactHooks,
      prettier,
      'react-compiler': reactCompiler,
      import: importPlugin,
      unicorn,
      'react-native': reactNative,
    },

    settings: {
      react: { version: 'detect' },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
    },

    rules: {
      'react-compiler/react-compiler': 'error',

      'no-restricted-syntax': [
        'warn',
        {
          selector: "CallExpression[callee.name='useCallback']",
          message:
            'useCallback é desnecessário com o React Compiler. Remova a memoização manual.',
        },
        {
          selector: "CallExpression[callee.name='useMemo']",
          message:
            'useMemo é desnecessário com o React Compiler. Remova a memoização manual.',
        },
        {
          selector: "CallExpression[callee.name='memo']",
          message:
            'React.memo() é desnecessário com o React Compiler. Remova a memoização manual.',
        },
        {
          selector:
            "ImportDeclaration[source.value=/^(assets|components|constants|contexts|core|hooks|i18n|modules|providers|services|types)($|[\\/.])/]",
          message:
            'Use @/ prefix for internal imports, e.g. @/components/Foo instead of components/Foo.',
        },
        {
          selector:
            "ExportNamedDeclaration[source.value=/^(assets|components|constants|contexts|core|hooks|i18n|modules|providers|services|types)($|[\\/.])/]",
          message:
            'Use @/ prefix for internal imports, e.g. @/components/Foo instead of components/Foo.',
        },
        {
          selector:
            "ExportAllDeclaration[source.value=/^(assets|components|constants|contexts|core|hooks|i18n|modules|providers|services|types)($|[\\/.])/]",
          message:
            'Use @/ prefix for internal imports, e.g. @/components/Foo instead of components/Foo.',
        },
        {
          selector:
            "ImportExpression[source.value=/^(assets|components|constants|contexts|core|hooks|i18n|modules|providers|services|types)($|[\\/.])/]",
          message:
            'Use @/ prefix for internal imports, e.g. @/components/Foo instead of components/Foo.',
        },
      ],

      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      'react/react-in-jsx-scope': 'off',
      'react/self-closing-comp': 'warn',
      'react/no-unstable-nested-components': ['error', { allowAsProps: true }],
      'react/jsx-no-useless-fragment': 'warn',
      'react/jsx-curly-brace-presence': [
        'warn',
        { props: 'never', children: 'never' },
      ],

      'react-native/no-inline-styles': 'warn',
      'react-native/no-raw-text': 'error',

      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        { prefer: 'type-imports' },
      ],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],

      'import/no-duplicates': 'error',
      'import/no-cycle': 'warn',
      'import/order': [
        'warn',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
          pathGroups: [
            { pattern: '@/**', group: 'internal' },
          ],
        },
      ],

      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['./**', '../**'],
              message:
                'Relative imports are not allowed. Use @/ prefix instead, e.g. @/components/Foo.',
            },
          ],
        },
      ],

      'unicorn/no-array-for-each': 'warn',
      'unicorn/prefer-ternary': 'warn',
      'unicorn/no-negated-condition': 'warn',

      'no-console': ['warn', { allow: ['warn', 'error'] }],

      'prettier/prettier': 'warn',
    },
  },
);
