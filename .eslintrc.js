module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  extends: 'airbnb',

  'env': {
    'jest': true,
    'browser': true,
    'es6': true,
  },

  // allow enzyme global use
  "globals": {
    "shallow": true,
    "render": true,
    "mount": true
  },

  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': './dev/webpack.conf.js',
      }
    }
  },
  // add your custom rules here
  'rules': {
    'react/forbid-prop-types': 0,

    "anchor-is-valid": 1,
    "jsx-a11y/anchor-is-valid": 1,
    "label-has-for": 1,
    "jsx-a11y/label-has-for": 1,
    // The react/jsx-space-before-closing rule is deprecated.
    // Please use the react/jsx-tag-spacing rule with the "beforeSelfClosing" option instead.
    'react/jsx-space-before-closing': 0,
    'react/jsx-tag-spacing': 1,
    'react/no-array-index-key': 0,

    'import/extensions': ['error', 'always', {
      'js': 'never',
      'jsx': 'never',
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-underscore-dangle': 0,
    'no-param-reassign': ["error",
      { "props": false }],
    'linebreak-style': 0,
    'jsx-a11y/img-has-alt': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/href-no-hash': 0,

    // Allow dev dependencies to be imported into tests
    "import/no-extraneous-dependencies": ["error",
      { "devDependencies": ["**/*.spec.js", "**/*.spec.jsx"]}],
  }
};
