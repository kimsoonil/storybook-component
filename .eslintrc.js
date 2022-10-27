module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './jsconfig.json',
    requireConfigFile: false
  },
  plugins: ['react', 'react-hooks', 'prettier'],
  rules: {
    // More rules
    'linebreak-style': 0,
    'prefer-const': 'error',
    'no-var': 'error',
    'no-console': 'off',
    'comma-dangle': ['error', 'never'],
    // React
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/prop-types': 'off',
    'react/button-has-type': 'off',
    'prefer-promise-reject-errors': 'off',
    'react/jsx-equals-spacing': ['error', 'never'],
    'react/jsx-no-duplicate-props': ['error', { ignoreCase: true }],
    'react/jsx-no-undef': 'error',
    'react/jsx-pascal-case': [
      'error',
      {
        allowAllCaps: true,
        ignore: []
      }
    ],
    'no-param-reassign': 0,
    'react/jsx-tag-spacing': ['error', { beforeSelfClosing: 'always' }],
    'react/jsx-indent-props': ['error', 2],
    'react/no-deprecated': 'error',
    'react/no-direct-mutation-state': 'error',
    'react/no-is-mounted': 'error',
    'react/react-in-jsx-scope': 'error',
    'react/require-render-return': 'error',
    'react/sort-comp': 'error',
    'react/no-unknown-property': [2, { ignore: ['inputMode'] }],
    'react-hooks/rules-of-hooks': 'error',
    'react/jsx-filename-extension': [0],
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['webpack.config.js', 'html.webpack.config.js']
      }
    ],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto'
      }
    ]
  },
  settings: {
    react: {
      createClass: 'createReactClass',
      pragma: 'React', // Pragma to use, default to "React"
      version: '18.2.0' // React version, default to the latest React stable release
    },
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  }
};
