module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'typeorm-typescript',
  ],
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json'
  },
  rules: {
    'typeorm-typescript/enforce-column-types': 'error',
    'typeorm-typescript/enforce-relation-types': 'error',
    'import/order': [
      'error',
      {
        'groups': [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
          'type'
        ]
      }
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        'selector': 'interface',
        'format': [
          'PascalCase'
        ],
        'prefix': [
          'I'
        ],
        'filter': {
          'regex': 'VM$',
          'match': false
        }
      },
      {
        'selector': 'typeAlias',
        'format': [
          'PascalCase'
        ],
        'prefix': [
          'T'
        ]
      },
      {
        'selector': 'variable',
        'format': [
          'camelCase',
          'PascalCase',
          'UPPER_CASE'
        ]
      },
      {
        'selector': 'variable',
        'modifiers': ['const', 'exported', 'unused'],
        'types': ['boolean'],
        'format': ['PascalCase'],
        'prefix': ['is', 'should', 'has', 'can', 'did', 'will']
      }
    ],
    'padding-line-between-statements': [
      'error',
      {
        'blankLine': 'always',
        'prev': [
          'multiline-const',
          'multiline-let'
        ],
        'next': '*'
      },
      {
        'blankLine': 'always',
        'prev': '*',
        'next': [
          'multiline-const',
          'multiline-let'
        ]
      },
      {
        'blankLine': 'never',
        'prev': [
          'singleline-let',
          'singleline-const'
        ],
        'next': [
          'singleline-let',
          'singleline-const'
        ]
      },
      {
        'blankLine': 'always',
        'prev': '*',
        'next': 'function'
      }
    ],
    'newline-before-return': 'error',
    '@typescript-eslint/space-before-function-paren': ['error', 'always'],
    '@typescript-eslint/semi': [
      'error',
      'always'
    ],
    'curly': [
      'error',
      'multi-line'
    ],
    'import/prefer-default-export': 'off',
    '@typescript-eslint/indent': 'off',
    'no-console': 'error',
    'object-curly-newline': [
      'error',
      {
        'consistent': true
      }
    ],
    '@typescript-eslint/no-use-before-define': 'error',
    'no-await-in-loop': 'off',
    'no-restricted-syntax': 'off',
    'import/no-cycle': 'error',
    '@typescript-eslint/no-unused-expressions': ['error', { 'allowShortCircuit': true }],
    'no-nested-ternary': 'error',
    'max-len': [
      'error',
      {
        'code': 100
      }
    ],
    'prefer-spread': 'off',
    'import/no-extraneous-dependencies': 'error',
    '@typescript-eslint/no-shadow': 'error',
    'arrow-parens': [
      'error',
      'as-needed'
    ],
    'no-param-reassign': 'error',
    'no-underscore-dangle': 'off',
    'no-prototype-builtins': 'off',
    'prefer-destructuring': 'off',
    'import/no-mutable-exports': 'error',
    'no-restricted-exports': ['error', { 'restrictedNamedExports': ['off'] }],
    'arrow-body-style': ['error', 'as-needed'],
    'no-alert': 'off',
    'max-classes-per-file': [
      'error',
      1
    ],
    '@typescript-eslint/no-useless-constructor': 'off',
    'class-methods-use-this': 'error',
    'no-plusplus': [
      'error',
      {
        'allowForLoopAfterthoughts': true
      }
    ],
    'no-multi-assign': 'error',
    'consistent-return': 'off',
    'func-names': 'off',
    '@typescript-eslint/lines-between-class-members': ['error', 'always', { 'exceptAfterSingleLine': true }],
    'eol-last': ['error', 'always'],
  }
};
