import { defineConfig } from "vitepress";
import { homepage } from "../package.json";
import { head, themeConfig, markdown } from "./common/index.mts";
import { pagefindPlugin } from "vitepress-plugin-pagefind";
import { groupIconVitePlugin } from "vitepress-plugin-group-icons";
import tailwindcss from "@tailwindcss/vite";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "RXHT - 博客",
  description: "「开发者实战指南」- 分享一些技术文章，包括前端、后端、数据库、工具、开发规范等。",
  srcDir: "src", // 相对于项目根目录的 markdown 文件所在的文件夹。
  cleanUrls: true, // 当设置为 true 时，VitePress 将从 URL 中删除 .html 后缀。
  lastUpdated: true, // 最近一条内容的更新时间会显示在页面右下角。
  lang: "zh-CN",
  head,
  themeConfig,
  markdown,
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
      })
    ],
    server: {
      host: "0.0.0.0",
    },
    build: {
      rollupOptions: {
        cache: true,
      }
    }
  },
  sitemap: {
    hostname: homepage,
  },
});
