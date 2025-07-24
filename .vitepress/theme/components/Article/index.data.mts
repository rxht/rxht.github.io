import { ContentData, createContentLoader } from 'vitepress';
import { statSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { join } from 'node:path';
import { FormatDate } from '../../common/date.mts';

export interface Article {
  frontmatter: {
    title: string;
    LastEditTime: string;
    Date?: string;
    [key: string]: any;
  },
  url: string;
}

declare const data: {
  total: number;
  articles: Article[];
};
export { data };

export default createContentLoader("/**/*.md", {
  includeSrc: true,
  transform(rawPosts) {
    const config = global.VITEPRESS_CONFIG as { site: { base: string; }, srcDir: string; };
    if (!config) {
      throw new Error(
        "content loader invoked without an active vitepress process, or before vitepress config is resolved."
      );
    }
    const cache = new Map<string, string>();
    const baseUrl = config.site.base.replace(/\/$/, '');
    const articles = rawPosts.map((post) => {
      const { frontmatter, src, url } = post;
      normalizeTitle(frontmatter, src!);
      normalizeLastEditTime(frontmatter, url, cache, config.srcDir);
      normalizeUrl(post, url, baseUrl);
      post.src = undefined;
      return post;
    }).sort(normalizeSort);
    return {
      total: rawPosts.length,
      articles: articles
    };
  },
});
function normalizeSort(a: ContentData, b: ContentData): number {
  const { LastEditTime: aLastEditTime } = a.frontmatter;
  const { LastEditTime: bLastEditTime } = b.frontmatter;
  if (aLastEditTime && bLastEditTime) {
    return new Date(bLastEditTime).getTime() - new Date(aLastEditTime).getTime();
  }
  return aLastEditTime ? 1 : bLastEditTime ? -1 : 0;
}
function normalizeTitle(frontmatter: Record<string, any>, fileContent: string) {
  if (frontmatter.title) return;

  const lines = fileContent.split(/\r?\n|\r/).filter(item => item.trim());
  const title = (lines.find(item => item.startsWith('#')) ?? '').replace('#', '').trim();
  frontmatter.title = title;
}
function normalizeLastEditTime(frontmatter: Record<string, any>, url: string, cache: Map<string, string>, srcDir: string) {
  if (frontmatter.LastEditTime) {
    frontmatter.LastEditTime = FormatDate(frontmatter.LastEditTime);
  } else {
    const filePath = normalizePath(url);
    if (!cache.has(filePath)) {
      const LastEditTime = getFileLastEditTime(join(srcDir, filePath));
      cache.set(filePath, LastEditTime);
    }
    frontmatter.LastEditTime = cache.get(filePath);
  }
}

function normalizeUrl(post: ContentData, url: string, base: string) {
  post.url = `${base}${url}`;
}

function normalizePath(filePath: string) {
  return filePath.endsWith('/') ? `${filePath}index.md` : `${filePath}.md`;
}

function getFileLastEditTime(filePath: string) {
  const command = `git --no-pager log -1 --follow --format=%ad --date=iso -- ${filePath}`;
  const gitFileInitTime = execSync(command, { encoding: 'utf8' });
  if (gitFileInitTime) return FormatDate(gitFileInitTime);
  const stat = statSync(filePath);
  const defTime = stat.birthtime.getFullYear() !== 1970 ? stat.birthtime : stat.atime;
  return FormatDate(defTime);
}