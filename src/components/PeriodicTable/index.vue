<template>
  <div class='w-full mt-10 space-y-8'>
    <DetailsComponent :atom='currAtom' />
    <ScanComponent />
    <TableComponent />
  </div>
</template>

<script lang="ts" setup>
import { shallowRef } from 'vue';
import DetailsComponent from './details.vue';
import ScanComponent from './scan.vue';
import TableComponent from './table.vue';
import data, { AtomType } from './data';
const currAtom = shallowRef<AtomType>(data[117]);

</script>
