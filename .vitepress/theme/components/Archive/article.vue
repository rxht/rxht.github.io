<template>
    <div @mouseenter='dormant = true' @mouseleave='dormant = false'
        class="relative size-full rounded-2xl transition-all duration-300 bg-linear-163 from-[#00ff75] to-[#3700ff] hover:shadow-xl hover:shadow-green-500/40">
        <MacIconsComponent class='z-2' />

        <div class="size-full p-4 pt-8 bg-[var(--vp-c-bg)] rounded-xl transition-all duration-200 hover:rounded-2xl hover:scale-98">
            <a :href='data.url'>
                <section class='space-y-2'>
                    <div class='relative font-bold text-md overflow-hidden line-clamp-1 whitespace-nowrap bg-gradient-to-r from-[#ec695c] to-[#61c454] bg-no-repeat bg-bottom-right bg-size-[0_2px] transition-[background-size] duration-1000 hover:bg-bottom-left hover:bg-size-[100%_2px]'
                        :title='data.frontmatter.title'>
                        {{ data.frontmatter.title }}
                    </div>
                    <div class='text-xs overflow-hidden line-clamp-2'>{{ data.frontmatter.description }}</div>
                    <div class="flex overflow-hidden gap-1 flex-wrap" v-if="data.frontmatter.tags?.length">
                        <Badge type="tip" v-for="tag in data.frontmatter.tags" :key="tag" :text="tag" />
                    </div>
                    <div class='text-xs'>{{ FormatDate(data.frontmatter.LastEditTime, DATE_FORMAT) }}</div>
                </section>
            </a>
        </div>
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
