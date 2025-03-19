<script setup lang="ts">
import {computed} from "vue";
import * as IsHalalProduct from "../../core/IsHalalProduct.ts";
type HalalStatus = IsHalalProduct.HalalStatus;

// Définition des props
const props = defineProps<{
  halalTag: HalalStatus, 
}>();

const halalText = computed(() => {
  if (props.halalTag === 'halal') return 'Halal';
  if (props.halalTag === 'not-halal') return 'Not Halal';
  if (props.halalTag === 'doubtful') return 'Doubtful';
  return '';
});
</script>

<template>
  <div :class="['halal-indicator', halalTag]">
    {{ halalText }}
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

.doubtful {
  background-color: orange;
  color: black;
}
</style>