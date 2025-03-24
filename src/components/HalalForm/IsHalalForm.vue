<script setup lang="ts">
import {computed, ref} from "vue";
import InputText from "@/components/HalalForm/InputText.vue";
import IsHalalButton from "@/components/Button/IsHalalButton.vue";
import DropZone from "@/components/HalalForm/DropZone.vue";
import InvalidBarcode from "@/components/HalalForm/InvalidBarcode.vue";

const props = defineProps({
  invalidBarcode: {
    type: String,
    default: ""
  }
})

// Stocke le barcode émis par InputText
const barCode = ref("");
const barCodeTrimmed = computed(() => barCode.value.replace(/\s+/g, ""));

</script>

<template>

  <div class="halal-form">
    <InvalidBarcode v-if="props.invalidBarcode" :barcode="props.invalidBarcode"/>
    <DropZone/>
    <InputText v-model:barcode="barCode"/>
    <IsHalalButton :bar-code="barCodeTrimmed"/>
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