<script setup lang="ts">
import {defineEmits, ref} from "vue";

const barcode = ref("");
const emit = defineEmits(["update:barcode"]);

const updateBarcode = (event: Event) => {
  barcode.value = (event.target as HTMLInputElement).value;
  emit("update:barcode", barcode.value);
};
</script>

<template>
  <div class="input-text-container">
    <input
        id="halal-input-barcode"
        class="input-text"
        type="text"
        placeholder="Enter a barcode"
        :value="barcode"
        @input="updateBarcode"
    />
  </div>
</template>

<style scoped>
.input-text-container {
  width: 90%;
  padding: 10px;
  border-radius: 10px; /* Coins légèrement arrondis */
  display: inline-block;
  color: #7700A6;
  font-size: 2rem;
}

.input-text {
  width: 100%;
  padding: 8px 12px;
  border: 5px solid #ccc; /* Bordure grise claire */
  border-radius: 1rem;
  font-size: 1.5rem;
  color: #333;
  outline: none;
  box-sizing: border-box;
}

.input-text::placeholder {
  color: #999;
}

/* Style au focus */
.input-text:focus {
  border-color: #aaa;
  box-shadow: 0 0 3px rgba(170, 170, 170, 0.4);
}

</style>