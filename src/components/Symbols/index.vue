<template>
  <div class="flex flex-col gap-4">
    <div>
      <span v-if="!isSupported">Your browser does not support Clipboard API</span>
      <span v-if="text">已完成拷贝：{{ text }}</span>
    </div>
    <div class="flex flex-wrap gap-1">
      <div v-for="(s, i) in SymoblData" :key="`${i}_${s}`" class="w-8 text-center font-bold rounded outline-1 outline-blue-300 hover:bg-blue-400 leading-[1.5]">
        <button @click="copy(s)" class="w-full h-full">{{ s }}</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useClipboard } from '@vueuse/core';
import { computed } from 'vue';
const { text, isSupported, copy } = useClipboard();
const props = defineProps<{
  symbols: string[] | string;
}>();

const SymoblData = computed(() => Array.isArray(props.symbols) ? props.symbols : props.symbols.split('').filter(i => !!i));
</script>