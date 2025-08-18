<template>
  <div class='py-4 px-8 bg-[var(--vp-c-bg-soft)]'>
    <div class="title">
      <h1 class='font-bold! text-2xl!'>
        全部文章<span class='text-sm text-neutral-500'> - {{ posts.articles.length || '' }} 篇</span>
      </h1>
    </div>
    <div>
      <ArchiveList v-for="year in sortedYears" :key='year' :year='year' :list="categorizedTimes[year]" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { Article, data as posts } from '../../common/article.data.mts';
import ArchiveList from './article-list.vue';

// 解析时间并按年分类
const categorizedTimes: { [key: string]: Article[]; } = {};
posts.articles.forEach(item => {
  const { frontmatter } = item;
  const date = new Date(frontmatter.Date || frontmatter.LastEditTime);
  const year = date.getFullYear();
  if (!categorizedTimes[year]) {
    categorizedTimes[year] = [];
  }
  categorizedTimes[year].push(item);
});


// 按时间降序排列每个分类
for (let year in categorizedTimes) {
  categorizedTimes[year].sort((a, b) => {
    const aDate = new Date(a.frontmatter.LastEditTime);
    const bDate = new Date(b.frontmatter.LastEditTime);
    return bDate.getTime() - aDate.getTime();
  });
}

// 按年降序排列
const sortedYears = Object.keys(categorizedTimes).sort((a, b) => parseInt(b) - parseInt(a));
</script>
