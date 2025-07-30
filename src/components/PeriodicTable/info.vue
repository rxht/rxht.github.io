<template>
  <li class='border rounded-sm !mt-0 p-0.5 hover:scale-110 duration-300 cursor-pointer' :class='className'>
    <b v-text='props.atom.atomic' class='block' />
    <abbr v-text='props.atom.symbol' class='block font-bold' />
    <em v-text='props.atom.name' class='block' />
    <data :data-abridged="weight" v-text='weight' class='block text-[8px]' />
  </li>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { AtomType } from './data';

const props = defineProps<{
  atom: AtomType,
}>();

const className = computed(() => {
  const { series } = props.atom;
  if (series === 'Lanthanoid') return 'row-start-9'; // 镧系
  if (series === 'Actinoid') return 'row-start-10'; // 锕系
});
const weight = computed(() => props.atom.weight.slice(0, 6));
</script>
