import { defineConfig } from "vitepress";
import { pagefindPlugin } from "vitepress-plugin-pagefind";
import {
  groupIconMdPlugin,
  groupIconVitePlugin,
} from "vitepress-plugin-group-icons";
import { license, repository, homepage } from "../package.json";
import { nav, sidebar, socialLinks } from "./route/index.mts";
import { RssPlugin } from "vitepress-plugin-rss";
import { VitePWA } from 'vite-plugin-pwa';
import tailwindcss from "@tailwindcss/vite";

const title = 'RXHT - 博客';
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title,
  description:
    "「开发者实战指南」- 分享一些技术文章，包括前端、后端、数据库、工具、开发规范等。",
  srcDir: "src", // 相对于项目根目录的 markdown 文件所在的文件夹。
  cleanUrls: true, // 当设置为 true 时，VitePress 将从 URL 中删除 .html 后缀。
  lastUpdated: true, // 最近一条内容的更新时间会显示在页面右下角。
  lang: "zh-CN",
  head: [
    [
      "meta",
      {
        name: "referrer",
        content: "origin-when-cross-origin",
      },
    ],
    [
      "meta",
      {
        name: "google-site-verification",
        content: "0F9InGQokC5QJgzFqyZHxxkKrGdA0zAAWOWOgKmtT00",
      },
    ], // google 收录
    [
      "meta",
      { name: "msvalidate.01", content: "9AC86FD1DE0C9B5003A7EC062D6CCAFA" },
    ], // bing 收录
    ["meta", { name: "og:type", content: "website" }],
    ["meta", { name: "og:locale", content: "zh-cn" }],
    ["meta", { name: "og:site_name", content: "RXHT- 博客" }],
    ["link", { rel: "icon", href: "/favicon.ico" }],
    ["link", { rel: "manifest", href: "/manifest.webmanifest" }],
    ["script", { id: "vite-plugin-pwa:register-sw", type: "text/javascript", src: "/registerSW.js" }],
    [
      "script",
      { type: "text/javascript" },
      `(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "py6srk3h9m");`,
    ], // Microsoft Clarity
    [
      "script",
      {
        async: "",
        href: "https://www.googletagmanager.com/gtag/js?id=G-C73RJC1NJS",
      },
    ], // Google Analytics
    [
      "script",
      { type: "text/javascript" },
      `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-C73RJC1NJS');`,
    ], // Google Analytics
    [
      "script",
      { type: "text/javascript" },
      `
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?1c8747729d3e68104abbedf054aed8d2";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();
      `,
    ], // Baidu Analytics
  ],
  themeConfig: {
    // outlineTitle: '本页目录',
    // lastUpdatedText: '上次修改时间',
    // darkModeSwitchLabel: '主题',
    // sidebarMenuLabel: '菜单',
    // returnToTopLabel: '返回顶部',
    // https://vitepress.dev/reference/default-theme-config
    nav,
    sidebar,
    search: {
      // 得益于 minisearch，VitePress 支持使用浏览器内索引进行模糊全文搜索。
      provider: "local",
    },
    editLink: {
      pattern: `${repository.url}/edit/main/src/:path`,
      text: "在 GitHub 上编辑此页面",
    },
    socialLinks,

    footer: {
      message: `基于 ${license} 许可发布`,
      copyright: `版权所有 © 2024-${new Date().getFullYear()} 荣轩浩[rxht]`,
    },

    docFooter: {
      prev: "上一页",
      next: "下一页",
    },

    outline: {
      label: "页面导航",
    },

    lastUpdated: {
      text: "最后更新于",
      formatOptions: {
        dateStyle: "short",
        timeStyle: "medium",
      },
    },

    returnToTopLabel: "回到顶部",
    sidebarMenuLabel: "菜单",
    darkModeSwitchLabel: "主题",
    lightModeSwitchTitle: "切换到浅色模式",
    darkModeSwitchTitle: "切换到深色模式",
  },
  markdown: {
    math: true,
    lineNumbers: true, // 可以在代码块中添加 :line-numbers / :no-line-numbers 标记来覆盖在配置中的设置。
    container: {
      tipLabel: "提示",
      warningLabel: "警告",
      dangerLabel: "危险",
      infoLabel: "信息",
      detailsLabel: "详细信息",
    },
    image: {
      // 默认禁用；设置为 true 可为所有图片启用懒加载。
      lazyLoading: true,
    },
    config(md) {
      md.use(groupIconMdPlugin);
    },
  },
  vite: {
    plugins: [
      tailwindcss(),
      groupIconVitePlugin(),
      pagefindPlugin({
        btnPlaceholder: "搜索",
        placeholder: "搜索文档",
        emptyText: "空空如也",
        heading: "共: {{searchResult}} 条结果",
        excludeSelector: ["img", "a.header-anchor"],
        forceLanguage: "zh-cn",
        customSearchQuery: (input: string) => {
          const segmenter = new Intl.Segmenter("zh-CN", {
            granularity: "word",
          });
          const result: string[] = [];
          for (const it of segmenter.segment(input)) {
            it.isWordLike && result.push(it.segment);
          }
          return result.join(" ");
        },
        filter(searchItem, idx, originArray) {
          return !searchItem.route.includes("404");
        },
      }),
      RssPlugin({
        title: "RXHT - 博客",
        baseUrl: "https://rxht.github.io",
        copyright: `版权所有 © 2024-${new Date().getFullYear()} 荣轩浩[rxht]`,
      }),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.svg', 'robots.txt'],
        strategies: 'generateSW',
        manifest: {
          name: title,
          short_name: title,
          description: title,
          theme_color: "#ffffff",
          icons: [
            {
              src: 'assets/logo192.webp',
              sizes: "192x192",
              type: "image/webp",
            },
            {
              src: 'assets/logo512.webp',
              sizes: "512x512",
              type: "image/webp",
            },
          ],
        },
      })
    ],
    server: {
      host: "0.0.0.0",
    },
  },
  sitemap: {
    hostname: homepage,
  },
});
