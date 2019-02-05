const baseRules = {
    'no-plusplus': 'off',
    'default-case': 'off',
    'consistent-return': 'off',
    'class-methods-use-this': 'off',
    'comma-dangle': ['error', 'always-multiline'],
    'one-var': ['error', { initialized: 'never' }],
    'one-var-declaration-per-line': ['error', 'initializations'],
    'linebreak-style': ['error', 'unix'],
    'arrow-parens': ['error', 'as-needed', { requireForBlockBody: false }],
    'no-underscore-dangle': 0,
    'no-unused-expressions': 0,
    'array-callback-return': 0,
    'no-param-reassign': [ 'error', { 'props': false } ],
    'import/no-extraneous-dependencies': 0,
    'import/prefer-default-export': 0,
    'no-console': ['error', { allow: ["error"] }],
    'object-curly-newline': ['error', { 'consistent': true }],
    'newline-per-chained-call': 0,
};

module.exports = {
    "extends": "airbnb-base",
    "rules": baseRules,
    "env": {
        "mocha": true,
        "node": true
    }
};
