<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-16">
        <div v-for="(feature, index) in features" :key="index" class="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-lg transition-transform duration-200 hover:-translate-y-1">
            <!-- Icon -->
            <div class="mb-4 text-3xl" v-if="feature.icon">
                <span v-if="isStringIcon(feature.icon)" class="inline-block w-12 h-12 text-center">
                    {{ feature.icon }}
                </span>
                <img v-else-if="isSrcIcon(feature.icon)" :src="feature.icon.src" :alt="feature.icon.alt || `Feature icon ${index + 1}`" :width="feature.icon.width || '96'"
                    :height="feature.icon.height || '96'" class="object-contain" />
                <picture v-else-if="isThemeIcon(feature.icon)">
                    <source :srcset="feature.icon.dark" media="(prefers-color-scheme: dark)" />
                    <img :src="feature.icon.light" :alt="feature.icon.alt || `Feature icon ${index + 1}`" :width="feature.icon.width || '96'" :height="feature.icon.height || '96'"
                        class="object-contain" />
                </picture>
            </div>

            <!-- Title -->
            <h3 class="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                {{ feature.title }}
            </h3>

            <!-- Details -->
            <p class="text-slate-600 dark:text-slate-300 mb-4" v-html="feature.details" />

            <!-- Link -->
            <a v-if="feature.link" :href="feature.link" :rel="feature.rel" :target="feature.target"
                class="inline-flex items-center text-primary-600 dark:text-primary-400 font-medium hover:text-primary-500 dark:hover:text-primary-300 transition-colors">
                {{ feature.linkText || 'Learn more' }}
                <svg class="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
            </a>
        </div>
    </div>
</template>

<script setup lang="ts">
import { type PropType } from 'vue';

// 定义 FeatureIcon 类型
type FeatureIcon =
    | string
    | { src: string; alt?: string; width?: string; height?: string; }
    | {
        light: string;
        dark: string;
        alt?: string;
        width?: string;
        height?: string;
    };

// 定义 Feature 类型
interface Feature {
    icon?: FeatureIcon;
    title: string;
    details: string;
    link?: string;
    linkText?: string;
    rel?: string;
    target?: string;
}

// 定义 props
const props = defineProps({
    features: {
        type: Array as PropType<Feature[]>,
        required: true,
        validator: (value: Feature[]) => {
            return value.every((feature) => {
                return 'title' in feature && 'details' in feature;
            });
        }
    }
});

// 类型守卫：判断是否为字符串图标
const isStringIcon = (icon: FeatureIcon): icon is string => {
    return typeof icon === 'string';
};

// 类型守卫：判断是否为单个图片图标
const isSrcIcon = (
    icon: Exclude<FeatureIcon, string>
): icon is { src: string; alt?: string; width?: string; height?: string; } => {
    return 'src' in icon;
};

// 类型守卫：判断是否为主题图标（明暗模式）
const isThemeIcon = (
    icon: Exclude<FeatureIcon, string>
): icon is {
    light: string;
    dark: string;
    alt?: string;
    width?: string;
    height?: string;
} => {
    return 'light' in icon && 'dark' in icon;
};
</script>