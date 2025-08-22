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
  ["link", { rel: "icon", href: "/favicon.ico" }],
  [
    "script",
    { type: "text/javascript" },
    `(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "py6srk3h9m");`,
  ], // Microsoft Clarity
  ["script", { defer: "", async: "", href: "https://static.cloudflareinsights.com/beacon.min.js", 'data-cf-beacon': '{"token": "1bbe18f9faf141ed9b87cfc7e816404a"}' }], // Cloudflare Analytics
  ["script", { async: "", href: "https://www.googletagmanager.com/gtag/js?id=G-C73RJC1NJS" }], // Google Analytics
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
];
export { head };