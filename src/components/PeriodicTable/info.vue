<template>
  <li class='relative border rounded-sm !mt-0 p-0.5 hover:scale-120 duration-300 cursor-pointer' :class='className'
    @click="props.click">
    <b v-text='props.atom.atomic' class='block' />
    <abbr v-text='props.atom.symbol' class='block font-bold' />
    <em v-text='props.atom.name' class='block' />
    <data :data-abridged="weight" v-text='weight' class='block text-[8px]' />
    <div class="absolute top-0.5 right-0.5 size-1.5 rounded-full" :class="MatterColor[state]"></div>
  </li>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { AtomType, ConfigurationColor, MatterColor, SeriesColor } from './data';
import { getBlockByConfig, StateOfMatter } from './common';

const props = defineProps<{
  atom: AtomType,
  temperature: number;
  highlightConfiguration: string;
  highlightMatter: string;
  highlightSeries: string[];
  click: () => void;
}>();


const weight = computed(() => props.atom.weight.slice(0, 6));
const state = computed(() => StateOfMatter(props.atom, props.temperature));

const className = computed(() => {
  const { series } = props.atom;

  const isNoneMatterHighlight = props.highlightMatter === '';
  const isMatterHighlight = props.highlightMatter === state.value;

  const block = getBlockByConfig(props.atom);
  const isNoneBlockHighlight = props.highlightConfiguration === '';
  const isBlockHighlight = props.highlightConfiguration === block;

  const isNoneHighlight = props.highlightSeries.length === 0;
  const isHighlight = props.highlightSeries.includes(series);

  const bgColor = (!isNoneMatterHighlight && isMatterHighlight)
    ? MatterColor[state.value] : isNoneMatterHighlight
      ? (!isNoneBlockHighlight && isBlockHighlight)
        ? ConfigurationColor[block] : isNoneBlockHighlight
          ? (isNoneHighlight || isHighlight)
            ? SeriesColor[series] : undefined : undefined : undefined;
  const classList = [bgColor];
  if (series === 'Lanthanoid') classList.push('row-start-9'); // 镧系
  if (series === 'Actinoid') classList.push('row-start-10'); // 锕系
  return classList.join(' ');
});
</script>
