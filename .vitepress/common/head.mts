import { HeadConfig } from 'vitepress';

const head: HeadConfig[] = [
  ["meta", { name: "referrer", content: "origin-when-cross-origin" }],
  ["meta", { name: "google-site-verification", content: "0F9InGQokC5QJgzFqyZHxxkKrGdA0zAAWOWOgKmtT00" }], // google 收录
  ["meta", { name: "msvalidate.01", content: "9AC86FD1DE0C9B5003A7EC062D6CCAFA" }], // bing 收录
  ["meta", { name: "author", content: "rxht（荣轩浩）" }],
  ["meta", { name: "keywords", content: "molstar,qbics,vitepress,化学,linux,Q-Mol*" }],
  ["meta", { name: "description", content: "「开发者实战指南」- 分享一些技术文章，包括前端、后端、数据库、工具、开发规范等。" }],
  ["meta", { name: "og:type", content: "website" }],
  ["meta", { name: "og:locale", content: "zh-cn" }],
  ["meta", { name: "og:site_name", content: "RXHT - 博客" }],
  ["meta", { name: "robots", content: "index, follow" }],
  ["link", { rel: "icon", href: "/favicon.ico" }]
];

export { head };