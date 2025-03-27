---
Date: 2025-01-20 09:14:47
LastEditTime: 2025-03-27 10:53:36

# 首页

# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "文档"
  text: "简单的文档说明"
  image:
      src: 'assets/logo.png'
      alt: 'LOGO'

features:
  - title: MolStar
    details: 基于开源 [MolStar](https://molstar.org)的编辑器版本
    link: molstar
    linkText: 点击查看
    icon: 
      src: 'assets/molstar-logo.png'
      alt: 'MolStar'

  - title: VitePress
    icon: 
      src: 'assets/vitepress-logo.svg'
    details: VitePress 搭建博客
    link: vitepress
    linkText: 点击查看

  - title: Docker
    icon: 📝
    link: docker
    linkText: 点击查看

  - title: Linux
    icon: 📝
    details: 安装教程
    link: linux
    linkText: 点击查看

  - title: AI
    icon: 📝
    details: 安装教程
    link: ai
    linkText: 点击查看

  - title: 代码片段
    icon: 📝
    details: 一些小方法、小功能的代码片段
    link: code-segment
    linkText: 点击查看
---

<ClientOnly>
  <Confetti />
</ClientOnly>

<Article />
