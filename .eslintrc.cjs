/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  settings: {
    react: { version: 'detect' },
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:storybook/recommended',
    'prettier', // 必须放最后，关闭与 prettier 冲突的规则
  ],
  rules: {
    // 函数组件不需要显式声明返回类型（TypeScript 可以推断）
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    // 允许使用 _ 前缀的未使用变量（常用于解构忽略）
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    // 禁止使用 any（建议用 unknown 代替）
    '@typescript-eslint/no-explicit-any': 'warn',
  },
  ignorePatterns: ['dist', 'node_modules', 'storybook-static', 'coverage'],
}
