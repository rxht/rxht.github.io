import { createContentLoader } from 'vitepress';
import { statSync } from 'node:fs';
import { execSync } from 'node:child_process';

const cache = new Map<string, any>();
export default createContentLoader("/**/*.md", {
    includeSrc: true,
    transform(rawPosts) {
        return rawPosts.map((post) => {
            if (!post.frontmatter.title) {
                const lines = post.src!.split(/\r?\n|\r/).filter(item => item.trim());
                const title = (lines.find(item => item.startsWith('#')) ?? '').replace('#', '').trim();
                post.frontmatter.title = title;
            }
            if (!post.frontmatter.createDated) {
                const isDir = post.url.endsWith('/');
                const filePath = isDir ? `${post.url}index.md` : `${post.url}.md`;
                if (!cache.has(filePath)) {
                    const createDated = getFileGitDate(`src${filePath}`, true);
                    cache.set(filePath, createDated);
                }
                post.frontmatter.createDated = cache.get(filePath);
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

async function getFileGitDate(filePath: string, isCreateDated: boolean = false) {
    const createDatedCommand = `git log --reverse --follow --format=%ad --date=iso -- ${filePath}`;
    const lastUpdatedCommand = `git --no-pager log -1 --follow --format=%ad --date=iso -- ${filePath}`;
    const command = isCreateDated ? createDatedCommand : lastUpdatedCommand;
    let gitFileInitTime = await execSync(command, { encoding: 'utf8' });
    if (gitFileInitTime && isCreateDated) {
        gitFileInitTime = gitFileInitTime.split('\n').shift()!;
    }
    if (gitFileInitTime) return new Date(gitFileInitTime);
    const stat = statSync(filePath);
    return stat.birthtime.getFullYear() !== 1970 ? stat.birthtime : stat.atime;
}
