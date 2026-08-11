<template>
    <div @mouseenter='dormant = true' @mouseleave='dormant = false'
        class="relative size-full transition-all duration-300 bg-linear-163 from-[#533afd] to-[#f96bee] hover:shadow-xl hover:shadow-[rgba(83,58,253,0.35)] border border-[var(--vp-c-divider)] bg-[var(--vp-c-bg)] rounded-md">
        <MacIconsComponent class='z-2' />

        <a :href='data.url'>
            <div class="size-full p-4 pt-8 bg-[var(--vp-c-bg)] rounded-xl transition-all duration-200 hover:rounded-2xl hover:scale-98">
                <section class='space-y-2'>
                    <div class='relative font-bold text-md overflow-hidden line-clamp-1 whitespace-nowrap bg-gradient-to-r from-[#533afd] to-[#665efd] bg-no-repeat bg-bottom-right bg-size-[0_2px] transition-[background-size] duration-1000 hover:bg-bottom-left hover:bg-size-[100%_2px]'
                        :title='data.frontmatter.title'>
                        {{ data.frontmatter.title }}
                    </div>
                    <div class='text-xs overflow-hidden line-clamp-2'>{{ data.frontmatter.description }}</div>
                    <div class="flex overflow-hidden gap-1 flex-wrap" v-if="data.frontmatter.tags?.length">
                        <Badge type="tip" v-for="tag in data.frontmatter.tags" :key="tag" :text="`${tag}`" />
                    </div>
                    <div class='text-xs'>{{ FormatDate(data.frontmatter.LastEditTime, DATE_FORMAT) }}</div>
                </section>
            </div>
        </a>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import MacIconsComponent from './mac-icons.vue';
import { Article } from '../../common/article.data.mts';
import { DATE_FORMAT, FormatDate } from '../../common/date.mts';

const dormant = ref<boolean>();

defineProps<{
    data: Article;
}>()

</script>
