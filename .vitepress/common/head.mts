import { HeadConfig } from 'vitepress';

const head: HeadConfig[] = [
    ["meta", { name: "referrer", content: "origin-when-cross-origin" }],
    ["meta", { name: "google-site-verification", content: "0F9InGQokC5QJgzFqyZHxxkKrGdA0zAAWOWOgKmtT00" }], // google 收录
    ["meta", { name: "msvalidate.01", content: "9AC86FD1DE0C9B5003A7EC062D6CCAFA" }], // bing 收录
    ["meta", { name: "author", content: "rxht（荣轩浩）" }],
    ["meta", { name: "robots", content: "index, follow" }],
    ["meta", { property: "og:locale", content: "zh-cn" }],
    ["meta", { property: "og:site_name", content: "开发者实战指南 | RXHT" }],
    ["meta", { name: "twitter:card", content: "summary_large_image" }],
    ["link", { rel: "icon", href: "/favicon.ico" }],
    ["link", { rel: "preconnect", href: "https://rxht.github.io" }]
];

export { head };