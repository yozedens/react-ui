import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from './Input'

describe('Input', () => {
  // ── 基础渲染 ──────────────────────────────────────────────────────────────

  it('渲染 input 元素', () => {
    render(<Input />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('placeholder 正常显示', () => {
    render(<Input placeholder="请输入内容" />)
    expect(screen.getByPlaceholderText('请输入内容')).toBeInTheDocument()
  })

  // ── label ─────────────────────────────────────────────────────────────────

  it('label 文字正确渲染，并与 input 关联', () => {
    render(<Input label="用户名" />)
    // getByLabelText 会验证 label 与 input 的 htmlFor 关联
    expect(screen.getByLabelText('用户名')).toBeInTheDocument()
  })

  it('required=true 时 input 有 aria-required 属性', () => {
    render(<Input label="邮箱" required />)
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-required', 'true')
  })

  // ── 错误状态 ──────────────────────────────────────────────────────────────

  it('errorMessage 传入时 aria-invalid=true 并展示错误文字', () => {
    render(<Input errorMessage="格式不正确" />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByRole('alert')).toHaveTextContent('格式不正确')
  })

  it('helperText 传入时正常展示（无 errorMessage）', () => {
    render(<Input helperText="请输入 6-20 位字符" />)
    expect(screen.getByText('请输入 6-20 位字符')).toBeInTheDocument()
  })

  it('errorMessage 优先级高于 helperText', () => {
    render(<Input helperText="帮助文字" errorMessage="错误提示" />)
    expect(screen.getByText('错误提示')).toBeInTheDocument()
    expect(screen.queryByText('帮助文字')).not.toBeInTheDocument()
  })

  // ── 用户交互 ──────────────────────────────────────────────────────────────

  it('用户输入时触发 onChange', async () => {
    const handleChange = vi.fn()
    render(<Input onChange={handleChange} />)
    await userEvent.type(screen.getByRole('textbox'), 'hello')
    expect(handleChange).toHaveBeenCalled()
  })

  it('disabled 状态下输入框不可编辑', () => {
    render(<Input disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  // ── 图标插槽 ──────────────────────────────────────────────────────────────

  it('prefixIcon 正常渲染', () => {
    render(<Input prefixIcon={<span data-testid="prefix" />} />)
    expect(screen.getByTestId('prefix')).toBeInTheDocument()
  })

  it('suffixIcon 正常渲染', () => {
    render(<Input suffixIcon={<span data-testid="suffix" />} />)
    expect(screen.getByTestId('suffix')).toBeInTheDocument()
  })

  // ── ref 转发 ──────────────────────────────────────────────────────────────

  it('通过 ref 可以获取 input DOM 元素', () => {
    const ref = { current: null as HTMLInputElement | null }
    render(<Input ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })
})
