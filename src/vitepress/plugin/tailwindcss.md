---
Date: 2025-07-15 11:20:37
LastEditTime: 2025-07-15 13:50:42
tags: ['Tailwindcss', 'VitePress']
---

# 配置 Tailwindcss V4

> [Tailwindcss 官网](https://tailwindcss.com)，整合 VitePress 与 Tailwindcss 4.0。


## 步骤

1. 进入[Tailwindcss Using Vite](https://tailwindcss.com/docs/installation/using-vite) 教程，按照对应的步骤执行
  > 由于我们使用了VitePress项目，所以无需再次创建项目

2. 执行安装 Tailwindcss 命令 `npm install tailwindcss @tailwindcss/vite`

3. 在VitePress的配置文件 `.vitepress/config.mts` 中进行配置

```typescript [config.mts]
import { defineConfig } from 'vitepress';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  ...
  vite: {
    plugins: [
      tailwindcss(),
    ]
  },
  ...
});
```

4. 在VitePress的 **theme** 文件夹下新增 **tailwind.css** 文件 
```css [tailwind.css]
/** 文档说明：https://tailwindcss.com/docs/detecting-classes-in-source-files#setting-your-base-path */
/** 这里的 source('./components') 表示：Tailwind 要在 CSS 中源检测的基路径 */
@import "tailwindcss" source("./components");
```

5. 在VitePress的 **theme** 文件夹下的 **index.mts** 文件中使用 `import './tailwind.css';`

在完成上述操作后即完成了 **VitePress** 和 **Tailwindcss** 的整合