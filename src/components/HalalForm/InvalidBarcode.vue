<script setup lang="ts">

// Définition des props
const props = defineProps({
  barcode: {
    type: String,
    required: true
  }
})

</script>

<template>
  <div :class="['invalid-barcode']">
    <img src="@/assets/icons/warning.svg" alt="Invalid barcode" />
    The barcode {{ props.barcode }} is invalid
  </div>
</template>

<style scoped>
.invalid-barcode {
  display: flex;
  align-items: center;
  width: 90%;
  margin: 20px;
  padding: 10px;
  font-weight: bold;
  font-size: 1.5rem;
  text-align: center;
  border-radius: 5px;
  color: red;
  background-color: rgba(255, 0, 0, 0.5);
}

.invalid-barcode > img{
  margin: 10px;
  margin-right: 20px;
  width: 50px;
  height: 50px;
}

.halal {
  background-color: green;
  color: white;
}

.not-halal {
  background-color: red;
  color: white;
}

.doubtful {
  background-color: orange;
  color: black;
}
</style>