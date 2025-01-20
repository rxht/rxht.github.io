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
    details: 基于开源 [MolStar](https://molstar.org)的编辑器版本
    link: molstar
    linkText: 点击查看
    icon: <img alt="molstar" src='data:image/png;base64,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'>

  - title: 代码片段
    icon: 📝
    details: 一些小方法、小功能的代码片段
    link: code-segment
    linkText: 点击查看
---

<ClientOnly>
  <Confetti />
</ClientOnly>