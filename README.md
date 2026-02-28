# @zdyumath/react-ui

生产级 React 组件库模板，基于 Vite + TypeScript + CSS Modules。

[![CI](https://github.com/yozedens/react-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/your-username/react-ui/actions)
[![npm version](https://img.shields.io/npm/v/@zdyumath/react-ui)](https://www.npmjs.com/package/@zdyumath/react-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## 安装

```bash
npm install @zdyumath/react-ui
# 或
pnpm add @zdyumath/react-ui
# 或
yarn add @zdyumath/react-ui
```

**前置依赖（peerDependencies）：** React ≥ 17

## 使用

```tsx
import { Button, Input } from '@zdyumath/react-ui'
import '@zdyumath/react-ui/styles'  // 引入全局样式

function App() {
  return (
    <>
      <Button variant="primary" onClick={() => alert('clicked')}>
        点击我
      </Button>

      <Input
        label="邮箱"
        required
        placeholder="user@example.com"
        helperText="我们不会分享你的邮箱"
      />
    </>
  )
}
```

## 组件文档

### Button

| Prop       | 类型                                              | 默认值      | 说明                     |
| ---------- | ------------------------------------------------- | ----------- | ------------------------ |
| variant    | `primary \| secondary \| outline \| ghost \| danger` | `primary`   | 按钮风格变体             |
| size       | `sm \| md \| lg`                                  | `md`        | 按钮尺寸                 |
| loading    | `boolean`                                         | `false`     | 加载状态（自动禁用）     |
| fullWidth  | `boolean`                                         | `false`     | 是否撑满父容器           |
| leftIcon   | `ReactNode`                                       | —           | 左侧图标                 |
| rightIcon  | `ReactNode`                                       | —           | 右侧图标                 |
| ...rest    | `ButtonHTMLAttributes`                            | —           | 透传给 `<button>` 的属性 |

### Input

| Prop         | 类型                | 默认值  | 说明                                 |
| ------------ | ------------------- | ------- | ------------------------------------ |
| size         | `sm \| md \| lg`    | `md`    | 输入框尺寸                           |
| label        | `string`            | —       | 标签文字                             |
| required     | `boolean`           | `false` | 是否必填                             |
| errorMessage | `string`            | —       | 错误提示（传入后变为错误状态）       |
| helperText   | `string`            | —       | 帮助提示（与 errorMessage 互斥）     |
| prefixIcon   | `ReactNode`         | —       | 前置图标                             |
| suffixIcon   | `ReactNode`         | —       | 后置图标                             |
| ...rest      | `InputHTMLAttributes` | —     | 透传给 `<input>` 的属性              |

## 开发

```bash
# 安装依赖
npm install

# 启动 Storybook 开发环境
npm run storybook

# 运行单元测试（watch 模式）
npm run test:watch

# 构建产物
npm run build

# 代码检查
npm run lint
```

## 发布到 npm

```bash
# 1. 更新 package.json 中的 version
npm version patch   # 0.1.0 → 0.1.1
npm version minor   # 0.1.0 → 0.2.0
npm version major   # 0.1.0 → 1.0.0

# 2. 推送 tag，GitHub Actions 自动发布
git push --follow-tags

# 3. 或手动发布
npm publish --access public
```

## 项目结构

```
.
├── src/
│   ├── components/
│   │   ├── Button/         # 按钮组件
│   │   │   ├── Button.tsx
│   │   │   ├── Button.module.css
│   │   │   ├── Button.test.tsx
│   │   │   ├── Button.stories.tsx
│   │   │   └── index.ts
│   │   ├── Input/          # 输入框组件（结构同上）
│   │   └── index.ts        # 统一导出入口
│   ├── index.ts            # 库入口
│   └── test-setup.ts       # 测试环境初始化
├── .storybook/             # Storybook 配置
├── .github/workflows/      # CI/CD 流水线
├── dist/                   # 构建产物（不提交 Git）
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## License

MIT
