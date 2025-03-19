<script setup lang="ts">
import * as OpenFoodFact from '@/api/openFoodFacts.ts';
import {onMounted, ref} from "vue";
import IsHalalTags from "@/components/Tags/IsHalalTags.vue";
import type {Product} from "@/core/interface/Product.ts";
import {useRoute} from "vue-router";

// Initialisation de la variable avec un type correct
let product = ref<Product | null>(null);
const route = useRoute();

onMounted(async () => {
  const barCode = route.params.barCode as string;
  try {
    const response = await OpenFoodFact.getProductInformations(barCode);
    if (!response) throw new Error("Réponse invalide de l'API");
    product.value = response;
  } catch (error) {
    console.error("Impossible de récupérer les informations du produit", error);
  }
});
</script>

<template>
  <div class="product-container" v-if="product">
    <h1>{{ product.productName }}</h1>
    <p>Barcode: {{ product.barcode }}</p>
    <p>Companies: {{ product.companies.join(", ") }}</p>
    <img v-if="product.imageUrl" :src="product.imageUrl" alt="image not found"/>
    <is-halal-tags :ingredients="product.ingredients" :halal-tag="product.withHalalTag"/>
  </div>
  <p v-else>Chargement...</p>
</template>

<style scoped>

</style>