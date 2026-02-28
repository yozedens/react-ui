/// <reference types="vite/client" />

// 为 CSS Modules（*.module.css）提供类型声明
// 使得 `import styles from './Foo.module.css'` 可以正确推断为 Record<string, string>
declare module '*.module.css' {
  const classes: Record<string, string>
  export default classes
}
