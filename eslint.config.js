/* eslint-env node */
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',

    // React / React Native
    'plugin:react/recommended',

    // TypeScript (remove if JS only)
    'plugin:@typescript-eslint/recommended',

    // ⬇️ MUST BE LAST
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react/react-in-jsx-scope': 'off', // Expo / React 17+
  },
};
