/**
 * @packageDocumentation https://github.com/antfu/eslint-config
 */

import eslintConfig from '@antfu/eslint-config'
import eslintConfigPrettier from 'eslint-config-prettier'

/**
 * 修改不符合规范的文件流程
 * 1.格式化程序
 * 2.提交git  style: 格式化
 * 3.提交自己的功能变更 feat: some feature
 */
export default eslintConfig(
  {
    ignores: ['**/dist/**', '**/node_modules/**', '**/.vscode/**', '**/coverage/**', 'README.md'],
    stylistic: {
      overrides: {
        'antfu/if-newline': 'off',
        'antfu/top-level-function': 'off',
        'ts/ban-ts-comment': 'off',
        'no-console': 'off',
        'no-restricted-globals': 'warn',
        'prefer-promise-reject-errors': 'off',
        'node/prefer-global/process': 'warn',
        'no-use-before-define': ['warn', { functions: false, classes: true, variables: true }],
        'style/brace-style': ['error', '1tbs', { allowSingleLine: true }],
        curly: ['error', 'all'],
        'style/nonblock-statement-body-position': ['error', 'below']
      }
    },
    vue: {
      overrides: {
        'vue/component-name-in-template-casing': ['error', 'kebab-case'], // 组件命名  a-b
        'vue/no-unused-refs': 'warn',
        'vue/prop-name-casing': 'warn',
        'vue/html-quotes': ['error', 'double', { avoidEscape: true }],
        'vue/attributes-order': ['warn', { alphabetical: true }], // 按字母排序
        'vue/max-attributes-per-line': [
          'warn',
          {
            // https://eslint.vuejs.org/rules/first-attribute-linebreak
            singleline: 88,
            multiline: {
              max: 1
            }
          }
        ],
        // 禁用这些规则，因为它们无法正确识别 Vue 组件使用情况
        // Vue 有专门的 vue/no-unused-components 规则来处理组件使用检测
        'unused-imports/no-unused-imports': 'off',
        'ts/no-unused-vars': 'off',
        // 关闭链式调用格式检查，避免与 prettier 冲突
        'antfu/consistent-chaining': 'off',
        // 允许函数在定义前使用，但变量、类等仍需先定义后使用
        '@typescript-eslint/no-use-before-define': [
          'warn',
          { functions: false, classes: true, variables: true, enums: true, typedefs: true }
        ]
      }
    },
    javascript: {
      overrides: {
        'no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            caughtErrorsIgnorePattern: '^_'
          }
        ],
        'unused-imports/no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            caughtErrorsIgnorePattern: '^_'
          }
        ]
      }
    },
    typescript: {
      overrides: {
        'unused-imports/no-unused-vars': [
          'warn',
          {
            caughtErrorsIgnorePattern: '^_'
          }
        ],
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            caughtErrorsIgnorePattern: '^_'
          }
        ],
        '@typescript-eslint/no-use-before-define': [
          'warn',
          { functions: false, classes: true, variables: true, enums: true, typedefs: true }
        ]
      }
    },
    lessOpinionated: false
  },
  // 使用eslint-config-prettier自动禁用与Prettier冲突的规则
  eslintConfigPrettier
)
