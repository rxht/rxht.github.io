# RXHT - 开发者实战指南

> 个人技术博客「开发者实战指南」—— 把开发中的踩坑、方案与规范，沉淀为可检索、可复用的实战知识库。
> 内容覆盖前端、后端、数据库、工具、开发规范，以及分子可视化（MolStar）等专题。

- 在线地址：<https://rxht.github.io>
- 源码仓库：<https://github.com/rxht/rxht.github.io>
- 许可证：[CC BY-NC-SA 4.0](src/public/LICENSE.md)

---

## 技术栈

| 类别 | 选型 |
| --- | --- |
| 静态站点框架 | [VitePress](https://vitepress.dev/) `^1.6.4` |
| 前端框架 | [Vue](https://vuejs.org/) `^3.5.17` |
| 样式方案 | [Tailwind CSS](https://tailwindcss.com/) v4（`@tailwindcss/vite ^4.1.11`） |
| 包管理器 | pnpm `9`（CI 同版本） |
| 运行时 | Node.js `20`（GitHub Actions 指定） |

### 关键依赖

- **内容增强**
  - `markdown-it-mathjax3` —— 数学公式（MathJax3，已开启 `math: true`）
  - `vitepress-plugin-group-icons` —— 代码组语言图标
  - `vitepress-plugin-image-viewer` + `viewerjs` —— 文档图片无级缩放预览
  - `vitepress-plugin-pagefind` —— 全文检索（中文 `Intl.Segmenter` 分词）
  - `vitepress-plugin-rss` —— RSS / Atom 订阅（`atom.xml`）
- **交互与组件**
  - `@vueuse/core` —— Vue 组合式工具集
  - `canvas-confetti` —— 首页五彩纸屑动效
  - `vue-sonner` —— 消息提示
  - `dayjs` —— 时间处理
- **构建优化**
  - `vite-plugin-compression` —— Gzip + Brotli 资源压缩
  - `vite-plugin-html` —— HTML 压缩
  - `vitepress-sidebar` —— 侧边栏自动生成

---

## 主要特性

- **本地全文搜索**：VitePress 内置 Minisearch + Pagefind 双检索，支持中文分词。
- **RSS / Atom 订阅**：通过 `vitepress-plugin-rss` 自动生成订阅源。
- **图片预览**：文档内图片点击放大，无需修改 Markdown 源码。
- **数学公式**：支持 MathJax3 行内/块级公式。
- **阅读体验**：代码行号、提示容器（提示/警告/危险/信息/详细信息）中文化、深浅色模式、回到顶部、归档页。
- **首页与组件**：首页 Hero + 特性卡片 + 五彩纸屑；可复用的文档内 Vue 组件（见下文）。
- **SEO 与收录**：Google / Bing 站点验证 meta、Open Graph、sitemap、robots，并通过 IndexNow 自动提交收录。
- **访问统计**：`hooks/VisitData` 在浏览器端记录页面访问数据。
- **性能优化**：Gzip + Brotli 预压缩、HTML 压缩、静态资源缓存。

---

内容栏目（导航与侧边栏）对应：

| 栏目 | 路径 | 说明 |
| --- | --- | --- |
| 归档 | `/archive` | 全部文章归档 |
| MolStar | 外链 `http://molstar.szbl.ac.cn/viewer/` | 基于开源 Mol* 深度优化的分子可视化工具 |
| 化学 | `/chemical` | 分子结构、反应机理、计算化学等 |
| JavaScript | `/javascript` | 原生 JS、框架与工程化 |
| 其他杂项 | `/others` | 工具脚本、部署教程、代码片段 |
| Windows | `/windows` | Windows 相关（如 GPU） |

---

## 本地开发

### 环境要求

- Node.js `>= 20`
- pnpm `>= 9`

### 安装与运行

```bash
# 安装依赖
pnpm install

# 本地开发（默认热更新，监听 0.0.0.0）
pnpm docs:dev

# 生产构建
pnpm docs:build

# 本地预览构建产物
pnpm docs:preview
```

构建输出位于 `.vitepress/dist/`（已在 `.gitignore` 中忽略）。

### 可用脚本

| 脚本 | 命令 | 说明 |
| --- | --- | --- |
| 开发 | `pnpm docs:dev` | 启动 VitePress 开发服务器 |
| 构建 | `pnpm docs:build` | 生产构建 |
| 预览 | `pnpm docs:preview` | 预览构建结果 |
| 提交 | `pnpm cz` | 交互式提交（git add . + czg，遵循 cz-git 规范） |
| 发版 | `pnpm release` | 使用 `bumpp` 升级版本号 |

---

## 内容组织约定

- 文档源文件统一放在 `src/` 目录（`srcDir: "src"`）。
- 开启 `cleanUrls`，URL 不含 `.html` 后缀。
- 每篇文档建议包含 frontmatter（如 `title`、`description`、`tags`、`Date`、`LastEditTime`），用于归档、SEO 与页面信息展示。
- 文档内可复用 `src/components/` 下的 Vue 组件（如 `PeriodicTable`、`ColorScheme`、`Symbols`、`Iframe`、`Features`）。
- 编辑链接指向 `https://github.com/rxht/rxht.github.io/edit/main/src/:path`，便于在 GitHub 直接修改。

---

## 部署

部署由 GitHub Actions 自动化：

1. **构建与发布**（`deploy.yml`）
   - 触发条件：推送匹配 `v*` 的 tag（如 `v1.0`）或手动 `workflow_dispatch`。
   - 流程：checkout → 安装 pnpm 9 / Node 20 → `pnpm install` → `pnpm docs:build` → 写入 IndexNow 验证文件 → 上传 Pages 工件 → 部署到 GitHub Pages。
2. **收录提交**（`IndexNow.yml`）
   - 定时：每周一 00:00 UTC（北京时间周一 08:00）。
   - 行为：读取 `https://rxht.github.io/sitemap.xml`，将最近一周新增 URL 提交至 IndexNow（需仓库 `Secrets` 配置 `INDEXNOW_KEY`）。

发布新版本的典型流程：

```bash
# 1. 提交改动（遵循 cz-git 规范）
pnpm cz

# 2. 升级版本号并打 tag（bumpp 会自动提交 + 打 tag）
pnpm release

# 3. 推送 tag，触发 deploy.yml 自动部署
git push --follow-tags
```

---

## 贡献指南

本项目使用 [cz-git](https://github.com/Zhengqbbb/cz-git) 提交规范，提交类型为中文：

- `文档`：文档变更
- `特性`：新增功能
- `格式`：代码格式

提交方式：

```bash
pnpm cz
```

提交信息由 `commitlint.config.cjs` 校验。

---

## 许可证

本仓库内容以 **[CC BY-NC-SA 4.0](src/public/LICENSE.md)**（署名-非商业性使用-相同方式共享 4.0 国际）许可发布。
代码与文档未经授权不得用于商业用途；转载请保留署名并采用相同许可。

---

版权所有 © 2024–2026 荣轩浩（rxht）
