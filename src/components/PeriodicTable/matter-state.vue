<template>
  <div class='w-full space-y-2 text-lg'>
    <div @mouseenter="handleHighlight('Solid')" @mouseleave="handleHighlight()"
      class='cursor-pointer flex items-center space-x-1'>
      <div class='w-8 border rounded-sm text-center' :class="className('Solid')">C</div>
      <b>固体</b>
    </div>
    <div @mouseenter="handleHighlight('Liquid')" @mouseleave="handleHighlight()"
      class='cursor-pointer flex items-center space-x-1'>
      <div class='w-8 border rounded-sm text-center' :class="className('Liquid')">Hg</div>
      <b>液体</b>
    </div>
    <div @mouseenter="handleHighlight('Gaseous')" @mouseleave="handleHighlight()"
      class='cursor-pointer flex items-center space-x-1'>
      <div class='w-8 border rounded-sm text-center' :class="className('Gaseous')">H</div>
      <b>气体</b>
    </div>
    <div @mouseenter="handleHighlight('Unknown')" @mouseleave="handleHighlight()"
      class='cursor-pointer flex items-center space-x-1'>
      <div class='w-8 border rounded-sm text-center' :class="className('Unknown')">Rf</div>
      <b>未知</b>
    </div>
  </div>
</template>
<script setup lang="ts">
import { MatterColor, MatterType } from './data';

const highlightMatterState = defineModel<string>({ required: true, default: '' });
function handleHighlight(matter?: MatterType) {
  highlightMatterState.value = matter || '';
}
function className(matter: MatterType) {
  const isNoneHighlight = !highlightMatterState.value;
  const isHighlight = highlightMatterState.value === matter;
  return (isNoneHighlight || isHighlight) ? MatterColor[matter] : undefined;
}


</script>
