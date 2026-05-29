import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';
import reactCompiler from 'eslint-plugin-react-compiler';

export default [
  js.configs.recommended,

  ...tseslint.configs.recommended,

  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      react,
      'react-hooks': reactHooks,
      prettier,
      'react-compiler': reactCompiler,
    },
    rules: {
      // React
      'react/react-in-jsx-scope': 'off',
      'react-compiler/react-compiler': 'error',

      // 🔥 ESSENCIAL
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Prettier
      'prettier/prettier': 'warn',
    },
  },
];
