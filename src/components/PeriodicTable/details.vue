<template>
  <div class='w-full flex flex-wrap gap-4'>
    <div class='relative size-40 border rounded-sm !mt-0 p-0.5 hover:scale-110 duration-300 cursor-pointer space-y-0.5'>
      <b v-text='atom.atomic' class='block' />
      <abbr v-text='atom.symbol' class='block font-bold text-4xl' />
      <em v-text='atom.name' class='block text-3xl' />
      <data v-text='atom.weight' class='block text-md' />
      <data v-text='`发现：公元${atom.discover}年`' class='block text-xs' />
      <div class='absolute top-0.5 right-0.5 flex flex-col text-xs text-right'>
        <b v-text='"气"' class='text-xs border rounded-sm p-0.5' />
        <span v-for='(electron, i) in atom.electrons' :key='i' v-text='electron' />
      </div>
    </div>
    <div class='w-40'>
      <div>
        <div></div>
        <div></div>
      </div>
      <div>
        <div></div>
        <div></div>
      </div>
      <div>
        <div></div>
        <div></div>
      </div>
      <div>
        <div></div>
        <div></div>
      </div>
    </div>
    <div class='w-40'>3</div>
    <div class='w-40'>4</div>
  </div>
</template>
<script setup lang="ts">
import { AtomType } from './data';

defineProps<{
  atom: AtomType;
}>()

</script>
