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
    <div class='w-60 border rounded-sm p-0.5'>
      <div class="flex justify-between items-center">
        <div class="font-bold text-sm">类型</div>
        <div class="text-sm">{{ SeriesData[props.atom.series] || 'N/A' }}</div>
      </div>
      <div class="flex justify-between items-center">
        <div class="font-bold text-sm">能级</div>
        <div class="text-sm">{{ props.atom.electrons.join(',') }}</div>
      </div>
      <div class="flex justify-between items-center">
        <div class="font-bold text-sm">电负性</div>
        <div class="text-sm">{{ props.atom.electroneg || 'N/A' }}</div>
      </div>
      <div class="flex justify-between items-center" title="K">
        <div class="font-bold text-sm">熔点</div>
        <div class="text-sm">{{ props.atom.melt || 'N/A' }}</div>
      </div>
      <div class="flex justify-between items-center" title="K">
        <div class="font-bold text-sm">沸点</div>
        <div class="text-sm">{{ props.atom.boil || 'N/A' }}</div>
      </div>
      <div class="flex justify-between items-center" title="kJ/mol">
        <div class="font-bold text-sm">电子亲和能</div>
        <div class="text-sm">{{ props.atom.affinity || 'N/A' }}</div>
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
    <div class='max-w-160 min-w-60 border rounded-sm p-0.5'>
      <div class="flex justify-between items-center">
        <div class="font-bold text-sm">氧化数</div>
        <div class="text-sm" v-html="oxidation || 'N/A'" />
      </div>
      <div class="flex justify-between items-center">
        <div class="font-bold text-sm">电子排布</div>
        <div class="text-sm">{{ props.atom.electronstring || 'N/A' }}</div>
      </div>
      <div class="flex justify-between items-center space-x-2">
        <div class="font-bold text-sm">完整排布</div>
        <div class="text-xs" v-html="expandedconfig || 'N/A'" />
      </div>
      <div class="flex justify-between items-center space-x-2">
        <div class="font-bold text-sm">量子数</div>
        <div class="text-sm">{{ `n=${props.atom.quantum.n},l=${props.atom.quantum.l},m=${props.atom.quantum.m}` }}</div>
      </div>
      <div class="flex justify-between items-center space-x-2" title="MS/m">
        <div class="font-bold text-sm">导电率</div>
        <div class="text-sm">{{ props.atom?.conductivity?.thermal || 'N/A' }}</div>
      </div>
      <div class="flex justify-between items-center space-x-2" title="W/mK">
        <div class="font-bold text-sm">导热率</div>
        <div class="text-sm">{{ props.atom?.conductivity?.electric || 'N/A' }}</div>
      </div>
    </div>
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
const oxidation = computed(() => (props.atom.oxidation ?? '').split(',').map(i => i.endsWith('c') ? `<b>${i}</b>` : i).join().trim());
const expandedconfig = computed(() => (props.atom.expandedconfig ?? '').split(' ').map(i => {
  const [orbital, layer, electron] = i.split(/([spdf])/);
  return `${orbital}${layer}<sup>${electron}</sup>`;
}).join().trim())

</script>
