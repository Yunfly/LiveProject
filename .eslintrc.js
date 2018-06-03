module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier'],
  env: {
    browser: true,
    node: true,
    es6: true,
    mocha: true,
    jest: true,
    jasmine: true,
  },
  rules: {
    "generator-star-spacing": [0],
    "consistent-return": [0],
    "react/forbid-prop-types": [0],
    "react/jsx-filename-extension": [1, { "extensions": [".js"] }],
    "global-require": [1],
    "import/prefer-default-export": [0],
    "react/jsx-no-bind": [1, {
      "ignoreRefs": true,
      "allowArrowFunctions": true,
      "allowFunctions": false,
      "allowBind": true
    }],
    "react/prop-types": [0],
    "react/prefer-stateless-function": [0],
    "no-else-return": [0],
    "no-restricted-syntax": [0],
    "import/no-extraneous-dependencies": [0],
    "no-use-before-define": [0],
    "jsx-a11y/no-static-element-interactions": [0],
    "jsx-a11y/no-noninteractive-element-interactions": [0],
    "jsx-a11y/click-events-have-key-events": [0],
    "jsx-a11y/anchor-is-valid": [0],
    "no-nested-ternary": [0],
    "arrow-body-style": [0],
    "import/extensions": [0],
    "no-bitwise": [0],
    "no-cond-assign": [0],
    "import/no-unresolved": [0],
    "comma-dangle": ["error", {
      "arrays": "only-multiline",
      "objects": "only-multiline",
      "imports": "only-multiline",
      "exports": "only-multiline",
      "functions": "ignore"
    }],
    "object-curly-newline": [0],
    "function-paren-newline": [0],
    "no-restricted-globals": [0],
    "require-yield": [1],
    "quotes": [0],
    "func-names": [0],
    "padded-blocks": [0],
    "no-trailing-spaces": [0],
    "indent": [1, 2],
    "spaced-comment": [0],
    "quote-props": [0],
    "prefer-arrow-callback": [0],
    "semi": [0],
    "eol-last": [0],
    "no-unused-vars": ["error", { "vars": "all", "args": "none", "ignoreRestSiblings": false }],
    "one-var": [0],
    "camelcase": [0],
    "no-param-reassign": [0],
    "no-underscore-dangle": [0],
    "react/require-default-props": [0],
    "max-len": [0],
    "prefer-destructuring": [0],
    "linebreak-style": [0],
    "arrow-parens": [0],
    "guard-for-in": [0],
    "no-console": [0]
  },
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
  },
  settings: {
    polyfills: ['fetch', 'promises'],
  },
};
