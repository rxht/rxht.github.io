<template>
  <div class='w-full mt-10 space-y-8'>
    <div class='w-full flex flex-wrap gap-4'>
      <div
        class='relative size-40 border rounded-sm !mt-0 p-0.5 hover:scale-110 duration-300 cursor-pointer space-y-0.5'>
        <b v-text='currAtom.atomic' class='block' />
        <abbr v-text='currAtom.symbol' class='block font-bold text-4xl' />
        <em v-text='currAtom.name' class='block text-3xl' />
        <data v-text='currAtom.weight' class='block text-md' />
        <data v-text='`发现：公元${currAtom.discover}年`' class='block text-xs' />
        <div class='absolute top-0.5 right-0.5 flex flex-col text-xs text-right'>
          <b v-text='"气"' class='text-xs border rounded-sm p-0.5' />
          <span v-for='(electron, i) in currAtom.electrons' :key='i' v-text='electron' />
        </div>
      </div>
      <div class=' w-40'>2</div>
      <div class=' w-40'>3</div>
      <div class=' w-40'>4</div>
    </div>
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
      <div class='col-start-3 col-span-10 row-start-1 row-span-3 flex justify-around items-center'>
        <div class='w-18 space-y-2 text-lg'>
          <dl class='cursor-pointer flex items-center space-x-1'>
            <dt class='w-8 border rounded-sm text-center'>C</dt>
            <dd>固体</dd>
          </dl>
          <dl class='cursor-pointer flex items-center space-x-1'>
            <dt class='w-8 border rounded-sm text-center'>Hg</dt>
            <dd>液体</dd>
          </dl>
          <dl class='cursor-pointer flex items-center space-x-1'>
            <dt class='w-8 border rounded-sm text-center'>H</dt>
            <dd>气体</dd>
          </dl>
          <dl class='cursor-pointer flex items-center space-x-1'>
            <dt class='w-8 border rounded-sm text-center'>Rf</dt>
            <dd>未知</dd>
          </dl>
        </div>
        <div class='w-76 text-center gap-1 p-4 grid grid-cols-9 grid-rows-3'>
          <div class='cursor-pointer border rounded-xs p-1 col-start-1 col-span-6 row-start-1 row-span-1'>金属</div>
          <div class='cursor-pointer border rounded-xs p-1 col-start-7 col-span-1 row-start-1 row-span-3'>类金属</div>
          <div class='cursor-pointer border rounded-xs p-1 col-start-8 col-span-2 row-start-1 row-span-1'>非金属</div>
          <div class='cursor-pointer border rounded-xs p-1 col-start-1 col-span-1 row-start-2 row-span-2'>碱金属</div>
          <div class='cursor-pointer border rounded-xs p-1 col-start-2 col-span-1 row-start-2 row-span-2'>碱土金属</div>
          <div class='cursor-pointer border rounded-xs p-1 col-start-3 col-span-2 row-start-2 row-span-1'>镧系金属</div>
          <div class='cursor-pointer border rounded-xs p-1 col-start-3 col-span-2 row-start-3 row-span-1'>锕系金属</div>
          <div class='cursor-pointer border rounded-xs p-1 col-start-5 col-span-1 row-start-2 row-span-2'>过渡金属</div>
          <div class='cursor-pointer border rounded-xs p-1 col-start-6 col-span-1 row-start-2 row-span-2'>贫金属</div>
          <div class='cursor-pointer border rounded-xs p-1 col-start-8 col-span-1 row-start-2 row-span-2'>活泼非金属</div>
          <div class='cursor-pointer border rounded-xs p-1 col-start-9 col-span-1 row-start-2 row-span-2'>稀有气体</div>
        </div>
      </div>
      <div class='col-start-3 col-span-1 row-start-6 row-span-2' />
      <div class='col-start-1 col-span-18 row-start-8 row-span-1' />
      <div class='col-start-1 col-span-3 row-start-9 row-span-2' />
      <li v-for='(atom, i) in data' :key='i'
        class='border rounded-sm !mt-0 p-0.5 hover:scale-110 duration-300 cursor-pointer' :class='dynamicsClass(atom)'>
        <b v-text='atom.atomic' class='block' />
        <abbr v-text='atom.symbol' class='block font-bold' />
        <em v-text='atom.name' class='block' />
        <data :data-abridged="atom.weight" v-text='atom.weight.slice(0, 6)' class='block text-[8px]' />
      </li>
    </ol>
  </div>
</template>

<script lang="ts" setup>
import { shallowRef } from 'vue';
import data, { AtomType } from './data';

const currAtom = shallowRef<AtomType>(data[117]);

function dynamicsClass(atom: AtomType) {
  // 镧系
  if (atom.series === 'Lanthanoid') return 'row-start-9';
  // 锕系
  if (atom.series === 'Actinoid') return 'row-start-10';
}

</script>
