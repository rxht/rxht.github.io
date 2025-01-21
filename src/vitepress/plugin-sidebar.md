# 配置 vitepress-sidebar

## 导言

**VitePress Sidebar**是 **[VitePress](https://vitepress.dev)** 的一个插件,可通过简单的设置自动配置和管理页面的侧边栏。

- ⚡️ 针对最新版**VitePress**进行了优化
- ⚡️ 易于使用，有很多选项可根据自己的喜好进行定制
- ⚡️ 轻量级捆绑文件大小
- ⚡️ 支持 [多个侧边栏](https://vitepress.dev/reference/default-theme-sidebar#multiple-sidebars)
- ⚡️ 支持[Frontmatter](https://vitepress.dev/guide/frontmatter)
- ⚡️ 支持[TypeScript](https://www.typescriptlang.org)
- ⚡️ 自定义分类、特殊字符转换、文件和文件夹过滤器等菜单！


## 下载依赖
::: code-group

```sh [npm]
$ npm i -D vitepress-sidebar
```

```sh [pnpm]
$ pnpm i -D vitepress-sidebar
```

```sh [yarn]
$ yarn add -D vitepress-sidebar
```

:::

## 使用插件
`generateSidebar` 在`themeConfig.sidebar`级别可用。当需要对更详细的 `themeConfig` 设置进行代码分离时，可以使用此功能。

```javascript
// `.vitepress/config.js`
import { generateSidebar } from 'vitepress-sidebar';

export default defineConfig({
  themeConfig: {
    sidebar: generateSidebar({
      // VitePress Sidebar's options here...
    })
  }
});
```

要扫描您的项目文档，VitePress Sidebar需要通过 `documentRootPath` 选项指定工作路径来了解正确的位置。默认是`/`，但如果你的VitePress项目位于一个单独的文件夹中，如`docs`，根据你的项目，你将需要自己指定路径。

根据项目根路径，`documentRootPath` 中的路径将写入 `.vitePress` 文件夹所在的路径。

```text
/
├─ package.json
├─ src/
├─ docs/        <--------------- `documentRootPath` ('/docs')
│  ├─ .vitepress/
│  ├─ another-directory/
│  ├─ hello.md
│  └─ index.md
└─ ...
```

如果您的项目结构如上，则需要这样设置:

```javascript
// `.vitepress/config.js`
import { withSidebar } from 'vitepress-sidebar';

const vitePressOptions = {};

const vitePressSidebarOptions = {
  documentRootPath: '/docs'
};

export default defineConfig(withSidebar(vitePressOptions, vitePressSidebarOptions));
```

要测试侧边栏结果如何打印，请在构建 VitePress 时将 `debugPrint` 选项设置为 `true`。你应该能在控制台中看到输出结果。

有关 VitePress Sidebar 配置的更多信息,请参阅下面的 **[选项](/zhHans/guide/options)** 部分。

## 代码示例

```javascript
import { DefaultTheme } from "vitepress";
import { generateSidebar } from 'vitepress-sidebar';
import { VitePressSidebarOptions } from "vitepress-sidebar/types";

// see: https://vitepress-sidebar.cdget.com/zhHans/guide/options#frontmattertitlefieldname
const def = {
    documentRootPath: 'src',
    useTitleFromFileHeading: true,
    useFolderTitleFromIndexFile: true,
    useFolderLinkFromIndexFile: true,
    collapsed: false, // 分组折叠/展开
}
function getOption(name: string, options: Partial<VitePressSidebarOptions> = {}) {
    return { scanStartPath: name, basePath: `/${name}/`, resolvePath: `/${name}/`, ...def, options }
}

const options = [
    getOption('molstar'),
    getOption('vitepress')
];

/**
 * @param 侧边栏菜单项的配置。
 */
export const sidebar: DefaultTheme.Sidebar = generateSidebar(options);
// 然后将所得到 的sidebar赋值给 `config.mts` 文件中的sidebar配置属性
```