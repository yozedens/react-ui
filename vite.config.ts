// 从 vitest/config 导入 defineConfig，使 test 字段有完整的类型支持
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    react(),
    // 自动生成 .d.ts 类型声明文件
    dts({
      include: ['src'],
      exclude: ['src/**/*.stories.tsx', 'src/**/*.test.tsx'],
      // 将所有类型合并为单一入口文件
      rollupTypes: true,
    }),
  ],

  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },

  build: {
    // lib 模式：将源码打包为可复用的库
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ReactUI',
      // 同时输出 ESM（.js）和 CJS（.cjs）两种格式
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs'),
    },
    rollupOptions: {
      // 声明外部依赖，不打包进产物（由使用方自行安装）
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        // 在 UMD/IIFE 模式下全局变量名的映射（此处为兼容性保留）
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
        },
        // 保持 CSS 模块的类名稳定
        assetFileNames: 'style[extname]',
      },
    },
    // 生成 sourcemap，方便使用方调试
    sourcemap: true,
    // 清空 dist 目录后重新构建
    emptyOutDir: true,
  },

  test: {
    // 使用 jsdom 模拟浏览器环境
    environment: 'jsdom',
    // 开启全局 API（describe/it/expect），需配合 tsconfig.test.json 的类型声明
    globals: true,
    setupFiles: './src/test-setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/*.stories.tsx', 'src/test-setup.ts', 'src/index.ts'],
    },
  },
})
