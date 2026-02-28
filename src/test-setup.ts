// 扩展 vitest 的 expect 断言，支持 @testing-library/jest-dom 的 DOM 匹配器
// 例如：expect(el).toBeInTheDocument()、expect(el).toHaveClass('foo')
import '@testing-library/jest-dom'
