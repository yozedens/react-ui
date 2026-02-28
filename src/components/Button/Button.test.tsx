import { describe, it, expect, vi } from 'vitest'
import type { ButtonSize } from './Button'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'

describe('Button', () => {
  // ── 渲染测试 ──────────────────────────────────────────────────────────────

  it('渲染子节点文字', () => {
    render(<Button>点击我</Button>)
    expect(screen.getByRole('button', { name: '点击我' })).toBeInTheDocument()
  })

  it('默认 variant 为 primary', () => {
    render(<Button>按钮</Button>)
    const btn = screen.getByRole('button')
    // 检查 className 包含 primary 样式标记（CSS Modules 会保留原始类名片段）
    expect(btn.className).toMatch(/variant-primary/)
  })

  // ── 尺寸变体 ──────────────────────────────────────────────────────────────

  it.each<ButtonSize>(['sm', 'md', 'lg'])('size=%s 时应用对应 className', (size) => {
    render(<Button size={size}>按钮</Button>)
    expect(screen.getByRole('button').className).toMatch(new RegExp(`size-${size}`))
  })

  // ── 事件交互 ──────────────────────────────────────────────────────────────

  it('点击时触发 onClick 回调', async () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>点击</Button>)
    await userEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledOnce()
  })

  it('disabled 状态下不触发 onClick', async () => {
    const handleClick = vi.fn()
    render(<Button disabled onClick={handleClick}>禁用</Button>)
    await userEvent.click(screen.getByRole('button'))
    expect(handleClick).not.toHaveBeenCalled()
  })

  // ── loading 状态 ──────────────────────────────────────────────────────────

  it('loading=true 时按钮被禁用且 aria-busy=true', () => {
    render(<Button loading>加载中</Button>)
    const btn = screen.getByRole('button')
    expect(btn).toBeDisabled()
    expect(btn).toHaveAttribute('aria-busy', 'true')
  })

  it('loading=true 时不触发 onClick', async () => {
    const handleClick = vi.fn()
    render(<Button loading onClick={handleClick}>加载</Button>)
    await userEvent.click(screen.getByRole('button'))
    expect(handleClick).not.toHaveBeenCalled()
  })

  // ── fullWidth ─────────────────────────────────────────────────────────────

  it('fullWidth=true 时应用 fullWidth 类名', () => {
    render(<Button fullWidth>全宽</Button>)
    expect(screen.getByRole('button').className).toMatch(/fullWidth/)
  })

  // ── 图标插槽 ──────────────────────────────────────────────────────────────

  it('传入 leftIcon 时正常渲染', () => {
    render(<Button leftIcon={<span data-testid="icon" />}>按钮</Button>)
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('loading=true 时隐藏 leftIcon，显示 spinner', () => {
    render(<Button loading leftIcon={<span data-testid="icon" />}>按钮</Button>)
    // leftIcon 被 spinner 替换，不在 DOM 中
    expect(screen.queryByTestId('icon')).not.toBeInTheDocument()
    // spinner 通过 CSS class 识别
    expect(screen.getByRole('button').querySelector('[class*="spinner"]')).not.toBeNull()
  })

  // ── 自定义 className ──────────────────────────────────────────────────────

  it('可以通过 className 追加自定义类名', () => {
    render(<Button className="custom-class">按钮</Button>)
    expect(screen.getByRole('button').className).toContain('custom-class')
  })

  // ── ref 转发 ──────────────────────────────────────────────────────────────

  it('通过 ref 可以获取 DOM 元素', () => {
    const ref = { current: null as HTMLButtonElement | null }
    render(<Button ref={ref}>按钮</Button>)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })
})
