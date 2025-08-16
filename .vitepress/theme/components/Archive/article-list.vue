<template>
  <div>
    <div class='relative w-full h-[1px] bg-neutral-300 mt-4 mb-6'>
      <div class=' absolute left-1/2 top-1/2 -translate-1/2 px-8 font-bold text-2xl bg-[var(--vp-c-bg-soft)]'>
        {{ year }}
        <span class='text-sm text-neutral-500'> - {{ list.length }}篇</span>
      </div>
    </div>
    <div class='relative flex flex-wrap items-stretch'>
      <div v-for="(data, i) in list" :key='i' class='min-h-full h-auto w-full md:w-1/2 xl:w-1/3 2xl:w-1/4 p-1'>
        <ArticleComponent :data />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Article } from '../../common/article.data.mts';
import { DATE_FORMAT, FormatDate } from '../../common/date.mts';
import ArticleComponent from './article.vue';

defineProps<{
  year: string;
  list: Article[];
}>();
</script>

<style lang="css" scoped></style>
