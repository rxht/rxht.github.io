import { DefaultTheme } from "vitepress";

/**
 * @param 侧边栏菜单项的配置。
 */
export const sidebar: DefaultTheme.Sidebar = [
    {
        text: 'Examples',
        items: [
            { text: 'Markdown Examples', link: '/markdown-examples' },
            { text: 'Runtime API Examples', link: '/api-examples' }
        ]
    }
]