import { DefaultTheme } from "vitepress";

/**
 * @param 导航菜单项的配置。
 */
export const nav: DefaultTheme.NavItem[] = [
    { text: "归档", link: "/archive" },
    { text: "MolStar", link: "http://molstar.szbl.ac.cn/viewer/" },
    { text: "10点日报", link: "https://rxht.github.io/ai-hot/" },
    {
        text: "网站·工具",
        items: [
            {
                text: "UI组件库",
                link: "https://rxht.github.io/ui/",
            },
            {
                text: "图片压缩",
                link: "https://rxht.github.io/mazanoke/",
            },
            {
                text: "月球车勘测游戏",
                link: "https://rxht.github.io/moon-rover/",
            },
        ],
    },
    {
        text: "友情链接",
        items: [
            {
                text: "dechinphy",
                link: "https://www.cnblogs.com/dechinphy",
            },
            {
                text: "bgalang",
                link: "https://www.cnblogs.com/bgalang"
            },
            {
                text: "ZHANG Jun's",
                link: "https://zhjun-sci.com/index.html ",
            },
            {
                text: "测试 - Balance",
                link: "https://heshiqi1.github.io/blog/",
            },
            {
                text: "前端 - yyi0708",
                link: "https://github.com/yyi0708",
            },
        ],
    },
];
