<script setup lang="ts">

</script>

<template>
  <button class="isHalal-button">
    Is Halal ?
    <img src="@/assets/icons/arrow-right.svg" alt="arrow right icon from apple's design system" class="arrow-right-icon"/>
  </button>

</template>

<style scoped>
.isHalal-button {
  font-size: 3rem;
  background-color: #A04DC1;
  cursor: pointer;
  border: solid #7700A6 8px;
  border-radius: 1rem;
  color: #F4B43C;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 0.7rem 1.5rem;
  white-space: nowrap;
}

.isHalal-button:hover {
  background-color: #7700A6;
}

.isHalal-button:active {
  transform: scale(0.9);
  transition: transform 0.1s ease-out;
}

.arrow-right-icon {
  width: 3rem;
  margin-left: 1rem;
}
</style>