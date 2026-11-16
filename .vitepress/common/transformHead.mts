import type { HeadConfig, TransformContext } from "vitepress";

/**
 * 在构建期为每一页动态注入 SEO 相关的 <head> 标签。
 *
 * 通过 transformHead 钩子打通「frontmatter → <head>」链路，解决以下问题：
 * 1. 文章级 description 之前被全局默认值覆盖，未注入 <meta name="description">；
 * 2. 文章级 og:title / og:description / og:url / og:type 缺失；
 * 3. 缺少 canonical 链接，可能导致 index.md 与目录 URL 双路径重复收录；
 * 4. 缺少 JSON-LD 结构化数据（BlogPosting），无法获得富结果展示。
 *
 * 注意：TransformContext 中 title / description 是 VitePress 已计算好的字符串，
 * 页面路径来自 ctx.page（相对 srcDir 的路径），不要使用 pageData.title 等不存在字段。
 */
export function transformHead(ctx: TransformContext): HeadConfig[] {
    const { pageData, page, title, description } = ctx;

    // 计算规范化 URL：去掉 .md 后缀，index 文件归一到目录路径
    const route = (page || "")
        .replace(/\.md$/, "")
        .replace(/(^|\/)index$/, "$1")
        .replace(/\\/g, "/");
    const canonical = `https://rxht.github.io/${route}`.replace(/\/+$/, "");

    const head: HeadConfig[] = [
        ["meta", { name: "description", content: description }],
        ["meta", { property: "og:title", content: title }],
        ["meta", { property: "og:description", content: description }],
        ["meta", { property: "og:url", content: canonical }],
        [
            "meta",
            {
                property: "og:type",
                content: pageData.frontmatter.layout === "home" ? "website" : "article",
            },
        ],
        ["link", { rel: "canonical", href: canonical }],
    ];

    // 为文章页注入 JSON-LD 结构化数据
    const datePublished = pageData.frontmatter.Date;
    const dateModified = pageData.frontmatter.LastEditTime;
    if (pageData.frontmatter.layout !== "home" && datePublished) {
        const jsonLd = {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: title,
            description,
            url: canonical,
            author: { "@type": "Person", name: "荣轩浩[rxht]" },
            datePublished,
            dateModified: dateModified || datePublished,
            inLanguage: "zh-CN",
        };
        head.push([
            "script",
            { type: "application/ld+json" },
            JSON.stringify(jsonLd),
        ]);
    }

    return head;
}
