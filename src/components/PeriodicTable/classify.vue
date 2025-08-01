<template>
  <div class='w-full text-center gap-1 p-4 grid grid-cols-9 grid-rows-3'>
    <div @mouseenter="handleHighlight('Metal')" @mouseleave="handleHighlight()"
      class='hover:scale-120 duration-300 cursor-pointer border rounded-xs p-1 col-start-1 col-span-6 row-start-1 row-span-1 bg-white dark:bg-black'>
      金属</div>
    <div @mouseenter="handleHighlight('Metalloid')" @mouseleave="handleHighlight()"
      class='hover:scale-120 duration-300 cursor-pointer border rounded-xs p-1 col-start-7 col-span-1 row-start-1 row-span-3'
      :class="className('Metalloid')">类金属</div>
    <div @mouseenter="handleHighlight('Nonmetallic')" @mouseleave="handleHighlight()"
      class='hover:scale-120 duration-300 cursor-pointer border rounded-xs p-1 col-start-8 col-span-2 row-start-1 row-span-1 bg-white dark:bg-black'>
      非金属</div>
    <div @mouseenter="handleHighlight('Alkali')" @mouseleave="handleHighlight()"
      class='hover:scale-120 duration-300 cursor-pointer border rounded-xs p-1 col-start-1 col-span-1 row-start-2 row-span-2'
      :class="className('Alkali')">碱金属</div>
    <div @mouseenter="handleHighlight('Alkaline')" @mouseleave="handleHighlight()"
      class='hover:scale-120 duration-300 cursor-pointer border rounded-xs p-1 col-start-2 col-span-1 row-start-2 row-span-2'
      :class="className('Alkaline')">碱土金属</div>
    <div @mouseenter="handleHighlight('Lanthanoid')" @mouseleave="handleHighlight()"
      class='hover:scale-120 duration-300 cursor-pointer border rounded-xs p-1 col-start-3 col-span-2 row-start-2 row-span-1'
      :class="className('Lanthanoid')">镧系金属</div>
    <div @mouseenter="handleHighlight('Actinoid')" @mouseleave="handleHighlight()"
      class='hover:scale-120 duration-300 cursor-pointer border rounded-xs p-1 col-start-3 col-span-2 row-start-3 row-span-1'
      :class="className('Actinoid')">锕系金属</div>
    <div @mouseenter="handleHighlight('Transition')" @mouseleave="handleHighlight()"
      class='hover:scale-120 duration-300 cursor-pointer border rounded-xs p-1 col-start-5 col-span-1 row-start-2 row-span-2'
      :class="className('Transition')">过渡金属</div>
    <div @mouseenter="handleHighlight('Poor')" @mouseleave="handleHighlight()"
      class='hover:scale-120 duration-300 cursor-pointer border rounded-xs p-1 col-start-6 col-span-1 row-start-2 row-span-2'
      :class="className('Poor')">贫金属</div>
    <div @mouseenter="handleHighlight('Nonmetal')" @mouseleave="handleHighlight()"
      class='hover:scale-120 duration-300 cursor-pointer border rounded-xs p-1 col-start-8 col-span-1 row-start-2 row-span-2'
      :class="className('Nonmetal')">活泼非金属</div>
    <div @mouseenter="handleHighlight('Noble')" @mouseleave="handleHighlight()"
      class='hover:scale-120 duration-300 cursor-pointer border rounded-xs p-1 col-start-9 col-span-1 row-start-2 row-span-2'
      :class="className('Noble')">稀有气体</div>
  </div>
</template>
<script lang="ts" setup>
import { SeriesColor, SeriesType } from './data';

const highlightSeries = defineModel<string[]>({ required: true, default: () => [] });

const SeriesMap = {
  Metal: ['Alkali', 'Alkaline', 'Lanthanoid', 'Actinoid', 'Transition', 'Poor'],
  Nonmetallic: ['Nonmetal', 'Noble'],
  Alkali: ['Alkali'],
  Alkaline: ['Alkaline'],
  Lanthanoid: ['Lanthanoid'],
  Actinoid: ['Actinoid'],
  Transition: ['Transition'],
  Poor: ['Poor'],
  Metalloid: ['Metalloid'],
  Nonmetal: ['Nonmetal'],
  Noble: ['Noble'],
};
function handleHighlight(series?: SeriesType | 'Metal' | 'Nonmetallic') {
  highlightSeries.value = SeriesMap[series as SeriesType] ?? [];
}
function className(series: SeriesType) {
  const isNoneHighlight = highlightSeries.value.length === 0;
  const isHighlight = highlightSeries.value.includes(series);
  return (isNoneHighlight || isHighlight) ? SeriesColor[series] : undefined;
}
</script>
