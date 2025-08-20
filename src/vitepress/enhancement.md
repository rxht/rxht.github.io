---
Date: 2025-08-20 21:07:49
LastEditTime: 2025-08-20 21:30:29
description: VitePress 的基本使用与定制技巧，涵盖项目初始化、汉化配置、图标引入、自定义主题等内容，旨在利用 VitePress 构建美观、高效的静态站点。
tags:
  - VitePress
---

# VitePress 优化和配置

## 使用 pnpm 代替 npm

使用 pnpm 可以提高依赖的按照速度、减少硬盘的占用空间。

```shell
$ npm install -g pnpm # 安装 pnpm
$ pnpm install  # 初始化完 VitePress 项目后使用 pnpm install 进行项目依赖安装
```

## VitePress 汉化

```typescript [.vitepress\config.mts]
import { defineConfig } from "vitepress";
// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: "zh-CN",
  ...
});
```

## 图片懒加载

```typescript [.vitepress\config.mts]
import { defineConfig } from "vitepress";
// https://vitepress.dev/reference/site-config
export default defineConfig({
  markdown: {
    image: {
      lazyLoading: true  // 所有图片自动懒加载
    }
  },
  ...
});
```

## 组件按需加载

在 md 文件中引入组件时可使用按需加载。

```markdown [*.md]
# 标题

<script setup>
import { defineAsyncComponent } from 'vue'
const HeavyChart = defineAsyncComponent(() => import('../components/xxx.vue'))
</script>

<HeavyChart />
```

## 代码切割

```typescript [.vitepress\config.mts]
import { defineConfig } from "vitepress";
// https://vitepress.dev/reference/site-config
export default defineConfig({
   manualChunks: (id) => {
    // 1. 分离搜索索引文件
    if (id.includes('localSearchIndex')) {
      return 'search-index'
    }
    // 4. 分离主题组件
    if (id.includes('.vitepress/theme')) {
      return 'theme-components'
    }
  },
  ...
});
```

## 禁用暗黑模式切换功能

```typescript [.vitepress\config.mts]
import { defineConfig } from "vitepress";
// https://vitepress.dev/reference/site-config
export default defineConfig({
  appearance: false,
  ...
});
```

## CSS 优化

```typescript [.vitepress\config.mts]
import { defineConfig } from "vitepress";
// https://vitepress.dev/reference/site-config
export default defineConfig({
  vite: {
    build: {
      cssCodeSplit: true,  // CSS 分离
      cssMinify: true,  // CSS 压缩
    }
  },
  ...
});
```

## 开启 Gzip 压缩

需要额外下载插件 `pnpm i -D vite-plugin-compression`。

```typescript [.vitepress\config.mts]
import { defineConfig } from "vitepress";
import viteCompression from 'vite-plugin-compression';
// https://vitepress.dev/reference/site-config
export default defineConfig({
  vite: {
    plugins: [
      viteCompression(),
    ],
  },
  ...
});
```
