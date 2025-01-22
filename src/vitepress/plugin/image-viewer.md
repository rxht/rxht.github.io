---
title: 图像查看器
---

# 配置 vitepress-plugin-image-viewer

> 基于 viewerjs 的 vitepress 图像查看器插件

## 下载依赖
::: code-group

```sh [npm]
$ npm i vitepress-plugin-image-viewer
```

```sh [pnpm]
$ pnpm add vitepress-plugin-image-viewer viewerjs
```

```sh [yarn]
$ yarn add vitepress-plugin-image-viewer
```

:::

## 使用插件

文件路径 `.vitepress/theme/index`

```typescript
import DefaultTheme from 'vitepress/theme';
import 'viewerjs/dist/viewer.min.css';
import imageViewer from 'vitepress-plugin-image-viewer';
import vImageViewer from 'vitepress-plugin-image-viewer/lib/vImageViewer.vue';
import { useRoute } from 'vitepress';

export default {
    ...DefaultTheme,
    enhanceApp(ctx) {
        DefaultTheme.enhanceApp(ctx);
        // Register global components, if you don't want to use it, you don't need to add it
        ctx.app.component('vImageViewer', vImageViewer);
        // ...
    },
    setup() {
        // Get route
        const route = useRoute();
        // Using
        imageViewer(route);
    }
};
```