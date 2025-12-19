---
Date: 2025-07-15 11:20:37
LastEditTime: 2025-07-25 21:53:58
tags: ["Tailwindcss", "VitePress"]
---

# 配置 Tailwindcss V4

> [Tailwindcss 官网](https://tailwindcss.com)，整合 VitePress 与 Tailwindcss 4.0。

## 步骤

1. 进入[Tailwindcss Using Vite](https://tailwindcss.com/docs/installation/using-vite) 教程，按照对应的步骤执行

   > 由于我们使用了 VitePress 项目，所以无需再次创建项目

2. 执行安装 Tailwindcss 命令 `npm install tailwindcss @tailwindcss/vite`

3. 在 VitePress 的配置文件 `.vitepress/config.mts` 中进行配置

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

4. 在 VitePress 的 **theme** 文件夹下新增 **tailwind.css** 文件

```css [tailwind.css]
/** 文档说明：https://tailwindcss.com/docs/detecting-classes-in-source-files#setting-your-base-path */
@import "tailwindcss";
@source "./components/**/*.{vue,md}";
@source "../../src/**/*.{vue,md}";
```

5. 在 VitePress 的 **theme** 文件夹下的 **index.mts** 文件中使用 `import './tailwind.css';`

在完成上述操作后即完成了 **VitePress** 和 **Tailwindcss** 的整合

> [!TIP] VSCODE 错误提示
> 如果配置完 tailwind.css 后发现 vscode 不支持@source 的警告提示，则可以在 vscode 的配置文件中进行如下配置。
>
> ```json [.vscode/setting.json]
> "files.associations": {
>    "*.css": "tailwindcss"
> }
>
> ```
