<template>
    <div class="space-y-4 text-sm mb-4">
        <div class="flex flex-wrap gap-4">
            <p>
                <b>◷ 更新于: </b>
                <span>{{ FormatDate(frontmatter.LastEditTime, DATE_FORMAT) }}</span>
            </p>
            <p>
                <b>🅆 字数: </b>
                <span>{{ wordCount }}</span>
            </p>
            <p>
                <b>🅁 阅读: </b>
                <span id="vercount_value_page_pv" />
            </p>
            <p>
                <b>🅅 访客: </b>
                <span id="vercount_value_page_uv" />
            </p>
        </div>
        <div v-if="frontmatter.tags" class="flex flex-wrap gap-1">
            <Badge type="tip" v-for="tag in frontmatter.tags" :key="tag" :text="tag" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { useData, useRoute } from 'vitepress';
import { DATE_FORMAT, FormatDate } from '../../common/date.mts';
import { onMounted, ref, watch } from 'vue';

const { frontmatter } = useData();
const route = useRoute();
const wordCount = ref(0);
const removeDoms = ['.line-numbers-wrapper', '.header-anchor', '.lang'];
const calculateWordCount = () => {
    const content = document.querySelector('.vp-doc') as HTMLElement;
    if (content) {
        const clonedContent = content.cloneNode(true) as HTMLElement;
        for (const removeDom of removeDoms) {
            const elementsToRemove = clonedContent.querySelectorAll(removeDom);
            elementsToRemove.forEach(el => el.remove());
        }
        const text = clonedContent.innerText.match(/\S/g);
        wordCount.value = text ? text.length : 0;
    } else {
        wordCount.value = 0;
    }
};
onMounted(() => { calculateWordCount(); });
watch(() => route.path, (newPath, oldPath) => calculateWordCount());
</script>
