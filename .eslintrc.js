module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'prettier',
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    // eslint plugin import settings
    // 'plugin:import/errors',
    // 'plugin:import/warnings',
    // 'plugin:import/typescript',
    // eslint plugin import settings [e]
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['import'],
  rules: {
    // sort for imports.
    'import/order': [
      'error',
      {
        groups: [
          ['external', 'builtin'], // Built-in types are first
          'internal',
          ['sibling', 'parent'], // Then sibling and parent types. They can be mingled together
          'index', // Then the index file
          'object',
          // Then the rest: internal and external type
        ],
        pathGroups: [
          {
            pattern: '~assets/**',
            group: 'internal',
          },
          {
            pattern: '~screens/**',
            group: 'internal',
          },
          {
            pattern: '~pages/**',
            group: 'internal',
          },
          {
            pattern: '~components/**',
            group: 'internal',
          },
          {
            pattern: '~biz/**',
            group: 'internal',
          },
          {
            pattern: '~hooks/**',
            group: 'internal',
          },
          {
            pattern: '~theme/**',
            group: 'internal',
          },
          {
            pattern: '~theme',
            group: 'internal',
          },
          {
            pattern: '~utils/**',
            group: 'internal',
          },
          {
            pattern: '@/**',
            group: 'external',
          },
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc', // sort in ascending order. Options: ['ignore', 'asc', 'desc']
          caseInsensitive: true, // ignore case. Options: [true, false]
        },
      },
    ],
    'prettier/prettier': 0,
  },
};
