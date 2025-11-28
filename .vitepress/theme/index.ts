// .vitepress/theme/index.js
import { h } from "vue";
import DefaultTheme from "vitepress/theme";
import { inBrowser, useRoute } from "vitepress";
import imageViewer from "vitepress-plugin-image-viewer";
import vImageViewer from "vitepress-plugin-image-viewer/lib/vImageViewer.vue";

import Confetti from "./components/Confetti";
import BackToTop from "./components/BackToTop";
import Article from "./components/Article";
import Archive from "./components/Archive";
import DocInfo from "./components/DocInfo";

import Layout from "./Layout.vue";
import useVisitData from './hooks/VisitData';

import "virtual:group-icons.css";
import "viewerjs/dist/viewer.min.css";

import "./style/theme.css";
import "./style/blur.css";
import "./style/tailwind.css";

export default {
    extends: DefaultTheme,
    enhanceApp(ctx) {
        // 图片预览
        ctx.app.component("vImageViewer", vImageViewer);
        // 五彩纸屑
        ctx.app.component("Confetti", Confetti);
        // 文章页
        ctx.app.component("Article", Article);
        // 归档
        ctx.app.component("Archive", Archive);
        if (inBrowser) {
            ctx.router.onAfterPageLoad = () => useVisitData();
        }
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
            "doc-after": () => h('div', { id: 'container-9201687309a4ba933bbd246d08bb6b99' }),
        });
    },
};
