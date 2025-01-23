---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "rxh wiki"
  text: "A VitePress Site"
  tagline: My great project tagline
  image:
      src: 'assets/logo.png'
      alt: 'LOGO'
  actions:
    - theme: brand
      text: 开始 VitePress
      link: /vitepress
    - theme: alt
      text: API Examples
      link: /api-examples

features:
  - title: MolStar
    details: 基于开源 [MolStar](https://molstar.org)的编辑器版本
    link: molstar
    linkText: 点击查看
    icon: 
      src: 'assets/molstar-logo.png'
      alt: 'MolStar'

  - title: 代码片段
    icon: 📝
    details: 一些小方法、小功能的代码片段
    link: code-segment
    linkText: 点击查看
---

<ClientOnly>
  <Confetti />
</ClientOnly>