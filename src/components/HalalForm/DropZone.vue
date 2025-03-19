<script setup lang="ts">
import {defineEmits, ref} from "vue";
import decodeBarcodeFromImage from "@/core/api/barcodeReader.ts";

const emit = defineEmits(["barcodeDetected"]);
const selectedFile = ref<File | null>(null);

async function handleFileUpload(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];
    selectedFile.value = file;

    try {
      const barcode = await extractBarcode(file);
      if (barcode) {
        console.log("Code-barres détecté:", barcode);
        emit("barcodeDetected", barcode);
      } else {
        console.log("Aucun code-barres détecté.");
      }
    } catch (error) {
      console.error("Erreur lors de la lecture du code-barres:", error);
    }
  }
}

async function extractBarcode(file: File): Promise<string | null> {
  try {
    const barcode = await decodeBarcodeFromImage(file.webkitRelativePath);
    return barcode;
  } catch (error) {
    console.error("Erreur lors de la lecture du code-barres:", error);
    return null;
  }
}
</script>


<template>
  <label for="file-upload" class="import-picture-container">
    <div class="import-picture-text">+ Import a barcode picture</div>
    <input type="file" id="file-upload" hidden @change="handleFileUpload" accept="image/*"/>
  </label>
</template>


<style scoped>
.import-picture-container {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 5px dashed #000; /* Bordure pointillée noire */
  border-radius: 1rem;
  padding: 0.7rem 1.5rem;
  cursor: pointer;
  width: 90%;
  height: 100%;
  box-sizing: border-box;
}

.import-picture-text {
  font-size: 2.5rem;
  color: #000;
  text-align: center;
}
</style>
