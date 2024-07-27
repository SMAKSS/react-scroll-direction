import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import reactHooksPlugin from 'eslint-plugin-react-hooks';

export default [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: [
      'dist/**',
      'prettier.config.cjs',
      'lint-staged.config.cjs',
      'commitlint.config.cjs'
    ],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
          modules: true
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
        tsconfigRootDir: '.',
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
      '@typescript-eslint/ban-types': [
        'error',
        {
          extendDefaults: true,
          types: {
            '{}': false
          }
        }
      ],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'object-shorthand': 'error',
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }]
    }
  }
];
