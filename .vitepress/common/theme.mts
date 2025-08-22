
import { DefaultTheme } from 'vitepress';
import { license, repository } from "../../package.json";
import { nav } from "./nav.mts";
import { sidebar } from "./sidebar.mts";
import { socialLinks } from "./socialLinks.mts";

const themeConfig: DefaultTheme.Config = {
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
    level: [2, 3]
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
};
export { themeConfig };