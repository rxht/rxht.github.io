<template>
  <iframe :src="src" :width="width ?? '100%'" :height="height ?? '500px'" frameborder="0" />
</template>

<script setup lang="ts">

defineProps<{
  src: string;
  width?: string;
  height?: string;
}>();
</script>
