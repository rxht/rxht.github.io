<template>
    <div class='w-full'>
        <h2 class='h-12'>
            <span class='font-bold text-4xl'>{{ year }}</span>
            <span class='font-bold text-sm text-[var(--vp-c-text-3)]'> - {{ list.length }}篇</span>
        </h2>
        <div class='flex flex-wrap items-stretch'>
            <ArticleComponent :data v-for="(data, i) in list" :key='i' />
        </div>
    </div>
</template>
<script setup lang="ts">
import { Article } from '../../common/article.data.mts';
import ArticleComponent from './article.vue';

defineProps<{
    year: string;
    list: Article[];
}>();
</script>

<style lang="css" scoped></style>
