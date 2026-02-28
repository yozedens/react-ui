import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

// 组件元数据：定义组件在 Storybook 中的分类和文档
const meta = {
  title: 'Components/Button',
  component: Button,
  // 自动为所有 Story 添加 Controls 和 Actions 支持
  parameters: { layout: 'centered', docs: { description: { component: '通用按钮组件，支持多种风格、尺寸与状态。' } } },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', description: '按钮风格变体' },
    size: { control: 'radio', description: '按钮尺寸' },
    loading: { control: 'boolean', description: '是否处于加载状态' },
    disabled: { control: 'boolean', description: '是否禁用' },
    fullWidth: { control: 'boolean', description: '是否撑满父容器' },
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// ── 各种变体 ──────────────────────────────────────────────────────────────

export const Primary: Story = { args: { children: 'Primary 按钮', variant: 'primary' } }

export const Secondary: Story = { args: { children: 'Secondary 按钮', variant: 'secondary' } }

export const Outline: Story = { args: { children: 'Outline 按钮', variant: 'outline' } }

export const Ghost: Story = { args: { children: 'Ghost 按钮', variant: 'ghost' } }

export const Danger: Story = { args: { children: 'Danger 按钮', variant: 'danger' } }

// ── 尺寸 ──────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button size="sm">小号 sm</Button>
      <Button size="md">中号 md</Button>
      <Button size="lg">大号 lg</Button>
    </div>
  ),
}

// ── 状态 ──────────────────────────────────────────────────────────────────

export const Loading: Story = { args: { children: '提交中...', loading: true } }

export const Disabled: Story = { args: { children: '不可用', disabled: true } }

// ── 带图标 ────────────────────────────────────────────────────────────────

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

export const WithIcon: Story = {
  args: { children: '搜索', leftIcon: <SearchIcon /> },
}
