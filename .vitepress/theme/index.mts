// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme';
import { useData, useRoute } from 'vitepress';
import giscusTalk from 'vitepress-plugin-comment-with-giscus';

export default {
    ...DefaultTheme,
    enhanceApp(ctx) {
        DefaultTheme.enhanceApp(ctx);
        // ...
    },
    setup() {
        // Get frontmatter and route
        const { frontmatter, isDark } = useData();
        const route = useRoute();
        
        // Obtain configuration from: https://giscus.app/
        const props = {
            repo: 'rxht/wiki', 
            repoId: 'R_kgDONsocXw',   
            category: 'General', // default: `General` 
            categoryId: 'DIC_kwDONsocX84CmKve', 
            mapping: 'pathname', // default: `pathname`
            inputPosition: 'top', // default: `top`
            lang: 'zh-CN', // default: `zh-CN`
            lightTheme: isDark.value ? 'transparent_light': 'light', // default: `light`
            darkTheme: isDark.value ? 'dark': 'transparent_dark', // default: `transparent_dark`
            // ...
        }
        giscusTalk(props, { frontmatter, route }, true);
    }
};