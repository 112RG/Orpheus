module.exports = {
  root: true,
  env: {
    node: true,
    es6: true
  },
  parserOptions: { ecmaVersion: 8, sourceType: 'module' },
  ignorePatterns: ['node_modules/*'],
  extends: ['eslint:recommended', 'standard'],
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      /*       settings: {
        react: { version: 'detect' },
        'import/resolver': {
          typescript: {}
        }
      }, */
      env: {
        browser: true,
        node: true,
        es6: true
      },
      extends: [
        'standard',
        'eslint:recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:jest-dom/recommended'
      ],
      rules: {
        'no-restricted-imports': [
          'error',
          {
            patterns: ['@/features/*/*']
          }
        ],
        'react/prop-types': 'off',

        'import/order': [
          'error',
          {
            groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
            'newlines-between': 'always',
            alphabetize: { order: 'asc', caseInsensitive: true }
          }
        ],
        'import/default': 'off',
        'import/no-named-as-default-member': 'off',
        'import/no-named-as-default': 'off',

        'react/react-in-jsx-scope': 'off',

        'jsx-a11y/anchor-is-valid': 'off',

        '@typescript-eslint/no-unused-vars': ['error'],

        '@typescript-eslint/explicit-function-return-type': ['off'],
        '@typescript-eslint/explicit-module-boundary-types': ['off'],
        '@typescript-eslint/no-empty-function': ['off'],
        '@typescript-eslint/no-explicit-any': ['off']
      },
      settings: {
        react: { version: 'detect' },
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts', '.tsx', '.css']
        },
        'import/ignore': {
          ignorePatterns: ['.(scss|less|css)']
        },
        'import/resolver': {
          // See https://github.com/benmosher/eslint-plugin-import/issues/1396#issuecomment-575727774 for line below
          node: {
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.css']
          },
          ignore: ['^virtual:'],
          typescript: {
            alwaysTryTypes: true,
            project: './tsconfig.json'
          }
        }
      }
    }
  ]
}
