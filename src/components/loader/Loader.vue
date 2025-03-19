<script setup lang="ts">
import {onMounted, onUnmounted} from "vue";

let audio: HTMLAudioElement;

onMounted(() => {
  audio = new Audio(new URL("@/assets/audio/loading-music.mp3", import.meta.url).href);
  audio.loop = true;
  audio.play().catch(err => console.error("Erreur de lecture audio:", err));
});

onUnmounted(() => {
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }
});
</script>

<template>
  <div class="loader-container">
    <div class="loader"></div>
  </div>
</template>

<style scoped>
.loader-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  height: 100%;
  padding: 5rem;
}

.loader {
  border: 12px solid #f3f3f3;
  border-top: 12px solid #3498db;
  border-radius: 50%;
  width: 512px;
  height: 512px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>