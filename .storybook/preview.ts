import type { Preview } from '@storybook/react'

const preview: Preview = {
  parameters: {
    controls: {
      // 按字母排序 Controls 面板中的 props
      sort: 'alpha',
      matchers: {
        // 含 color/Color 的 prop 自动识别为颜色选择器
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'gray', value: '#f3f4f6' },
        { name: 'dark', value: '#1f2937' },
      ],
    },
  },
}

export default preview
