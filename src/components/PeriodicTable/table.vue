<template>
  <div class='w-full overflow-x-auto'>
    <ol class='w-full min-w-180 grid grid-cols-18 grid-rows-10 gap-1 !list-none text-xs'>
      <div class='col-start-2 col-span-1 row-start-1 row-span-1' />
      <div class='col-start-13 col-span-5 row-start-1 row-span-1'>
        <ElectronConfigurationComponent v-model='highlightConfiguration' />
      </div>
      <div class='col-start-3 col-span-10 row-start-1 row-span-3 flex justify-around items-center'>
        <div class='w-18'>
          <MatterStateComponent v-model='highlightMatter' />
        </div>
        <div class='w-78'>
          <ClassifyComponent v-model="highlightSeries" />
        </div>
      </div>
      <div class='col-start-3 col-span-1 row-start-6 row-span-2' />
      <div class='col-start-1 col-span-18 row-start-8 row-span-1' />
      <div class='col-start-1 col-span-3 row-start-9 row-span-2' />
      <InfoComponent v-for='(atom, i) in data' :key='i' :atom :temperature :highlightConfiguration :highlightMatter
        :highlightSeries :click="() => curr = atom" />
    </ol>
  </div>
</template>
<script lang="ts" setup>
import ElectronConfigurationComponent from './electron-configuration.vue';
import MatterStateComponent from './matter-state.vue';
import ClassifyComponent from './classify.vue';
import InfoComponent from './info.vue';
import data, { AtomType } from './data';
import { ref, shallowRef } from 'vue';

const curr = defineModel<AtomType>({ required: true, default: data[0] });
defineProps<{
  temperature: number;
}>();

const highlightConfiguration = ref<string>('');
const highlightMatter = ref<string>('');
const highlightSeries = shallowRef<string[]>([]);


</script>
