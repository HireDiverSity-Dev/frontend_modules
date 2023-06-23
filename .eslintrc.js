module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier', 'simple-import-sort'],
  extends: ['prettier'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
      },
    },
  ],
  rules: {
    'prettier/prettier': 'warn',
    'simple-import-sort/imports': [
      'warn',
      {
        groups: [
          // Side effect imports.
          ['^\\u0000'],
          [
            // Node.js builtins prefixed with `node:`.
            '^node:',
            // React-related packages.
            '^react$',
            '^react-native$',
            // Packages.
            // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
            '^@?\\w',
            // Absolute imports and other imports such as Vue-style `@/foo`.
            // Anything not matched in another group.
            '^',
            // Relative imports.
            // Anything that starts with a dot.
            '^\\.',
          ],
        ],
      },
    ],
    'simple-import-sort/exports': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
  },
};
