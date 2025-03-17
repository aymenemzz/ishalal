<script setup lang="ts">
function handleFileUpload(event) {
  const file = event.target.files[0];
  if (file) {
    console.log('Fichier sélectionné:', file.name);
    // Traitement du fichier ici (upload, aperçu, etc.)
  }
}
</script>


<template>
  <label for="file-upload" class="import-picture-container">
    <div class="import-picture-text">+ Import a barcode picture</div>
    <input type="file" id="file-upload" hidden @change="handleFileUpload"/>
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
