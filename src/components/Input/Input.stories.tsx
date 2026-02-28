import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: { layout: 'centered', docs: { description: { component: '带 label、错误提示与图标支持的通用输入框组件。' } } },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', description: '输入框尺寸' },
    label: { control: 'text', description: '标签文字' },
    required: { control: 'boolean', description: '是否必填' },
    disabled: { control: 'boolean', description: '是否禁用' },
    errorMessage: { control: 'text', description: '错误提示信息' },
    helperText: { control: 'text', description: '帮助提示文字' },
    placeholder: { control: 'text', description: '占位符' },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { label: '用户名', placeholder: '请输入用户名' },
}

export const Required: Story = {
  args: { label: '邮箱', required: true, placeholder: 'user@example.com' },
}

export const WithHelperText: Story = {
  args: { label: '密码', helperText: '密码长度 8-20 位，包含字母和数字', type: 'password' },
}

export const WithError: Story = {
  args: { label: '邮箱', errorMessage: '邮箱格式不正确', defaultValue: 'invalid-email' },
}

export const Disabled: Story = {
  args: { label: '只读字段', disabled: true, defaultValue: 'admin@example.com' },
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 300 }}>
      <Input size="sm" placeholder="小号 sm" />
      <Input size="md" placeholder="中号 md（默认）" />
      <Input size="lg" placeholder="大号 lg" />
    </div>
  ),
}

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

export const WithPrefixIcon: Story = {
  args: { placeholder: '搜索...', prefixIcon: <SearchIcon /> },
}
