<template>
  <p>共计 {{ posts.total }} 篇文章</p>
  <div v-for="year in sortedYears" :key="year">
    <span class="font-bold text-2xl">{{ year }}</span>
    <ul class="space-y-4">
      <li v-for="article in categorizedTimes[year]" :key="article.url">
        <div class="flex items-center flex-wrap space-x-2 space-y-2">
          <a :href="article.url" :title="article.frontmatter.title">
            <span class="article-title">{{ article.frontmatter.title }}</span>
          </a>
          <div class="text-sm space-x-1" v-if="article.frontmatter.tags?.length">
            <span class="font-bold">标签:</span>
            <span v-for="tag in article.frontmatter.tags" :key="tag" class="tag-item">
              <Badge type="tip" :text="tag" />
            </span>
          </div>
        </div>
        <span class="text-sm">
          最后更新于: {{ article.frontmatter.LastEditTime }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { Article } from './index.data.mts';
import { data as posts } from './index.data.mts';

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