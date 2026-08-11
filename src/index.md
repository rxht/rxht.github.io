---
Date: 2025-01-20 09:14:47
LastEditTime: 2025-12-23 15:06:12
description: 个人博客首页，方便快速找到想要的内容
head:
  - - meta
    - name: keywords
      content: 个人博客, 首页, 模块
tags:
  - 博客首页
  - 首页
  - 文档
  - Qbics-Molstar

# 首页布局参考：https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "开发者实战指南"
  text: "技术实战笔记 · 前端 / 后端 / 数据库 / 工具"
  tagline: "把开发中的踩坑、方案与规范，沉淀为可检索、可复用的实战知识库。"
  image:
    src: "assets/logo.webp"
    alt: "LOGO"
  actions:
    - theme: brand
      text: 开始阅读
      link: /archive
    - theme: alt
      text: GitHub
      link: https://github.com/rxht/rxht.github.io

features:
  - title: Qbics-Molstar
    details: 基于开源 MolStar 深度优化的专业工具，突破传统分子可视化的局限。内置功能完备的分子编辑器，支持灵活的结构编辑、参数调整与模型修改，让科研人员无需切换多套软件，即可一站式完成“可视化 - 编辑”全流程操作。
    link: molstar
    linkText: 点击查看
    icon:
      src: "assets/molstar.webp"
      alt: "Qbics-Molstar"

  - title: 化学
    icon: 🧪
    details: 分子结构、反应机理与计算化学相关的实战笔记，记录从原理到落地的关键细节与可复用方法。
    link: chemical
    linkText: 点击查看

  - title: JavaScript
    icon:
      src: "assets/javascript.svg"
      alt: "JavaScript"
    details: 原生 JS、主流框架与工程化实践，覆盖日常开发中的典型场景、性能优化与常见坑点。
    link: javascript
    linkText: 点击查看

  - title: 其他杂项
    icon: 📝
    details: 工具脚本、部署教程与零散但实用的代码片段，随用随查，沉淀值得保留的经验。
    link: others
    linkText: 点击查看
---

<ClientOnly>
  <Confetti />
</ClientOnly>

<Article />
