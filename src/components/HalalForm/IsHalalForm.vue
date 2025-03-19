<script setup lang="ts">
import {ref} from "vue";
import InputText from "@/components/HalalForm/InputText.vue";
import IsHalalButton from "@/components/Button/IsHalalButton.vue";
import DropZone from "@/components/HalalForm/DropZone.vue";

// Stocke le barcode émis par InputText
const barCode = ref("");
</script>

<template>

  <div class="halal-form">
    <DropZone/>
    <InputText v-model:barcode="barCode"/>
    <IsHalalButton :bar-code="barCode"/>
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