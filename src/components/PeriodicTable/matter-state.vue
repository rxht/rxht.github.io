<template>
  <div class='w-full space-y-2 text-lg'>
    <dl class='cursor-pointer flex items-center space-x-1'>
      <dt class='w-8 border rounded-sm text-center text-white' :class="MatterColor.Solid">C</dt>
      <dd>固体</dd>
    </dl>
    <dl class='cursor-pointer flex items-center space-x-1'>
      <dt class='w-8 border rounded-sm text-center text-white' :class="MatterColor.Liquid">Hg</dt>
      <dd>液体</dd>
    </dl>
    <dl class='cursor-pointer flex items-center space-x-1'>
      <dt class='w-8 border rounded-sm text-center text-white' :class="MatterColor.Gaseous">H</dt>
      <dd>气体</dd>
    </dl>
    <dl class='cursor-pointer flex items-center space-x-1'>
      <dt class='w-8 border rounded-sm text-center' :class="MatterColor.Unknown">Rf</dt>
      <dd>未知</dd>
    </dl>
  </div>
</template>
<script setup lang="ts">
import { MatterColor } from './data';



</script>
