---
Date: 2025-01-20 09:14:47
LastEditTime: 2025-07-16 10:06:55

# 首页

# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "文档"
  text: "简单的文档说明"
  tagline: "正在认真完善中。。。"
  image:
    src: "assets/logo.png"
    alt: "LOGO"

features:
  - title: Q-Mol*
    details: 基于开源 MolStar 的编辑器版本
    link: molstar
    linkText: 点击查看
    icon:
      src: "assets/molstar.png"
      alt: "Q-Mol*"

  - title: VitePress
    details: VitePress 搭建教程
    link: vitepress
    linkText: 点击查看
    icon:
      src: "assets/vitepress.svg"
      alt: "vitepress"

  - title: Docker
    details: Docker 部分功能教程
    link: docker
    linkText: 点击查看
    icon:
      src: "assets/docker.svg"
      alt: "docker"

  - title: Linux
    details: 安装教程
    link: linux
    linkText: 点击查看
    icon:
      src: "assets/linux.svg"
      alt: "linux"

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
