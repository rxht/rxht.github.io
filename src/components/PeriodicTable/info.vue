<template>
  <li class='relative border rounded-sm !mt-0 p-0.5 hover:scale-120 duration-300 cursor-pointer' :class='className' @click="props.click">
    <b v-text='props.atom.atomic' class='block' />
    <abbr v-text='props.atom.symbol' class='block font-bold' />
    <em v-text='props.atom.name' class='block' />
    <data :data-abridged="weight" v-text='weight' class='block text-[8px]' />
    <div v-if="state !== 'Unknown'" class="absolute top-0.5 right-0.5 size-1.5 rounded-full" :class="MatterColor[state]"></div>
  </li>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { AtomType, MatterColor, SeriesColor } from './data';
import { StateOfMatter } from './common';

const props = defineProps<{
  atom: AtomType,
  temperature: number;
  click: () => void;
}>();


const className = computed(() => {
  const { series } = props.atom;
  const classList = [SeriesColor[series]];
  if (series === 'Lanthanoid') classList.push('row-start-9'); // 镧系
  if (series === 'Actinoid') classList.push('row-start-10'); // 锕系
  return classList.join(' ');
});
const weight = computed(() => props.atom.weight.slice(0, 6));
const state = computed(() => StateOfMatter(props.atom, props.temperature));
</script>
