import { InputHTMLAttributes, ReactNode, forwardRef, useId } from 'react'
import styles from './Input.module.css'

export type InputSize = 'sm' | 'md' | 'lg'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** 输入框尺寸，默认 md */
  size?: InputSize
  /** 显示在上方的标签文字 */
  label?: string
  /** 是否必填（在 label 后显示红色 *） */
  required?: boolean
  /** 错误提示信息（传入后输入框变为错误状态） */
  errorMessage?: string
  /** 帮助提示文字（与 errorMessage 互斥，优先展示 errorMessage） */
  helperText?: string
  /** 前置图标（建议 16×16 SVG） */
  prefixIcon?: ReactNode
  /** 后置图标（建议 16×16 SVG） */
  suffixIcon?: ReactNode
}

/**
 * Input 组件
 *
 * 包含 label、帮助文本、错误状态、前后置图标，并与 htmlFor/aria-describedby 无障碍关联。
 * 使用 forwardRef 以便父组件可以访问底层 <input> DOM。
 *
 * @example
 * <Input
 *   label="用户名"
 *   required
 *   placeholder="请输入用户名"
 *   errorMessage={errors.username?.message}
 * />
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = 'md',
      label,
      required,
      errorMessage,
      helperText,
      prefixIcon,
      suffixIcon,
      className,
      id: propId,
      ...rest
    },
    ref,
  ) => {
    // 自动生成唯一 id，保证 label 与 input 的无障碍关联
    const autoId = useId()
    const id = propId ?? autoId
    const descId = `${id}-desc`

    const wrapperClassName = [
      styles.wrapper,
      styles[`size-${size}`],
      errorMessage ? styles.error : '',
    ]
      .filter(Boolean)
      .join(' ')

    const inputWrapperClassName = [
      styles.inputWrapper,
      prefixIcon ? styles.hasPrefix : '',
      suffixIcon ? styles.hasSuffix : '',
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <div className={wrapperClassName}>
        {/* 标签区域 */}
        {label && (
          <label className={styles.label} htmlFor={id}>
            {label}
            {required && (
              <span className={styles.required} aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        {/* 输入框 + 图标 */}
        <div className={inputWrapperClassName}>
          {prefixIcon && (
            <span className={styles.prefixIcon} aria-hidden="true">
              {prefixIcon}
            </span>
          )}

          <input
            ref={ref}
            id={id}
            className={[styles.input, className ?? ''].filter(Boolean).join(' ')}
            aria-required={required}
            aria-invalid={!!errorMessage}
            aria-describedby={errorMessage || helperText ? descId : undefined}
            {...rest}
          />

          {suffixIcon && (
            <span className={styles.suffixIcon} aria-hidden="true">
              {suffixIcon}
            </span>
          )}
        </div>

        {/* 错误/帮助文字，优先展示错误信息 */}
        {(errorMessage || helperText) && (
          <span
            id={descId}
            className={errorMessage ? styles.errorMessage : styles.helperText}
            role={errorMessage ? 'alert' : undefined}
          >
            {errorMessage ?? helperText}
          </span>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'
