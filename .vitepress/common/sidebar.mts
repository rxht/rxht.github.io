import { DefaultTheme } from "vitepress";
import { generateSidebar } from "vitepress-sidebar";
import { VitePressSidebarOptions } from "vitepress-sidebar/types";

// see: https://vitepress-sidebar.cdget.com/zhHans/guide/options#frontmattertitlefieldname
function getOption(name: string, options: Partial<VitePressSidebarOptions> = {}) {
    return {
        scanStartPath: name,
        basePath: `/${name}/`,
        resolvePath: `/${name}/`,
        documentRootPath: "src",
        useTitleFromFileHeading: true,
        useTitleFromFrontmatter: true,
        useFolderTitleFromIndexFile: true,
        useFolderLinkFromIndexFile: true,
        sortMenusByName: true,
        sortMenusOrderNumericallyFromTitle: true,
        prefixSeparator: "_",
        removePrefixAfterOrdering: true,

        collapsed: true, // 分组折叠 / 展开
        collapseDepth: 2,
        options,
    };
}

const options = [
    getOption("molstar"),
    getOption("javascript"),
    getOption("chemical"),
    getOption("others"),
];

/**
 * @param 侧边栏菜单项的配置。
 * @description 顺序说明
 * 如果想让指定的子路径排序靠前可以在指定的路径下的index.md中的标题改为# 0.{name}，这样就可以实现靠前
 */
export const sidebar: DefaultTheme.Sidebar = generateSidebar(options);
