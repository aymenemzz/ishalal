<script setup lang="ts">

</script>

<template>
  <div class="scan-button-container">
    <button class="scan-button">
      <img class="plus-icon" type="svg" src="../../assets/icons/plus.svg" alt="plus icon from apple design">
      Scan product
    </button>
  </div>
</template>

<style scoped>
.scan-button {
  font-size: 3rem;
  background-color: #7700A6;
  cursor: pointer;
  border: white dashed 5px;
  border-radius: 1rem;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 0.7rem;
  white-space: nowrap;
}

.scan-button:hover {
  background-color: #0059ff;
  filter: invert(100%);
}

.scan-button:active {
  transform: scale(0.9);
  transition: transform 0.1s ease-out;
}

.plus-icon {
  margin: 0 1rem;
  width: 3rem;
}
</style>