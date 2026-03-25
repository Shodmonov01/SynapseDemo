import globals from 'globals';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import prettierPluginRecommended from 'eslint-plugin-prettier/recommended';
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';
import storybookPlugin from 'eslint-plugin-storybook';

import baseRules from './eslint.rules.base.mjs';
import importRules from './eslint.rules.import.mjs';
import reactRules from './eslint.rules.react.mjs';
import tsRules from './eslint.rules.ts.mjs';

/**
 * Links
 * https://eslint.org/docs/latest/use/configure/
 * https://typescript-eslint.io/rules/
 * https://www.npmjs.com/package/eslint-plugin-react
 * https://www.npmjs.com/package/eslint-plugin-prettier
 * https://www.npmjs.com/package/eslint-plugin-simple-import-sort
 * https://www.npmjs.com/package/eslint-plugin-storybook
 */

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat['jsx-runtime'],
  ...storybookPlugin.configs['flat/recommended'],
  prettierPluginRecommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      'simple-import-sort': simpleImportSortPlugin,
    },
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: {
        ...globals.es2024,
      },
    },
    rules: {
      ...baseRules,
      ...importRules,
      ...reactRules,
      ...tsRules,
    },
  },
  {
    files: ['src/**/*', 'pages/**/*', 'public/**/*'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
  {
    files: ['*.js', '*.?js', 'scripts/node/**/*', 'webpack/**/*'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    files: ['**/*.js', '**/*.cjs'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    // totally ignore these files
    ignores: ['*.d.ts', 'node_modules', 'public', 'dist', 'dev-dist'],
  },
);
