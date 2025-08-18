<template>
  <div class='absolute top-0 right-0'>
    <div v-if='dormant' class=" absolute top-2 right-2 size-1.5 bg-green-500 rounded-3xl flex justify-center items-center 
    before:absolute before:content-[''] before:size-[1px] before:bg-green-500 before:rounded-3xl point" />
    <template v-else>
      <div class="absolute top-1 right-1 text-xs opacity-0 zc-1">Z</div>
      <div class="absolute top-1 right-1 text-xs opacity-0 zc-2">Z</div>
      <div class="absolute top-1 right-1 text-xs opacity-0 zc-3">Z</div>
      <div class="absolute top-1 right-1 text-xs opacity-0 zc-4">Z</div>
    </template>
  </div>
</template>
<script setup lang="ts">

defineProps<{
  dormant?: boolean;
}>()

</script>
<style lang="css" scoped>
.point::before {
  animation: loop 1s 0s infinite;
}

@keyframes loop {
  0% {
    background-color: rgb(0, 255, 0);
    width: 1px;
    height: 1px;
  }

  100% {
    background-color: rgba(0, 255, 0, 0);
    width: 30px;
    height: 30px;
  }
}

.zc-1 {
  animation: sway 2s ease-out infinite;
}

.zc-2 {
  animation: sway 2s ease-out 0.5s infinite;
}

.zc-3 {
  animation: sway 2s ease-out 1s infinite;
}

.zc-4 {
  animation: sway 2s ease-out 1.5s infinite;
}

@keyframes sway {
  0% {
    transform: translate(0, 0) rotate(0deg);
    opacity: 1;
  }

  100% {
    transform: translate(30px, -40px) rotate(30deg);
    opacity: 0;
  }
}
</style>
