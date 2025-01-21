---
title: 1.配置 VitePress
---

# 配置 VitePress

## 配置基础信息
```typescript
const nav: DefaultTheme.NavItem[] = [
  { text: "MolStar", link: "http://molstar.szbl.ac.cn/viewer/" },
]
const socialLinks: DefaultTheme.SocialLink[] = [
  { icon: 'github', link: 'https://github.com/rxht/wiki' }
]

export default defineConfig({
  title: "WIKI",
  description: "A VitePress Site",
  base: '/wiki/', // base 会自动添加到其他选项中以 / 开头的所有 URL 前面，因此只需指定一次。
  srcDir: 'src', // 相对于项目根目录的 markdown 文件所在的文件夹。
  cleanUrls: true, // 当设置为 true 时，VitePress 将从 URL 中删除 .html 后缀。
  lastUpdated: true, // 最近一条内容的更新时间会显示在页面右下角。
  themeConfig: {
    // outlineTitle: '本页目录',
    // lastUpdatedText: '上次修改时间',
    // darkModeSwitchLabel: '主题',
    // sidebarMenuLabel: '菜单',
    // returnToTopLabel: '返回顶部',
    // https://vitepress.dev/reference/default-theme-config
    nav,
    sidebar: [],
    search: { // 得益于 minisearch，VitePress 支持使用浏览器内索引进行模糊全文搜索。
      provider: 'local'
    },
    editLink: {
      pattern: `${repository.url}/edit/main/src/:path`,
      text: '在 GitHub 上编辑此页面'
    },
    socialLinks,

    footer: {
      message: `基于 ${license} 许可发布`,
      copyright: `版权所有 © 2024-${new Date().getFullYear()} 荣轩浩[rxht]`
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    outline: {
      label: '页面导航'
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },

    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
  },
  markdown: {
    lineNumbers: true,
    container: {
      tipLabel: '提示',
      warningLabel: '警告',
      dangerLabel: '危险',
      infoLabel: '信息',
      detailsLabel: '详细信息'
    },
    image: {
      // 默认禁用；设置为 true 可为所有图片启用懒加载。
      lazyLoading: true
    }
  },
})
```


## 配置 `vitepress-plugin-pagefind`

> 基于pagefind实现的离线全文搜索插件

详情可查看 [vitepress-plugin-pagefind](./plugin-pagefind.md)


## 配置 `vitepress-sidebar`

> 通过简单的设置自动配置和管理页面的侧边栏插件

详情可查看 [vitepress-sidebar](./plugin-sidebar.md)


## 配置 `vitepress-plugin-image-viewer`

> 基于 viewerjs 的 vitepress 图像查看器插件

详情可查看 [vitepress-plugin-image-viewer](./plugin-image-viewer.md)


## 配置 `canvas-confetti`

> 🎉 浏览器中的高性能五彩纸屑动画

详情可查看 [canvas-confetti](./plugin-canvas-confetti.md)


## 配置 `vitepress-plugin-comment-with-giscus`

> 基于 giscus 的 vitepress 评论区插件

详情可查看 [vitepress-plugin-comment-with-giscus](./plugin-comment-with-giscus.md)







## 最终配置代码如下

文件路径 `.vitepress/config.mts`

