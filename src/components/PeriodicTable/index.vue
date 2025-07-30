<template>
  <div class='w-full mt-10 space-y-8'>
    <DetailsComponent :atom :temperature />
    <ScanComponent :temperature />
    <TableComponent :temperature :atom />
  </div>
</template>

<script lang="ts" setup>
import { ref, shallowRef } from 'vue';
import DetailsComponent from './details.vue';
import ScanComponent from './scan.vue';
import TableComponent from './table.vue';
import data, { AtomType } from './data';
const atom = shallowRef<AtomType>(data[1]);
const temperature = ref<number>(0);

</script>
