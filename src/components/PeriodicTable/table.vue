<template>
  <ol class='w-full min-w-180 grid grid-cols-18 grid-rows-10 gap-1 !list-none text-xs'>
    <div class='col-start-2 col-span-1 row-start-1 row-span-1' />
    <div class='col-start-13 col-span-5 row-start-1 row-span-1' />
    <div class='col-start-3 col-span-10 row-start-1 row-span-3 flex justify-around items-center'>
      <div class='w-18'>
        <MatterStateComponent />
      </div>
      <div class='w-76'>
        <ClassifyComponent />
      </div>
    </div>
    <div class='col-start-3 col-span-1 row-start-6 row-span-2' />
    <div class='col-start-1 col-span-18 row-start-8 row-span-1' />
    <div class='col-start-1 col-span-3 row-start-9 row-span-2' />
    <InfoComponent v-for='(atom, i) in data' :key='i' :atom />
  </ol>
</template>
<script lang="ts" setup>
import MatterStateComponent from './matter-state.vue';
import ClassifyComponent from './classify.vue';
import InfoComponent from './info.vue';
import data, { AtomType } from './data';

defineProps<{
  atom: AtomType,
  temperature: number;
}>()

</script>
