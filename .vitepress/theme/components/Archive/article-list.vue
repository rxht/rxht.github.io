<template>
  <div>
    <div class='relative w-full h-[1px] bg-neutral-300 mt-4 mb-6'>
      <div class=' absolute left-1/2 top-1/2 -translate-1/2 px-8 font-bold text-2xl bg-[var(--vp-c-bg)]'>
        {{ year }}
        <span class='text-sm text-neutral-500'> - {{ list.length }}篇</span>
      </div>
    </div>
    <div class='flex flex-wrap'>
      <div v-for="(data, i) in list" :key='i' class='w-1/5 max-w-1/5 p-1'>
        <a :href='data.url'>
          <section class='border-1 rounded-xl p-4 bg-neutral-700/75 h-40 space-y-2 hover:scale-105 duration-500'>
            <div class='font-bold text-md overflow-hidden line-clamp-1 whitespace-nowrap'
              :title='data.frontmatter.title'>
              {{ data.frontmatter.title }}
            </div>
            <div class=' text-m overflow-hidden line-clamp-2'>{{ data.frontmatter.description }}</div>
            <div class="text-sm space-x-1" v-if="data.frontmatter.tags?.length">
              <span class="font-bold text-xs">标签:</span>
              <span v-for="tag in data.frontmatter.tags" :key="tag">
                <Badge type="tip" :text="tag" />
              </span>
            </div>
            <div class='text-xs'>{{ FormatDate(data.frontmatter.LastEditTime, DATE_FORMAT) }}</div>
          </section>
        </a>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Article } from '../../common/article.data.mts';
import { DATE_FORMAT, FormatDate } from '../../common/date.mts';

defineProps<{
  year: string;
  list: Article[];
}>();
</script>
