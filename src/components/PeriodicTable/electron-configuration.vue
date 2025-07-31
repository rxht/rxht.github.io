<template>
  <div class='size-full flex space-x-1 items-center'>
    <div class='text-lg font-bold'>分区：</div>
    <div class='size-fit border rounded-sm p-1 flex space-x-1'>
      <div @mouseenter="handleHighlight('s')" @mouseleave="handleHighlight()"
        class='text-lg align-middle font-bold border rounded-sm size-8 flex justify-center items-center hover:scale-120 duration-300 cursor-pointer'
        :class="className('s')">
        s
      </div>
      <div @mouseenter="handleHighlight('p')" @mouseleave="handleHighlight()"
        class='text-lg align-middle font-bold border rounded-sm size-8 flex justify-center items-center hover:scale-120 duration-300 cursor-pointer'
        :class="className('p')">
        p
      </div>
      <div @mouseenter="handleHighlight('d')" @mouseleave="handleHighlight()"
        class='text-lg align-middle font-bold border rounded-sm size-8 flex justify-center items-center hover:scale-120 duration-300 cursor-pointer'
        :class="className('d')">
        d
      </div>
      <div @mouseenter="handleHighlight('f')" @mouseleave="handleHighlight()"
        class='text-lg align-middle font-bold border rounded-sm size-8 flex justify-center items-center hover:scale-120 duration-300 cursor-pointer'
        :class="className('f')">
        f
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ConfigurationColor, ConfigurationColorType } from './data';

const highlightConfiguration = defineModel<string>({ required: true, default: '' });
function handleHighlight(configuration?: ConfigurationColorType) {
  highlightConfiguration.value = configuration || '';
}
function className(configuration: ConfigurationColorType) {
  const isNoneHighlight = !highlightConfiguration.value;
  const isHighlight = highlightConfiguration.value === configuration;
  return (isNoneHighlight || isHighlight) ? ConfigurationColor[configuration] : undefined;
}
</script>
