import { DefaultTheme } from "vitepress";

/**
 * @param 导航菜单项的配置。
 */
export const nav: DefaultTheme.NavItem[] = [
  { text: "MolStar", link: "http://molstar.szbl.ac.cn/viewer/" },
  { text: "UI组件库", link: "https://rxht.github.io/ui/" },
  {
    text: "友情链接", items: [
      {
        text: "测试 - Balance",
        link: "https://heshiqi1.github.io/blog/"
      },
      {
        text: "前端 - Chatty garden",
        link: "https://yyi0708.github.io/chatty-garden/"
      }
    ]
  },
  ]