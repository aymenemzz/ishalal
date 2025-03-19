<script setup lang="ts">
import {computed} from "vue";
import * as IsHalalProduct from "../../core/IsHalalProduct.ts";

// Définition des props
const props = defineProps<{
  ingredients: any[],
  halalTag: boolean
}>();

// Calcul du statut )halal
const isHalal = computed(() => IsHalalProduct.isHalal(props.ingredients, props.halalTag));
</script>

<template>
  <div :class="['halal-indicator', isHalal ? 'halal' : 'not-halal']">
    {{ isHalal ? 'Halal' : 'Not Halal' }}
  </div>
</template>

<style scoped>
.halal-indicator {
  padding: 10px;
  font-weight: bold;
  font-size: 6rem;
  text-align: center;
  border-radius: 5px;
}

.halal {
  background-color: green;
  color: white;
}

.not-halal {
  background-color: red;
  color: white;
}
</style>