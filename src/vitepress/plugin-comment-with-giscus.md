# 配置 vitepress-plugin-comment-with-giscus

> 基于 giscus 的 vitepress 评论区插件

## 前置条件

1. 此仓库是公开的（如果没有开源项目，无法集成该评论系统，请转身离开），否则访客将无法查看 discussion。
2. [giscus app](https://github.com/apps/giscus) 已安装否则访客将无法评论和回应。
3. Discussions 功能已在你的仓库中启用。

## 安装 giscus app

进入 [giscus app](https://github.com/apps/giscus) ，点击 install 按钮进行安装。

## 开启 Discussions

进入github中项目中的 Setting，找到 Features，然后在其中勾选 Discussions 选项即可。

## 申请 giscus key

完成上述的操作后进入[giscus app](https://github.com/apps/giscus)

1. 下滑找到配置项。
2. 选择评论系统的语言（就是评论系统界面显示的语言）。
3. 在仓库中输入你的用户名和仓库名，格式(myusername/myrepo)，例如：tricker39/programming-knowledge 。
4. 选择（页面 ↔️ discussion 映射关系），有兴趣的自己去找找看都有什么用（如果不懂就选择默认）。
5. 选择 Discussion 分类，我的选择是 General，至于选择什么看你自己。
6. 选择特性（如果不懂就选择默认）。
7. 主题（可以不选，之后会做主题切换，适配深/浅主题）。
8. 复制你得到的那串 key。


## 下载依赖
::: code-group

```sh [npm]
$ npm i vitepress-plugin-comment-with-giscus
```

```sh [pnpm]
$ pnpm add vitepress-plugin-comment-with-giscus
```

```sh [yarn]
$ yarn add vitepress-plugin-comment-with-giscus
```

:::


## 使用插件

文件路径 `.vitepress/theme/index`

```typescript
// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme';
import { useData, useRoute } from 'vitepress';
import giscusTalk from 'vitepress-plugin-comment-with-giscus';

export default {
    ...DefaultTheme,
    enhanceApp(ctx) {
        DefaultTheme.enhanceApp(ctx);
    },
    setup() {
        // Get frontmatter and route
        const { frontmatter, isDark } = useData();
        const route = useRoute();
        
        // Obtain configuration from: https://giscus.app/
        const props = {
            repo: '你的仓库地址',
            repoId: '你的仓库id',
            category: '你选择的分类', // 默认: `General`
            categoryId: '你的分类id',
            mapping: 'pathname', // default: `pathname`
            inputPosition: 'top', // default: `top`
            lang: 'zh-CN', // default: `zh-CN`
            lightTheme: isDark.value ? 'transparent_light': 'light', // default: `light`
            darkTheme: isDark.value ? 'dark': 'transparent_dark', // default: `transparent_dark`
            // ...
        }
        giscusTalk(props, { frontmatter, route }, true);
    },
};
```