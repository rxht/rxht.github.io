import { defineConfig } from 'vitepress';
import { chineseSearchOptimize as customSearchQuery, pagefindPlugin } from 'vitepress-plugin-pagefind';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "rxh wiki",
  description: "A VitePress Site",
  base: '/wiki/', // base 会自动添加到其他选项中以 / 开头的所有 URL 前面，因此只需指定一次。
  srcDir: 'src', // 相对于项目根目录的 markdown 文件所在的文件夹。
  cleanUrls: true, // 当设置为 true 时，VitePress 将从 URL 中删除 .html 后缀。
  lastUpdated: true, // 最近一条内容的更新时间会显示在页面右下角。
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],
    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],
    search: { // 得益于 minisearch，VitePress 支持使用浏览器内索引进行模糊全文搜索。
      provider: 'local'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/rxht/wiki' }
    ],
  },
  markdown: {
    lineNumbers: true,
    container: {
      tipLabel: '提示',
      warningLabel: '警告',
      dangerLabel: '危险',
      infoLabel: '信息',
      detailsLabel: '详细信息'
    },
    image: {
      // 默认禁用；设置为 true 可为所有图片启用懒加载。
      lazyLoading: true
    }
  },
  vite: {
    plugins: [pagefindPlugin({
      btnPlaceholder: '搜索',
      placeholder: '搜索文档',
      emptyText: '空空如也',
      heading: '共: {{searchResult}} 条结果',
      excludeSelector: ['img', 'a.header-anchor'], 
      forceLanguage: 'zh-cn',
      customSearchQuery,
      filter(searchItem, idx, originArray) {
        return !searchItem.route.includes('404')
      }
    })],
  }
})
