import { createContentLoader } from 'vitepress';

export default createContentLoader("/**/*.md", {
    includeSrc: true,
    transform(rawPosts) {
        return rawPosts.map((post) => {
            if (!post.frontmatter.title) {
                const lines = post.src!.split(/\r?\n|\r/).filter(item => item.trim());
                const title = (lines.find(item => item.startsWith('#')) ?? '').replace('#', '').trim();
                post.frontmatter.title = title;
            }
            post.src = undefined;
            return post;
        }).sort((a, b) => {
            if (a.frontmatter.createDated && b.frontmatter.createDated) {
                return new Date(b.frontmatter.createDated).getTime() - new Date(a.frontmatter.createDated).getTime();
            }
            if (a.frontmatter.lastUpdated && b.frontmatter.lastUpdated) {
                return new Date(b.frontmatter.lastUpdated).getTime() - new Date(a.frontmatter.lastUpdated).getTime();
            }
            return 0;
        }).slice(0, 10);;
    },
});
