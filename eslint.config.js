import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import reactHooksPlugin from 'eslint-plugin-react-hooks';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default [
  {
    ignores: [
      'dist/**',
      'prettier.config.cjs',
      'lint-staged.config.cjs',
      'commitlint.config.cjs'
    ]
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
          modules: true
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json']
      }
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      'react-hooks': reactHooksPlugin
    },
    rules: {
      'linebreak-style': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'object-shorthand': 'error',
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }]
    }
  },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
          modules: true
        },
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      'react-hooks': reactHooksPlugin
    },
    rules: {
      'linebreak-style': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'object-shorthand': 'error',
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }]
    }
  }
];
