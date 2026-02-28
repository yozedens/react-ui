import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react'
import styles from './Button.module.css'

// 组件支持的尺寸：sm(小) / md(中，默认) / lg(大)
export type ButtonSize = 'sm' | 'md' | 'lg'

// 组件支持的风格变体
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 按钮风格变体，默认 primary */
  variant?: ButtonVariant
  /** 按钮尺寸，默认 md */
  size?: ButtonSize
  /** 是否处于加载状态 */
  loading?: boolean
  /** 是否撑满父容器宽度 */
  fullWidth?: boolean
  /** 左侧图标（任意 ReactNode，建议使用 SVG 图标） */
  leftIcon?: ReactNode
  /** 右侧图标 */
  rightIcon?: ReactNode
}

/**
 * Button 组件
 *
 * 支持 5 种视觉风格 × 3 种尺寸 × loading/disabled 状态。
 * 使用 forwardRef 以便父组件可以获取底层 <button> DOM 引用。
 *
 * @example
 * <Button variant="primary" size="md" onClick={handleClick}>
 *   提交
 * </Button>
 *
 * @example 加载状态
 * <Button loading leftIcon={<SaveIcon />}>保存</Button>
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      children,
      className,
      disabled,
      ...rest
    },
    ref,
  ) => {
    const isDisabled = disabled || loading

    // 拼接 CSS Modules 类名
    const classNames = [
      styles.btn,
      styles[`size-${size}`],
      styles[`variant-${variant}`],
      loading ? styles.loading : '',
      fullWidth ? styles.fullWidth : '',
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <button ref={ref} className={classNames} disabled={isDisabled} aria-busy={loading} {...rest}>
        {/* 加载中时用 spinner 替换左侧图标 */}
        {loading ? <span className={styles.spinner} aria-hidden="true" /> : leftIcon}
        {children}
        {!loading && rightIcon}
      </button>
    )
  },
)

Button.displayName = 'Button'
