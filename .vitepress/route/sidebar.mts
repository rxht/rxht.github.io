import { DefaultTheme } from "vitepress";
import { generateSidebar } from 'vitepress-sidebar';
import { VitePressSidebarOptions } from "vitepress-sidebar/types";

// see: https://vitepress-sidebar.cdget.com/zhHans/guide/options#frontmattertitlefieldname
const def: Partial<VitePressSidebarOptions> = {
    documentRootPath: 'src',
    useTitleFromFileHeading: true,
    useTitleFromFrontmatter: true,
    useFolderTitleFromIndexFile: true,
    useFolderLinkFromIndexFile: true,
    sortMenusByName: true,
    prefixSeparator: '.',
    removePrefixAfterOrdering: true,
    collapsed: false, // 分组折叠/展开
}
function getOption(name: string, options: Partial<VitePressSidebarOptions> = {}) {
    return { scanStartPath: name, basePath: `/${name}/`, resolvePath: `/${name}/`, ...def, options }
}

const options = [
    getOption('molstar'),
    getOption('code-segment'),
    getOption('vitepress')
];

/**
 * @param 侧边栏菜单项的配置。
 */
export const sidebar: DefaultTheme.Sidebar = generateSidebar(options);
