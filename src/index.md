---
Date: 2025-01-20 09:14:47
LastEditTime: 2025-12-19 17:42:53
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

# 首页

# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "文档"
  text: "简单的文档说明"
  tagline: "正在认真完善中。。。"
  image:
    src: "assets/logo.webp"
    alt: "LOGO"

features:
  - title: Qbics-Molstar
    details: 基于开源 MolStar 的编辑器版本
    link: molstar
    linkText: 点击查看
    icon:
      src: "assets/molstar.webp"
      alt: "Qbics-Molstar"

  - title: 化学部分
    icon: 🧪
    details: 化学相关的内容
    link: chemical
    linkText: 点击查看

  - title: Javascript
    icon:
      src: "assets/javascript.svg"
      alt: "javascript"
    details: Javascript 相关的内容
    link: javascript
    linkText: 点击查看

  - title: 其他杂项
    icon: 📝
    details: 一些代码片段或者教程说明之类的文档
    link: others
    linkText: 点击查看
---

<ClientOnly>
  <Confetti />
</ClientOnly>

<Article />
