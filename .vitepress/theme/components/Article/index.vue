<template>
    <p class="total-article">共计 {{ posts.total }} 篇文章</p>
    <div class="article-year-container" v-for="year in sortedYears" :key="year">
        <span class="article-year">{{ year }}</span>
        <ul>
            <li v-for="article in categorizedTimes[year]" :key="article.url">
                <div class="article-title-container">
                    <a :href="article.url" :title="article.frontmatter.title">
                        <span class="article-title">{{ article.frontmatter.title }}</span>
                    </a>
                    <span class="article-tags" v-if="article.frontmatter.tags?.length">
                        <span class="tag-label">标签:</span>
                        <span v-for="tag in article.frontmatter.tags" :key="tag" class="tag-item">
                            <Badge type="tip" :text="tag" />
                        </span>
                    </span>
                </div>
                <span class="article-update">
                    最后更新于: {{ normalizeDate(article.frontmatter.LastEditTime) }}
                </span>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { Article } from './index.data.mts';
import { data as posts } from './index.data.mts';

// 解析时间并按年分类
const categorizedTimes: { [key: string]: Article[] } = {};
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

const normalizeDate = (date: Date) => {
    if (!date) return '';
    const _date = new Date(date);
    return `${_date.getFullYear()}/${_date.getMonth() + 1}/${_date.getDate()} ${_date.getHours()}:${_date.getMinutes()}:${_date.getSeconds()}`
}

</script>

<style scoped>
.total-article {}

.article-year-container {}

.article-year {
    font-size: 130%;
    font-weight: bolder;
}

.article-title-container {}

.article-title {}

.article-tags {
    font-size: 80%;
    margin-left: 16px;
}

.article-update {
    font-size: 80%;
}
</style>
