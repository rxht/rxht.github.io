// .vitepress/theme/index.js
import { h } from "vue";
import DefaultTheme from "vitepress/theme";
import { useRoute } from "vitepress";
import imageViewer from "vitepress-plugin-image-viewer";
import vImageViewer from "vitepress-plugin-image-viewer/lib/vImageViewer.vue";

import Confetti from "./components/Confetti";
import BackToTop from "./components/BackToTop";
import Article from "./components/Article";
import DocInfo from "./components/DocInfo";
import "virtual:group-icons.css";
import "viewerjs/dist/viewer.min.css";

import "./theme.css";
import "./tailwind.css";
import Layout from "./Layout.vue";

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx);
    // 图片预览
    ctx.app.component("vImageViewer", vImageViewer);
    // 五彩纸屑
    ctx.app.component("Confetti", Confetti);
    // 文章页
    ctx.app.component("Article", Article);
  },
  setup() {
    const route = useRoute();
    // 文档中的所有图片添加无级缩放功能，无需修改 Markdown 内容。
    imageViewer(route);
  },
  Layout() {
    return h(Layout, null, {
      "layout-bottom": () => h(BackToTop),
      "doc-before": () => h(DocInfo),
    });
  },
};
