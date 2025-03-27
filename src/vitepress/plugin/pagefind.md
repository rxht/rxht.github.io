---
Date: 2025-03-18 22:10:44
LastEditTime: 2025-03-27 22:00:43
title: 离线全文搜索
---

# 配置 vitepress-plugin-pagefind

> 基于 pagefind 实现的离线全文搜索

## 最终效果如下

![pagefind](./assets/pagefind.png)

## 下载依赖
::: code-group

```sh [npm]
$ npm i vitepress-plugin-pagefind pagefind
```

```sh [pnpm]
$ pnpm add vitepress-plugin-pagefind pagefind
```

```sh [yarn]
$ yarn add vitepress-plugin-pagefind pagefind
```

:::

## 引入插件

文件路径 `.vitepress/config.mts`

```typescript
import { defineConfig } from 'vitepress'
import { pagefindPlugin } from 'vitepress-plugin-pagefind'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  vite: {
    plugins: [pagefindPlugin()],
  }
})
```

## 中文搜索优化

文件路径 `.vitepress/config.mts`

```typescript{8-15}
import { defineConfig } from 'vitepress'
import { pagefindPlugin } from 'vitepress-plugin-pagefind'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  vite: {
    plugins: [pagefindPlugin({ 
        customSearchQuery: (input: string) => {
            const segmenter = new Intl.Segmenter('zh-CN', { granularity: 'word' })
            const result: string[] = []
            for (const it of segmenter.segment(input)) {
                it.isWordLike && result.push(it.segment)
            }
            return result.join(' ');
        }
    })],
  }
})
```

## 其他配置

文件路径 `.vitepress/config.mts`

```typescript{8-13,22-24}
import { defineConfig } from 'vitepress'
import { chineseSearchOptimize as customSearchQuery, pagefindPlugin } from 'vitepress-plugin-pagefind'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  vite: {
    plugins: [pagefindPlugin({
        btnPlaceholder: '搜索',
        placeholder: '搜索文档',
        emptyText: '空空如也',
        heading: '共: {{searchResult}} 条结果',
        excludeSelector: ['img', 'a.header-anchor'],
        forceLanguage: 'zh-cn',
        customSearchQuery: (input: string) => {
            const segmenter = new Intl.Segmenter('zh-CN', { granularity: 'word' })
            const result: string[] = []
            for (const it of segmenter.segment(input)) {
                it.isWordLike && result.push(it.segment)
            }
            return result.join(' ');
        },
        filter(searchItem, idx, originArray) {
            return !searchItem.route.includes('404')
        }
    })],
  }
})
```

## 编译时控制台输出

```sh:no-line-numbers
=== pagefind: https://pagefind.app/ ===
npx pagefind --site "D:/Workspace/wiki/.vitepress/dist" --exclude-selectors "div.aside, a.header-anchor, img" --force-language en


Running Pagefind v1.3.0 (Extended)
Running from: "D:\\Workspace\\wiki"
Source:       ".vitepress/dist"
Output:       ".vitepress/dist\\pagefind"

[Walking source directory]
Found 35 files matching **/*.{html}

[Parsing files]
Found a data-pagefind-body element on the site.
↳ Ignoring pages without this tag.

[Reading languages]
Discovered 1 language: zh-cn

[Building search indexes]
Total:
  Indexed 1 language
  Indexed 33 pages
  Indexed 2218 words
  Indexed 0 filters
  Indexed 0 sorts

Finished in 0.134 seconds
✓ generating pagefind Indexing..
```
