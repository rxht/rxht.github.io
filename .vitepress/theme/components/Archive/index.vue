<template>
    <div class='py-4 px-8'>
        <h1 class="text-center">
            <span class='font-bold text-5xl!'>全部文章</span>
            <span class='font-bold text-md text-[var(--vp-c-text-3)]'> - {{ posts.articles.length || '' }} 篇</span>
        </h1>
        <div class='flex flex-col gap-16'>
            <div class='w-full' v-for="year in sortedYears" :key='year' :year='year'>
                <h2 class='h-12'>
                    <span class='font-bold text-4xl'>{{ year }}</span>
                    <span class='font-bold text-sm text-[var(--vp-c-text-3)]'> - {{ categorizedTimes[year].length }}篇</span>
                </h2>
                <div class='flex flex-wrap items-stretch'>
                    <ArticleComponent :data v-for="(data, i) in categorizedTimes[year]" :key='i' />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { Article, data as posts } from '../../common/article.data.mts';
import ArticleComponent from './article.vue';

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
