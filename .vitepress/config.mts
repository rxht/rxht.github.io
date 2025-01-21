import { defineConfig } from 'vitepress';
import { pagefindPlugin } from 'vitepress-plugin-pagefind';
import { license, repository } from '../package.json'
import { nav, sidebar, socialLinks } from './route/index.mts';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "WIKI",
  description: "A VitePress Site",
  base: '/wiki/', // base 会自动添加到其他选项中以 / 开头的所有 URL 前面，因此只需指定一次。
  srcDir: 'src', // 相对于项目根目录的 markdown 文件所在的文件夹。
  cleanUrls: true, // 当设置为 true 时，VitePress 将从 URL 中删除 .html 后缀。
  lastUpdated: true, // 最近一条内容的更新时间会显示在页面右下角。
  themeConfig: {
    // outlineTitle: '本页目录',
    // lastUpdatedText: '上次修改时间',
    // darkModeSwitchLabel: '主题',
    // sidebarMenuLabel: '菜单',
    // returnToTopLabel: '返回顶部',
    // https://vitepress.dev/reference/default-theme-config
    nav,
    sidebar,
    search: { // 得益于 minisearch，VitePress 支持使用浏览器内索引进行模糊全文搜索。
      provider: 'local'
    },
    editLink: {
      pattern: `${repository.url}/edit/main/src/:path`,
      text: '在 GitHub 上编辑此页面'
    },
    socialLinks,

    footer: {
      message: `基于 ${license} 许可发布`,
      copyright: `版权所有 © 2024-${new Date().getFullYear()} 荣轩浩[rxht]`
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    outline: {
      label: '页面导航'
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },

    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
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
      customSearchQuery: (input: string) => {
        const segmenter = new Intl.Segmenter('zh-CN', { granularity: 'word' })
        const result: string[] = []
        for (const it of segmenter.segment(input)) {
            it.isWordLike && result.push(it.segment)
        }
        return result.join(' ');
      },
      filter(searchItem, idx, originArray) {
        return !searchItem.route.includes('404')
      }
    })],
  },
  sitemap: {
    hostname: 'https://rxht.github.io/wiki/'
  }
})
