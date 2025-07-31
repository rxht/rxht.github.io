<template>
  <div class='w-full text-center gap-1 p-4 grid grid-cols-9 grid-rows-3'>
    <div class='hover:scale-120 duration-300 cursor-pointer border rounded-xs p-1 col-start-1 col-span-6 row-start-1 row-span-1 bg-white'>金属</div>
    <div class='hover:scale-120 duration-300 cursor-pointer border rounded-xs p-1 col-start-7 col-span-1 row-start-1 row-span-3' :class="SeriesColor.Metalloid">类金属</div>
    <div class='hover:scale-120 duration-300 cursor-pointer border rounded-xs p-1 col-start-8 col-span-2 row-start-1 row-span-1 bg-white'>非金属</div>
    <div class='hover:scale-120 duration-300 cursor-pointer border rounded-xs p-1 col-start-1 col-span-1 row-start-2 row-span-2' :class="SeriesColor.Alkali">碱金属</div>
    <div class='hover:scale-120 duration-300 cursor-pointer border rounded-xs p-1 col-start-2 col-span-1 row-start-2 row-span-2' :class="SeriesColor.Alkaline">碱土金属</div>
    <div class='hover:scale-120 duration-300 cursor-pointer border rounded-xs p-1 col-start-3 col-span-2 row-start-2 row-span-1' :class="SeriesColor.Lanthanoid">镧系金属</div>
    <div class='hover:scale-120 duration-300 cursor-pointer border rounded-xs p-1 col-start-3 col-span-2 row-start-3 row-span-1' :class="SeriesColor.Actinoid">锕系金属</div>
    <div class='hover:scale-120 duration-300 cursor-pointer border rounded-xs p-1 col-start-5 col-span-1 row-start-2 row-span-2' :class="SeriesColor.Transition">过渡金属</div>
    <div class='hover:scale-120 duration-300 cursor-pointer border rounded-xs p-1 col-start-6 col-span-1 row-start-2 row-span-2' :class="SeriesColor.Poor">贫金属</div>
    <div class='hover:scale-120 duration-300 cursor-pointer border rounded-xs p-1 col-start-8 col-span-1 row-start-2 row-span-2' :class="SeriesColor.Nonmetal">活泼非金属</div>
    <div class='hover:scale-120 duration-300 cursor-pointer border rounded-xs p-1 col-start-9 col-span-1 row-start-2 row-span-2' :class="SeriesColor.Noble">稀有气体</div>
  </div>
</template>
<script lang="ts" setup>
import { SeriesColor } from './data';


</script>
