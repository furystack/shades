module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'plugin:jsdoc/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier', 'jsdoc'],
  env: { browser: true, node: true, es6: true, jest: true },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    // jsdoc: { exemptEmptyFunctions: false },
  },
  rules: {
    'arrow-parens': ['error', 'always'],
    'no-unused-vars': 'off',
    'no-console': 'off',
    '@typescript-eslint/no-unused-vars': 'off', // Use Typescript own check for this
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      {
        accessibility: 'explicit',
        overrides: {
          accessors: 'explicit',
          constructors: 'no-public',
          methods: 'explicit',
          properties: 'off',
          parameterProperties: 'explicit',
        },
      },
    ],
    '@typescript-eslint/no-parameter-properties': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/array-type': ['error', { default: 'array-simple', readonly: 'array-simple' }],
    'no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
    'prettier/prettier': 'error',
    'require-jsdoc': 1,
    'object-shorthand': 'error',
    'dot-notation': 'error',
    'no-caller': 'error',
    'no-useless-concat': 'error',
    radix: 'error',
    yoda: 'error',
    'prefer-arrow-callback': 'error',
    'prefer-rest-params': 'error',
    'no-var': 'error',
    'prefer-const': 'error',
    'prefer-spread': 'error',
    'no-shadow': 'error',
    '@typescript-eslint/no-useless-constructor': 'error',
    'prefer-template': 'error',
    'prefer-destructuring': ['error', { array: false, object: true }],
    'default-case': 'error',
    'jsdoc/require-param-type': 'off',
    'jsdoc/require-returns-type': 'off',
  },
  overrides: [
    {
      files: ['packages/**/test/**/*.{ts,tsx}'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-object-literal-type-assertion': 'off',
        'dot-notation': 'off',
      },
    },
  ],
}
