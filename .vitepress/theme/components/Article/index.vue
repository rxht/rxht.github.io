<template>
    <section class="mx-auto w-full max-w-[820px] px-5 sm:max-w-[1080px] sm:px-6 lg:max-w-[1440px] 2xl:max-w-[1760px]">
        <!-- 头部：eyebrow + 标题 + 查看全部 CTA -->
        <header class="mb-10 flex items-end justify-between gap-4 sm:mb-12">
            <div>
                <p class="mb-2 text-[11px] font-medium uppercase tracking-[0.08em] text-[var(--vp-c-brand-1)] tabular-nums">
                    最近更新 · 共 {{ posts.total }} 篇
                </p>
                <h2 class="m-0 text-2xl font-light leading-tight tracking-[-0.6px] text-[var(--vp-c-text-1)] sm:text-3xl 2xl:text-4xl">
                    文章精选
                </h2>
            </div>
            <a class="group inline-flex shrink-0 items-center gap-1.5 text-[15px] font-normal text-[var(--vp-c-brand-1)] no-underline" href="/archive">
                查看全部
                <svg class="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round">
                    <path d="M5 12h14" />
                    <path d="m13 6 6 6-6 6" />
                </svg>
            </a>
        </header>

        <!-- 按年分组的卡片网格 -->
        <div v-for="group in groups" :key="group.year" class="mb-12 last:mb-0">
            <!-- 年份区块小标题 -->
            <div class="mb-5 flex items-center gap-3 sm:mb-6">
                <span class="text-xl font-light tracking-[-0.5px] text-[var(--vp-c-text-1)] tabular-nums sm:text-2xl 2xl:text-3xl">
                    {{ group.year }}
                </span>
                <span class="text-xs font-medium text-[var(--vp-c-text-3)] tabular-nums">
                    {{ group.count }} 篇
                </span>
                <span class="h-px flex-1 bg-[var(--vp-c-divider)]"></span>
            </div>

            <div class="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3 2xl:gap-4">
                <a v-for="item in group.items" :key="item.url" :href="item.url" :title="item.frontmatter.title"
                    class="group block overflow-hidden rounded-[var(--stripe-radius-lg)] border border-[var(--vp-c-divider)] bg-[var(--vp-c-bg)] shadow-[var(--stripe-shadow-1)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--vp-c-brand-1)] hover:shadow-[var(--stripe-shadow-2)]">

                    <!-- 卡片主体 -->
                    <div class="p-5 sm:p-6 size-full">
                        <!-- 软胶囊标签 -->
                        <div v-if="item.tags.length" class="mb-3 flex flex-wrap gap-2">
                            <span v-for="tag in item.tags" :key="tag"
                                class="rounded-[var(--stripe-radius-pill)] bg-[var(--vp-c-brand-soft)] px-2.5 py-0.5 text-xs font-medium text-[var(--vp-c-brand-2)]">
                                {{ tag }}
                            </span>
                        </div>

                        <h3
                            class="m-0 text-base font-normal leading-snug tracking-[-0.3px] text-[var(--vp-c-text-1)] transition-colors duration-200 group-hover:text-[var(--vp-c-brand-1)] sm:text-lg lg:text-xl 2xl:text-2xl">
                            {{ item.frontmatter.title }}
                        </h3>

                        <p v-if="item.frontmatter.description" class="mt-2 text-sm leading-relaxed text-[var(--vp-c-text-3)] line-clamp-2 2xl:mt-3 2xl:text-base">
                            {{ item.frontmatter.description }}
                        </p>

                        <span v-if="item.frontmatter.LastEditTime" class="mt-4 flex items-center gap-1.5 text-xs text-[var(--vp-c-text-3)] tabular-nums">
                            <svg class="h-[13px] w-[13px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="9" />
                                <path d="M12 7v5l3 2" />
                            </svg>
                            {{ item.frontmatter.LastEditTime }}
                        </span>
                    </div>
                </a>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { data as posts } from '../../common/article.data.mts';

const props = withDefaults(defineProps<{ size?: number; }>(), { size: 20 });

interface ArticleItem {
    url: string;
    frontmatter: {
        title: string;
        LastEditTime: string;
        Date?: string;
        description?: string;
        cover?: string;
        image?: string;
        thumbnail?: string;
        tags?: string[];
        [key: string]: any;
    };
    __idx: number;
    cover: string;
    tags: string[];
}

// 扁平列表（保留全局序号用于渐变分配），再按年分组
const all: ArticleItem[] = posts.articles.slice(0, props.size).map((a, i) => ({
    ...a,
    __idx: i,
    cover: a.frontmatter.cover || a.frontmatter.image || a.frontmatter.thumbnail || '',
    tags: Array.isArray(a.frontmatter.tags) ? a.frontmatter.tags : [],
}));

const map: Record<string, ArticleItem[]> = {};
all.forEach((a) => {
    const date = new Date(a.frontmatter.Date || a.frontmatter.LastEditTime);
    const year = String(date.getFullYear());
    (map[year] ||= []).push(a);
});

const groups = Object.keys(map)
    .sort((a, b) => Number(b) - Number(a))
    .map((year) => {
        map[year].sort(
            (x, y) =>
                new Date(y.frontmatter.LastEditTime).getTime() -
                new Date(x.frontmatter.LastEditTime).getTime()
        );
        return { year, count: map[year].length, items: map[year] };
    });
</script>
