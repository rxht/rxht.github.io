---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "rxh wiki"
  text: "A VitePress Site"
  tagline: My great project tagline
  actions:
    - theme: brand
      text: Markdown Examples
      link: /markdown-examples
    - theme: alt
      text: API Examples
      link: /api-examples

features:
  - title: MolStar
    icon: 
     src: ./assets/molstar-logo.png
    details: 基于开源 [MolStar](https://molstar.org)的编辑器版本
    link: molstar
    linkText: 点击查看
  - title: 代码片段
    details: 一些小方法、小功能的代码片段
    link: code-segment
    linkText: 点击查看
---

<ClientOnly>
  <Confetti />
</ClientOnly>