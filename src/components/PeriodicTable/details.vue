<template>
  <div class='w-full flex flex-wrap gap-4'>
    <div class='relative size-40 border rounded-sm !mt-0 p-0.5 hover:scale-110 duration-300 cursor-pointer space-y-0.5' :class="SeriesColor[props.atom.series]">
      <b v-text='props.atom.atomic' class='block' />
      <abbr v-text='props.atom.symbol' class='block font-bold text-4xl' />
      <em v-text='props.atom.name' class='block text-3xl' />
      <data v-text='props.atom.weight' class='block text-md' />
      <data v-text='`发现：公元${props.atom.discover}年`' class='block text-xs' />
      <div class='absolute top-0.5 right-0.5 flex flex-col text-xs text-right'>
        <b v-if="state !== 'Unknown'" v-text='MatterAbbreviation[state]' class='text-xs border rounded-sm p-0.5' />
        <span v-for='(electron, i) in props.atom.electrons' :key='i' v-text='electron' />
      </div>
    </div>
    <div class='w-50 border rounded-sm p-0.5'>
      <div class="flex justify-between items-center">
        <div class="font-bold text-sm">类型</div>
        <div class="text-sm">{{ SeriesData[props.atom.series] }}</div>
      </div>
      <div class="flex justify-between items-center">
        <div class="font-bold text-sm">能级</div>
        <div class="text-sm">{{ props.atom.electrons.join(',') }}</div>
      </div>
      <div class="flex justify-between items-center">
        <div class="font-bold text-sm">电负性</div>
        <div class="text-sm">{{ props.atom.electroneg ?? 'N/A' }}</div>
      </div>
      <div class="flex justify-between items-center" title="K">
        <div class="font-bold text-sm">熔点</div>
        <div class="text-sm">{{ props.atom.melt ?? 'N/A' }}</div>
      </div>
      <div class="flex justify-between items-center" title="K">
        <div class="font-bold text-sm">沸点</div>
        <div class="text-sm">{{ props.atom.boil ?? 'N/A' }}</div>
      </div>
      <div class="flex justify-between items-center" title="K">
        <div class="font-bold text-sm">沸点</div>
        <div class="text-sm">{{ props.atom.boil ?? 'N/A' }}</div>
      </div>
      <div class="flex justify-between items-center" title="kJ/mol">
        <div class="font-bold text-sm">电子亲和能</div>
        <div class="text-sm">{{ props.atom.affinity ?? 'N/A' }}</div>
      </div>
      <div class="flex justify-between items-center" title="kJ/mol">
        <div class="font-bold text-sm">{{ `电离能(${ionizes.length})` }}</div>
        <div class="text-sm">
          <select name="ionize" class="cursor-pointer">
            <option v-for="ionize in ionizes" :key="ionize[0]" :value="ionize[1]">{{ `${ionize[0]}: ${ionize[1]}` }}</option>
          </select>
        </div>
      </div>
    </div>
    <div class='w-50 border rounded-sm p-0.5'>
      2
    </div>
    <div class='w-50 border rounded-sm p-0.5'>4</div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { AtomType, SeriesColor, SeriesData, MatterAbbreviation } from './data';
import { StateOfMatter } from './common';

const props = defineProps<{
  atom: AtomType;
  temperature: number;
}>();

const state = computed(() => StateOfMatter(props.atom, props.temperature));

const ionizes = computed(() => {
  const ionize = props.atom.ionize ?? {};
  return Object.keys(ionize).map(k => [k, Number(ionize[k])]);
});

</script>
