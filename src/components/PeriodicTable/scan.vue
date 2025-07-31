<template>
  <div class='w-full flex items-center flex-wrap gap-2'>
    <b>温度</b>
    <div class='space-x-1 flex justify-center items-center'>
      <button class='!border font-bold w-10 rounded-md cursor-pointer' @click="SUB">-</button>
      <input type="range" min="-273" max="5727" :value="temperature" @input="handle" class="w-60 h-2 rounded appearance-none cursor-pointer
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
      <button class='!border font-bold w-10 rounded-md cursor-pointer' @click="ADD">+</button>
    </div>
    <div class='space-x-1'>
      <button class='!border font-bold w-16 rounded-md cursor-pointer' @click="() => temperature = 0">重置</button>
      <input type="number" min="-273" max="5727" :value='temperature' @input="handle" class='!border w-16 text-center rounded-sm' />
      <span>℃</span>
    </div>
    <div class='space-x-1'>
      <input type="number" min="-459" max='10341' :value='F' @input="(e) => handle(e, F2C)" class='!border w-16 text-center rounded-sm' />
      <span>℉</span>
    </div>
    <div class='space-x-1'>
      <input type="number" min="0" max='6000' :value='K' @input="(e) => handle(e, K2C)" class='!border w-16 text-center rounded-sm' />
      <span>𝐊</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';

const temperature = defineModel<number>({ required: true, default: 0 });
const handle = (e: Event, f = (d: number) => d) => temperature.value = f(+(e.target as HTMLInputElement).value);

const ADD = () => ++temperature.value;
const SUB = () => --temperature.value;

// F = C × 9/5 + 32
const F = computed(() => Number(((temperature.value * 9) / 5 + 32).toFixed(0)));
const F2C = (f: number): number => Number((((f - 32) * 5) / 9).toFixed(0));

// K = C + 273
const DEFAULE_K = 273;
const K = computed(() => temperature.value + DEFAULE_K);
const K2C = (k: number): number => k - DEFAULE_K;

</script>
