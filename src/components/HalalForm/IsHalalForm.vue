<script setup lang="ts">

import InputText from "@/components/HalalForm/InputText.vue";
import IsHalalButton from "@/components/Button/IsHalalButton.vue";
import DropZone from "@/components/HalalForm/DropZone.vue";
</script>

<template>

  <div class="halal-form">
    <DropZone/>
    <InputText/>
    <IsHalalButton/>
  </div>

</template>

<style scoped>
.halal-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  padding: 1rem;
  height: 70%;
}
</style>