```typescript
import { defineConfig } from 'vitepress';
import { pagefindPlugin } from 'vitepress-plugin-pagefind';
import { license, repository } from '../package.json'
import { DefaultTheme } from "vitepress";
import { generateSidebar } from 'vitepress-sidebar';
import { VitePressSidebarOptions } from "vitepress-sidebar/types";

const nav: DefaultTheme.NavItem[] = [
  { text: "MolStar", link: "http://molstar.szbl.ac.cn/viewer/" },
]
const socialLinks: DefaultTheme.SocialLink[] = [
  { icon: 'github', link: 'https://github.com/rxht/wiki' }
]


// see: https://vitepress-sidebar.cdget.com/zhHans/guide/options#frontmattertitlefieldname
const def = {
    documentRootPath: 'src',
    useTitleFromFileHeading: true,
    useFolderTitleFromIndexFile: true,
    useFolderLinkFromIndexFile: true,
    collapsed: true, // 分组折叠/展开
}
function getOption(name: string, options: Partial<VitePressSidebarOptions> = {}) {
    return { scanStartPath: name, basePath: `/${name}/`, resolvePath: `/${name}/`, ...def, options }
}

const options = [
    getOption('molstar'),
];

/**
 * @param 侧边栏菜单项的配置。
 */
const sidebar: DefaultTheme.Sidebar = generateSidebar(options);


// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "WIKI",
  description: "A VitePress Site",
  base: '/wiki/', // base 会自动添加到其他选项中以 / 开头的所有 URL 前面，因此只需指定一次。
  srcDir: 'src', // 相对于项目根目录的 markdown 文件所在的文件夹。
  cleanUrls: true, // 当设置为 true 时，VitePress 将从 URL 中删除 .html 后缀。
  lastUpdated: true, // 最近一条内容的更新时间会显示在页面右下角。
  themeConfig: {
    // outlineTitle: '本页目录',
    // lastUpdatedText: '上次修改时间',
    // darkModeSwitchLabel: '主题',
    // sidebarMenuLabel: '菜单',
    // returnToTopLabel: '返回顶部',
    // https://vitepress.dev/reference/default-theme-config
    nav,
    sidebar,
    search: { // 得益于 minisearch，VitePress 支持使用浏览器内索引进行模糊全文搜索。
      provider: 'local'
    },
    editLink: {
      pattern: `${repository.url}/edit/main/src/:path`,
      text: '在 GitHub 上编辑此页面'
    },
    socialLinks,

    footer: {
      message: `基于 ${license} 许可发布`,
      copyright: `版权所有 © 2024-${new Date().getFullYear()} 荣轩浩[rxht]`
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    outline: {
      label: '页面导航'
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },

    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
  },
  markdown: {
    lineNumbers: true,
    container: {
      tipLabel: '提示',
      warningLabel: '警告',
      dangerLabel: '危险',
      infoLabel: '信息',
      detailsLabel: '详细信息'
    },
    image: {
      // 默认禁用；设置为 true 可为所有图片启用懒加载。
      lazyLoading: true
    }
  },
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


文件路径 `.vitepress/theme/index`
```typescript
// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme';
import { useData, useRoute } from 'vitepress';
import giscusTalk from 'vitepress-plugin-comment-with-giscus';

import 'viewerjs/dist/viewer.min.css';
import imageViewer from 'vitepress-plugin-image-viewer';
import vImageViewer from 'vitepress-plugin-image-viewer/lib/vImageViewer.vue';

import Confetti from "./components/Confetti.vue";
export default {
    ...DefaultTheme,
    enhanceApp(ctx) {
        DefaultTheme.enhanceApp(ctx);
        
        // 图片预览
        ctx.app.component('vImageViewer', vImageViewer);
        // 五彩纸屑
        ctx.app.component("Confetti", Confetti);
    },
    setup() {
        // Get frontmatter and route
        const { frontmatter, isDark } = useData();
        const route = useRoute();
        
        // Obtain configuration from: https://giscus.app/
        const props = {
            repo: 'rxht/wiki', 
            repoId: 'xxxxxxx',   
            category: 'General', // default: `General` 
            categoryId: 'xxxxxxx', 
            mapping: 'pathname', // default: `pathname`
            inputPosition: 'top', // default: `top`
            lang: 'zh-CN', // default: `zh-CN`
            lightTheme: isDark.value ? 'transparent_light': 'light', // default: `light`
            darkTheme: isDark.value ? 'dark': 'transparent_dark', // default: `transparent_dark`
            // ...
        }
        giscusTalk(props, { frontmatter, route }, true);

        // 文档中的所有图片添加无级缩放功能，无需修改 Markdown 内容。
        imageViewer(route);
    },
};
```