module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/recommended',
    'prettier/vue',
  ],
  rules: {
    'no-console': ['error', { allow: ['debug'] }],
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'sort-imports': ['error', {
      'ignoreDeclarationSort': true,
    }],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
