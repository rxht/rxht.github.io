<template>
    <div class="note-index">
        <p class="total-posts marker-fakeTitle">共计 {{ posts.length }} 篇文章</p>
    </div>
</template>

<script setup>
import { data as posts } from './index.data.mts';
console.log('🚀 ~ posts:', posts)

</script>

<style scoped>
.total-posts {
    margin-bottom: 1rem;
}

h2.noteIndex-h2 {
    font-weight: bold;
    font-size: 1.5em;
    margin-top: 20px;
}
</style>
