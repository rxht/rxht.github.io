<template>
  <div class="flex flex-col gap-4">
    <div v-if='!isSupported' v-html='notSupportedText' />
    <div class="flex flex-wrap gap-1">
      <div v-for="(s, i) in SymbolsData" :key="`${i}_${s}`"
        class="w-8 text-center font-bold rounded outline-1 outline-blue-300 hover:bg-blue-400 leading-[1.5]">
        <button @click="copy(s)" class="w-full h-full">{{ s }}</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { hookClipboard } from '../../common/hook';

const { isSupported, notSupportedText, copy } = hookClipboard('字符');
const props = defineProps<{
  symbols: string[] | string;
}>();

const SymbolsData = computed(() => Array.isArray(props.symbols) ? props.symbols : props.symbols.split('').filter(i => !!i));
</script>
