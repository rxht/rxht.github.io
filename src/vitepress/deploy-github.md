---
Date: 2025-03-18 22:10:44
LastEditTime: 2025-03-27 22:02:01
---
# 部署到 GitHub 的 Pages

使用仪表板创建新项目并更改这些设置：

- **构建命令：** `npm run docs:build`
- **输出目录：** `docs/.vitepress/dist`
- **node 版本：** `18` (或更高版本)

::: warning
不要为 HTML 代码启用 _Auto Minify_ 等选项。它将从输出中删除对 Vue 有意义的注释。如果被删除，你可能会看到激活不匹配错误。
:::

::: tip
 在本案例中的 `config.mts` 的配置信息如下
  ```javascript
    export default defineConfig({
        title: "WIKI",
        description: "A VitePress Site",
        base: '/wiki/',
        srcDir: 'src',
        ...
    })
  ```
:::

1. 在项目的 `.github/workflows` 目录中创建一个名为 `deploy.yml` 的文件，其中包含这样的内容：

   ```yaml{53} [.github/workflows/deploy.yml]
   # 构建 VitePress 站点并将其部署到 GitHub Pages 的示例工作流程
   #
   name: Deploy VitePress site to Pages

   on:
     # 在针对 `main` 分支的推送上运行。如果你
     # 使用 `master` 分支作为默认分支，请将其更改为 `master`
     push:
       branches: [main]

     # 允许你从 Actions 选项卡手动运行此工作流程
     workflow_dispatch:

   # 设置 GITHUB_TOKEN 的权限，以允许部署到 GitHub Pages
   permissions:
     contents: read
     pages: write
     id-token: write

   # 只允许同时进行一次部署，跳过正在运行和最新队列之间的运行队列
   # 但是，不要取消正在进行的运行，因为我们希望允许这些生产部署完成
   concurrency:
     group: pages
     cancel-in-progress: false

   jobs:
     # 构建工作
     build:
       runs-on: ubuntu-latest
       steps:
         - name: Checkout
           uses: actions/checkout@v4
           with:
             fetch-depth: 0 # 如果未启用 lastUpdated，则不需要
         # - uses: pnpm/action-setup@v3 # 如果使用 pnpm，请取消此区域注释
         #   with:
         #     version: 9
         # - uses: oven-sh/setup-bun@v1 # 如果使用 Bun，请取消注释
         - name: Setup Node
           uses: actions/setup-node@v4
           with:
             node-version: 20
             cache: npm # 或 pnpm / yarn
         - name: Setup Pages
           uses: actions/configure-pages@v4
         - name: Install dependencies
           run: npm ci # 或 pnpm install / yarn install / bun install
         - name: Build with VitePress
           run: npm run docs:build # 或 pnpm docs:build / yarn docs:build / bun run docs:build
         - name: Upload artifact
           uses: actions/upload-pages-artifact@v3
           with:
             path: docs/.vitepress/dist # 这里的路径需要配置为 `config.mts` 中的 outDir

     # 部署工作
     deploy:
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       needs: build
       runs-on: ubuntu-latest
       name: Deploy
       steps:
         - name: Deploy to GitHub Pages
           id: deployment
           uses: actions/deploy-pages@v4
   ```

   ::: warning
   确保 VitePress 中的 `base` 选项配置正确。
   :::

2. 在存储库设置中的 “Pages” 菜单项下，选择 “Build and deployment > Source > GitHub Actions”。

3. 将更改推送到 `main` 分支并等待 GitHub Action 工作流完成。你应该看到站点部署到 `https://<username>.github.io/[repository]/` 或 `https://<custom-domain>/`，这取决于你的设置。你的站点将在每次推送到 `main` 分支时自动部署。
