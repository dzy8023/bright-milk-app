import js from '@eslint/js'
import globals from 'globals'
import pluginPrettier from 'eslint-plugin-prettier'
import configPrettier from 'eslint-config-prettier'
import pluginTypeScript from '@typescript-eslint/eslint-plugin'
import parserTypeScript from '@typescript-eslint/parser'
import pluginVue from 'eslint-plugin-vue'
import parserVue from 'vue-eslint-parser'

// 定义 ESLint 配置
export default [
  // 通用 JavaScript/TypeScript 配置
  {
    ...js.configs.recommended,
    ignores: [
      '/dist',
      '/public',
      '/node_modules',
      '**/*.min.js',
      '**/*.config.mjs',
      '**/*.tsbuildinfo',
      '/src/manifest.json',
    ],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      ...configPrettier.rules,
      ...pluginPrettier.configs.recommended.rules,
      'no-debugger': 'off', // 允许使用 debugger
      'prettier/prettier': [
        'warn',
        {
          singleQuote: true,
          semi: false,
          printWidth: 100,
          trailingComma: 'all',
          endOfLine: 'auto',
        },
      ],
    },
  },

  // TypeScript 配置
  {
    files: ['**/*.?([cm])ts'],
    languageOptions: {
      parser: parserTypeScript,
      parserOptions: {
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': pluginTypeScript,
    },
    rules: {
      ...pluginTypeScript.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': 'off', // 允许使用 any
      '@typescript-eslint/no-empty-function': 'off', // 允许空函数
      '@typescript-eslint/no-empty-object-type': 'off', // 允许空对象类型
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { disallowTypeAnnotations: false, fixStyle: 'inline-type-imports' },
      ], // 统一类型导入风格
    },
  },

  // TypeScript 声明文件的特殊配置
  {
    files: ['**/*.d.ts'],
    rules: {
      'eslint-comments/no-unlimited-disable': 'off', // 关闭 eslint 注释相关规则
      'unused-imports/no-unused-vars': 'off', // 忽略未使用的导入
    },
  },

  // JavaScript (CommonJS) 配置
  {
    files: ['**/*.?([cm])js'],
    rules: {
      '@typescript-eslint/no-var-requires': 'off', // 允许 require
    },
  },

  // Vue 文件配置
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: parserVue,
      parserOptions: {
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
      },
    },
    plugins: {
      vue: pluginVue,
    },
    processor: pluginVue.processors['.vue'],
    rules: {
      ...pluginVue.configs['vue3-recommended'].rules,
      'vue/no-v-html': 'off', // 允许 v-html
      'vue/require-default-prop': 'off', // 允许没有默认值的 prop
      'vue/multi-word-component-names': 'off', // 关闭组件名称多词要求
      'vue/html-self-closing': [
        'error',
        {
          html: { void: 'always', normal: 'always', component: 'always' },
          svg: 'always',
          math: 'always',
        },
      ],
    },
  },
]
