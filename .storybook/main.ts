import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  // 扫描 src 下所有 *.stories.tsx / *.stories.ts 文件
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials', // 包含 Controls、Actions、Viewport 等
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    // 自动从组件 JSDoc 注释生成文档
    autodocs: 'tag',
  },
}

export default config
