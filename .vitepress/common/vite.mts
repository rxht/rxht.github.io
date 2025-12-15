import { pagefindPlugin } from "vitepress-plugin-pagefind";
import { groupIconVitePlugin } from "vitepress-plugin-group-icons";
import viteCompression from "vite-plugin-compression";
import { createHtmlPlugin } from 'vite-plugin-html';
import tailwindcss from "@tailwindcss/vite";
import { UserConfig } from 'vitepress';

const vite: UserConfig['vite'] = {
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
        viteCompression({
            algorithm: 'gzip',
            threshold: 10240,
            ext: '.gz',
            deleteOriginFile: false,
        }),
        viteCompression({
            algorithm: 'brotliCompress',
            threshold: 10240,
            ext: '.br',
            deleteOriginFile: false,
        }),
        createHtmlPlugin({
            minify: true,
        })
    ],
    server: {
        host: "0.0.0.0",
    },
    build: {
        target: 'es2020',
        minify: 'esbuild',
        rollupOptions: {
            cache: true,
        },
    },
    assetsInclude: ['**/*.svg']
};

export { vite };