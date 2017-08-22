// rule reference: http://eslint.org/docs/rules
// individual rule reference: http://eslint.org/docs/rules/NAME-OF-RULE
module.exports = {
  extends: 'airbnb-base',
  env: {
    es6: true,
    node: true,
  },
  rules: {
    strict: [0],
    'prefer-spread': [0],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
    'no-console': [0],
    'global-require': [0],
    'import/no-dynamic-require': [0],
  },
};
