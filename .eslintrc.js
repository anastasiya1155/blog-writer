module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  extends: ['plugin:react/recommended', 'prettier'],
  globals: {
    Atomics: 'readonly',
    process: true,
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: ['react', 'prettier'],
  rules: {
    'arrow-parens': 0,
    'react/state-in-constructor': 0,
    'react/prefer-stateless-function': 0,
    'react/react-in-jsx-scope': 0,
    'react/prop-types': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all',
        printWidth: 100,
      },
    ],
  },
};
