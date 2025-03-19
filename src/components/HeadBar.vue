<script setup lang="ts">

import NewScanButton from "@/components/Button/NewScanButton.vue";
</script>

<template>
  <div class="head-bar">
    <router-link to="/">
      <div class="title">IsHalal</div>
    </router-link>
    <router-link to="/">
      <new-scan-button/>
    </router-link>

  </div>
</template>

<style scoped>
.title {
  color: #FFA600;
  font-size: 5rem;
}

.head-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #7700A6;
}
</style>