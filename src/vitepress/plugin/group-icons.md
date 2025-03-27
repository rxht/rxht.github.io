---
Date: 2025-03-18 22:10:44
LastEditTime: 2025-03-27 22:00:12
title: 分组代码块图标
---

# 配置 vitepress-plugin-group-icons

> 分组代码块提供不同的图标样式

## 下载依赖
::: code-group

```sh [npm]
$ npm i vitepress-plugin-group-icons
```

```sh [pnpm]
$ pnpm i vitepress-plugin-group-icons
```

```sh [yarn]
$ yarn add vitepress-plugin-group-icons
```

```sh [bun]
$ bun add vitepress-plugin-group-icons
```

:::

## 使用插件

```typescript{2,7,12} [.vitepress/config.ts]
import { defineConfig } from 'vitepress'
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'

export default defineConfig({
  markdown: {
    config(md) {
      md.use(groupIconMdPlugin)
    },
  },
  vite: {
    plugins: [
      groupIconVitePlugin()
    ],
  }
})
```

```typescript{2} [.vitepress/theme/index.ts]
import Theme from 'vitepress/theme'
import 'virtual:group-icons.css'

export default Theme
```

## 内置图标

1. <b>Package Managers</b>: [npm, yarn, pnpm, bun, deno ]
2. <b>Frameworks</b>: [Vue, Svelte, Angular, React, Solid, Astro, Next, Nuxt]
3. <b>Bundlers</b>: [Rollup, Webpack, Vite, esbuild]
4. <b>Configuration Files</b>: [package.json, tsconfig.json, eslint.config.js, .gitignore, .env, .vscode/settings.json, tailwind.config.js, uno.config.ts, .oxlintrc.json]
5. <b>Filename Extension</b>: [foo.ts, foo.js, foo.md, foo.py, foo.yml, foo.html, foo.css, foo.scss, foo.ico]


## 自定义图标

> 你可以从 [iconify](https://icon-sets.iconify.design/), 本地 svg 文件或 url 中添加任何图标

```ts {2,13-19} [.vitepress/config.ts]
import { defineConfig } from 'vitepress'
import { groupIconMdPlugin, groupIconVitePlugin, localIconLoader } from 'vitepress-plugin-group-icons'

export default defineConfig({
  markdown: {
    config(md) {
      md.use(groupIconMdPlugin)
    },
  },
  vite: {
    plugins: [
      groupIconVitePlugin({
        customIcon: {
          '.mdx': 'vscode-icons:file-type-light-mdx',
          'babel': 'vscode-icons:file-type-babel',
          'vitepress': localIconLoader(import.meta.url, '../assets/vitepress.svg'),
          'unplugin': 'https://unplugin.unjs.io/logo_light.svg',
        },
      })
    ],
  }
})
```
