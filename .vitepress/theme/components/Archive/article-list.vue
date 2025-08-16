<template>
  <div>
    <div class='relative w-full h-[1px] bg-neutral-300 mt-4 mb-6'>
      <div class=' absolute left-1/2 top-1/2 -translate-1/2 px-8 font-bold text-2xl bg-[var(--vp-c-bg-soft)]'>
        {{ year }}
        <span class='text-sm text-neutral-500'> - {{ list.length }}篇</span>
      </div>
    </div>
    <div class='relative flex flex-wrap'>
      <div v-for="(data, i) in list" :key='i' class='w-full md:w-1/2 xl:w-1/3 2xl:w-1/4 p-1'>
        <div
          class='rounded-2xl hover:scale-110 duration-500 p-4 bg-[var(--vp-c-bg)] shadow-xs shadow-[var(--vp-c-bg-reverse-rgb)]/5 dark:shadow-white/5 hover:shadow-xl hover:shadow-[var(--vp-c-bg-reverse-rgb)]/10 hover:dark:shadow-white'>
          <a :href='data.url'>
            <section class='space-y-2'>
              <div class='relative font-bold text-md overflow-hidden line-clamp-1 whitespace-nowrap'
                :title='data.frontmatter.title'>
                {{ data.frontmatter.title }}
              </div>
              <div class='text-xs overflow-hidden line-clamp-2'>{{ data.frontmatter.description }}</div>
              <div class="flex overflow-hidden gap-1" v-if="data.frontmatter.tags?.length">
                <Badge type="tip" v-for="tag in data.frontmatter.tags" :key="tag" :text="tag" />
              </div>
              <div class='text-xs'>{{ FormatDate(data.frontmatter.LastEditTime, DATE_FORMAT) }}</div>
            </section>
          </a>
        </div>
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

<style lang="css" scoped></style>
