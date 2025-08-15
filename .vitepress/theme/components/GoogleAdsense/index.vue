<template>
  <div class="gads">
    <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-4811040847504068" data-ad-slot="7140865014" data-ad-format="auto" data-full-width-responsive="true" />
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
  // @ts-ignore
  window?.addGoogleAdsense?.();
});
</script>