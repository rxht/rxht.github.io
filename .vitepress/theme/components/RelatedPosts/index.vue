<template>
  <div v-if="related.length" class="related-posts">
    <h3 class="related-posts__title">相关文章</h3>
    <ul class="related-posts__list">
      <li v-for="item in related" :key="item.url">
        <a :href="item.url">{{ item.frontmatter.title }}</a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useData } from 'vitepress';
import { data as posts } from '../../common/article.data.mts';

const { frontmatter, page } = useData();

interface ArticleItem {
  url: string;
  frontmatter: {
    title: string;
    LastEditTime: string;
    Date?: string;
    description?: string;
    tags?: string[];
  };
}

// 基于 tag 重合度推荐相关文章，排除当前页
const related = computed(() => {
  const currentTags: string[] = Array.isArray(frontmatter.value.tags)
    ? frontmatter.value.tags
    : [];
  if (!currentTags.length) return [];

  const currentUrl = page.value.relativePath.replace(/\.md$/, '').replace(/index$/, '').replace(/\/$/, '');

  const scored: { item: ArticleItem; score: number }[] = [];
  for (const item of posts.articles as ArticleItem[]) {
    const itemUrl = item.url.replace(/\/$/, '');
    if (itemUrl === currentUrl || !item.frontmatter.title) continue;
    const itemTags: string[] = Array.isArray(item.frontmatter.tags)
      ? item.frontmatter.tags
      : [];
    const overlap = currentTags.filter((t) => itemTags.includes(t)).length;
    if (overlap > 0) {
      scored.push({ item, score: overlap });
    }
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 5).map((s) => s.item);
});
</script>

<style scoped>
.related-posts {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--vp-c-divider);
}
.related-posts__title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}
.related-posts__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.related-posts__list a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-size: 0.9rem;
}
.related-posts__list a:hover {
  text-decoration: underline;
}
</style>
