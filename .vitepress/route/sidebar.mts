import { DefaultTheme } from "vitepress";
import { generateSidebar } from 'vitepress-sidebar';

const options = [{
    documentRootPath: 'src',
    scanStartPath: 'guide',
    basePath: '/guide/',
    resolvePath: '/guide/',
    useTitleFromFileHeading: true
},
{
    documentRootPath: 'src',
    scanStartPath: 'config',
    resolvePath: '/config/',
    useTitleFromFrontmatter: true
}];
/**
 * @param 侧边栏菜单项的配置。
 */
export const sidebar: DefaultTheme.Sidebar = generateSidebar(options)