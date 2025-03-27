<template>
    <button class="back-to-top" :class="{ visible: isVisible, hover: isHovered }" @click="scrollToTop" @mouseenter="isHovered = true" @mouseleave="isHovered = false" aria-label="返回顶部">
        <div class="progress-ring">
            <svg class="ring" viewBox="0 0 48 48">
                <circle class="ring-background" cx="24" cy="24" r="20" />
                <circle class="ring-progress" cx="24" cy="24" r="20" :style="{ 'stroke-dashoffset': progressOffset }" />
            </svg>
            <svg class="icon" viewBox="0 0 1024 1024">
                <path class='icon-ring' d="M512 0A512 512 0 1 1 0 512 512 512 0 0 1 512 0z" />
                <path class='icon-arrow'
                    d="M675.57181 542.524952a30.378667 30.378667 0 0 1-20.016762-7.533714l-145.627429-127.097905-140.970667 126.829715a30.47619 30.47619 0 0 1-40.764952-45.348572l161.060571-144.847238a30.47619 30.47619 0 0 1 40.423619-0.292571l165.961143 144.871619a30.47619 30.47619 0 0 1-20.065523 53.418666z" />
                <path class='icon-arrow'
                    d="M512.073143 730.745905a30.47619 30.47619 0 0 1-30.476191-30.476191v-182.857143a30.47619 30.47619 0 0 1 60.952381 0v182.857143a30.47619 30.47619 0 0 1-30.47619 30.476191z" />
            </svg>
        </div>
    </button>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';

const isVisible = ref(false);
const isHovered = ref(false);
const fillPercentage = ref(0);

// 预计算圆环周长
const CIRCUMFERENCE = 2 * Math.PI * 20;
const progressOffset = computed(() =>
    CIRCUMFERENCE * (1 - Math.floor(fillPercentage.value / 5) * 5 / 100)  // 将进度离散化，每5%更新一次
);

// 节流的滚动处理
let scrollTimeout: number | null = null;
const handleScroll = () => {
    if (scrollTimeout) return;

    scrollTimeout = window.setTimeout(() => {
        const scrollTop = window.scrollY;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

        fillPercentage.value = Math.min(Math.round((scrollTop / scrollHeight) * 100), 100);
        isVisible.value = scrollTop > 300;

        scrollTimeout = null;
    }, 8);
};

// 优化的滚动动画
const scrollToTop = () => {
    const duration = 750;
    const start = window.scrollY;
    const startPercentage = fillPercentage.value;
    const startTime = performance.now();

    const scroll = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easing = 1 - Math.pow(1 - progress, 3);
        window.scrollTo({ top: start * (1 - easing), behavior: 'auto' });

        // 直接从当前进度值递减
        fillPercentage.value = Math.round(startPercentage * (1 - easing));
        if (progress < 1) requestAnimationFrame(scroll);
    };

    requestAnimationFrame(scroll);
};

onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
});

onUnmounted(() => {
    if (scrollTimeout) window.clearTimeout(scrollTimeout);
    window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.back-to-top {
    position: fixed;
    right: 4rem;
    bottom: 4rem;
    width: 0;
    height: 0;
    border: none;
    background: transparent;
    cursor: pointer;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.3s, transform 0.3s;
    z-index: 1000;
    will-change: transform, opacity;
}


.back-to-top.visible {
    opacity: 1;
    width: 4rem;
    height: 4rem;
    transform: translateY(0);
}


.progress-ring {
    position: relative;
    width: 100%;
    height: 100%;
}


.ring {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);
    will-change: transform;
}


.ring-background {
    fill: none;
    stroke: var(--vp-c-bg-soft);
    stroke-width: 3;
}


.ring-progress {
    fill: none;
    stroke: var(--blue8);
    stroke-width: 3;
    stroke-linecap: round;
    stroke-dasharray: 125.66;
    transition: stroke-dashoffset 0.16s ease-out;
    will-change: stroke-dashoffset;
}


.icon {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 70%;
    height: 70%;
    transform: translate(-50%, -50%);
    will-change: transform;
}


.icon-ring {
    fill: var(--blue8);
}

.icon-arrow {
    fill: var(--app-bg);
}

.back-to-top.hover {
    transform: scale(1.1);
}
</style>
