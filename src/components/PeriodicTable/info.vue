<template>
  <li class='border rounded-sm !mt-0 p-0.5 hover:scale-110 duration-300 cursor-pointer' :class='class'>
    <b v-text='atom.atomic' class='block' />
    <abbr v-text='atom.symbol' class='block font-bold' />
    <em v-text='atom.name' class='block' />
    <data :data-abridged="atom.weight" v-text='atom.weight.slice(0, 6)' class='block text-[8px]' />
  </li>
</template>
<script setup lang="ts">
import { AtomType } from './data';

defineProps<{
  atom: AtomType,
  class?: string;
}>();
</script>
