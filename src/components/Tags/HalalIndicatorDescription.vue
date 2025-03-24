<script setup lang="ts">
import {computed} from "vue";
import type {HalalStatus} from "@/core/IsHalalProduct.ts";

const props = defineProps<{
  status: HalalStatus;
  nonHalalIngredients?: string[];
}>();

const nonHalalReasons = computed(() => {
  return [...new Set(props.nonHalalIngredients || [])]
      .map(ingredient => ingredientTranslations[ingredient] || ingredient)
      .join(", ");
});

const ingredientTranslations: Record<string, string> = {
  "en:pork": "Pork",
  "en:alcohol": "Alcohol",
  "en:drugs": "Drugs",
  "en:tobacco": "Tobacco",
};

</script>

<template>
  <div>
    <p v-if="status === 'halal'">
      Our AI agent has recognized this product as <strong style="color:green;">Halal</strong>
      because it does not contain any illicit substances, and the company's economy is also considered Halal.
      <a href="#">(More info here)</a>
    </p>

    <p v-if="status === 'doubtful'">
      Our AI agent has reconized this product as <strong style="color:orange;">Doubtful</strong>
      <a href="#">(More info here)</a> because we cannot extract the list of ingredient about this product.
    </p>

    <p v-if="status === 'not-halal'">
      Our AI agent has recognized this product as <strong style="color:red;">Not Halal</strong>
      because it contains <strong style="color:red;">{{ nonHalalReasons }}</strong>.
    </p>
  </div>
</template>

<style scoped>

</style>