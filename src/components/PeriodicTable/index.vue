<template>
  <div class='w-full'>
    <div class='w-full flex items-center flex-wrap gap-2'>
      <b>温度</b>
      <div class='space-x-1 flex justify-center items-center'>
        <button class='!border font-bold w-10 rounded-md cursor-pointer'>-</button>
        <input type="range" min="-273" max="5727" value="0" class="w-60 h-2 rounded appearance-none cursor-pointer
           bg-transparent
           /* 轨道渐变 */
           [&::-webkit-slider-runnable-track]:bg-[linear-gradient(to_right,rgb(100,100,255),rgb(238,238,238),yellow,orange,red)]
           [&::-webkit-slider-runnable-track]:h-2
           [&::-webkit-slider-runnable-track]:rounded
  
           /* WebKit 长方体滑块 */
           [&::-webkit-slider-thumb]:-mt-1     /* 垂直居中 */
           [&::-webkit-slider-thumb]:w-6        /* 宽 */
           [&::-webkit-slider-thumb]:h-3        /* 高 */
           [&::-webkit-slider-thumb]:rounded-md /* 圆角 */
           [&::-webkit-slider-thumb]:bg-indigo-600
           [&::-webkit-slider-thumb]:shadow-md
  
           /* Firefox 轨道渐变 */
           [&::-moz-range-track]:bg-[linear-gradient(to_right,rgb(100,100,255),rgb(238,238,238),yellow,orange,red)]
           [&::-moz-range-track]:h-2
           [&::-moz-range-track]:rounded
  
           /* Firefox 长方体滑块 */
           [&::-moz-range-thumb]:w-6
           [&::-moz-range-thumb]:h-3
           [&::-moz-range-thumb]:rounded-md
           [&::-moz-range-thumb]:bg-indigo-600
           [&::-moz-range-thumb]:shadow-md
  " />
        <button class='!border font-bold w-10 rounded-md cursor-pointer'>+</button>
      </div>
      <div class='space-x-1'>
        <button class='!border font-bold w-16 rounded-md cursor-pointer'>重置</button>
        <input type="number" min="-273" max="5727" value='0' class='!border w-16 text-center rounded-sm' />
        <span>℃</span>
      </div>
      <div class='space-x-1'>
        <input type="number" min="-459" max='10341' value='32' class='!border w-16 text-center rounded-sm' />
        <span>℉</span>
      </div>
      <div class='space-x-1'>
        <input type="number" min="0" max='6000' value='273' class='!border w-16 text-center rounded-sm' />
        <span>𝐊</span>
      </div>
    </div>
    <ol class='w-full min-w-180 grid grid-cols-18 grid-rows-10 gap-1 !list-none text-xs'>
      <div class='col-start-2 col-span-1 row-start-1 row-span-1' />
      <div class='col-start-13 col-span-5 row-start-1 row-span-1' />
      <div class='col-start-3 col-span-10 row-start-1 row-span-3' />
      <div class='col-start-3 col-span-1 row-start-6 row-span-2' />
      <div class='col-start-1 col-span-18 row-start-8 row-span-1' />
      <div class='col-start-1 col-span-3 row-start-9 row-span-2' />
      <li v-for='(atom, i) in data' :key='i'
        class=' border rounded-sm !mt-0 p-0.5 hover:scale-110 duration-300 cursor-pointer' :class='dynamicsClass(atom)'>
        <b v-text='atom.atomic' class='block' />
        <abbr v-text='atom.symbol' class='block font-bold' />
        <em v-text='atom.name' class='block' />
        <data :data-abridged="atom.weight" v-text='atom.weight.slice(0, 6)' class='block text-[8px]' />
      </li>
    </ol>
  </div>
</template>

<script lang="ts" setup>
import data, { AtomType } from './data';

function dynamicsClass(atom: AtomType) {
  // 镧系
  if (atom.series === 'Lanthanoid') return 'row-start-9';
  // 锕系
  if (atom.series === 'Actinoid') return 'row-start-10';

}
</script>
