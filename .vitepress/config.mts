import { defineConfig } from "vitepress";
import { homepage, cloudflare, description } from "../package.json";
import { head, themeConfig, markdown, vite } from "./common/index.mts";

const HOSTNAME = {
    github: homepage,
    cloudflare,
};
type HOSTNAME = keyof typeof HOSTNAME;

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "RXHT - 博客",
    description,
    srcDir: "src", // 相对于项目根目录的 markdown 文件所在的文件夹。
    cleanUrls: true, // 当设置为 true 时，VitePress 将从 URL 中删除 .html 后缀。
    lastUpdated: true, // 最近一条内容的更新时间会显示在页面右下角。
    lang: "zh-CN",
    head,
    themeConfig,
    markdown,
    vite,
    sitemap: {
        hostname: HOSTNAME[process.env.CI_ENV as HOSTNAME] ?? homepage,
    },
});
