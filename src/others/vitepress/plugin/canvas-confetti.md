---
Date: 2025-03-18 22:10:44
LastEditTime: 2026-07-28 10:36:12
description: 配置 canvas-confetti 插件，实现纸屑动画效果。
title: 配置 canvas-confetti
tags:
  - Vitepress
  - vue
  - 纸屑动画
  - 动画
---

# 配置 canvas-confetti

> 🎉 浏览器中的高性能五彩纸屑动画

## 下载依赖
::: code-group

```sh [npm]
$ npm i canvas-confetti
```

```sh [pnpm]
$ pnpm i canvas-confetti
```

```sh [yarn]
$ yarn add canvas-confetti
```

:::

## 使用插件

文件路径 `.vitepress/components/Confetti.vue`

```vue
<script setup lang="ts">
import confetti from "canvas-confetti";
/* 纸屑 */
confetti({ particleCount: 100, spread: 170, origin: { y: 0.6 } });
</script>
```

文件路径 `.vitepress/theme/index`

```typescript
// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme';

import Confetti from "./components/Confetti.vue";

export default {
    ...DefaultTheme,
    enhanceApp(ctx) {
        DefaultTheme.enhanceApp(ctx);
        // 五彩纸屑
        ctx.app.component("Confetti", Confetti);
    },
};
```


文件路径 `src/index.md`

```md
<ClientOnly>
  <Confetti />
</ClientOnly>
```
