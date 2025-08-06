<template>
  <div class='mb-1'>
    <div v-if='!isSupported' v-html='notSupportedText' />
    <div class='flex flex-wrap gap-1'>
      <div v-for="color in colors" :key='`${color}`' :style="{ backgroundColor: color }" :title='`Copy color: ${color}`'
        @click="copy(color)"
        class='size-20 flex items-end justify-center rounded-xl cursor-pointer hover:scale-105 duration-300'>
        <span class='text-center bg-white/30 dark:bg-black/30 w-full rounded-b-xl'>{{ color }}</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { hookClipboard } from '../../common/hook';

const { isSupported, notSupportedText, copy } = hookClipboard('颜色');

defineProps<{
  colors: Array<string>;
}>();

</script>
