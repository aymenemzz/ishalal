<script setup lang="ts">
import * as OpenFoodFact from '@/core/api/openFoodFacts.ts';
import {onMounted, ref} from "vue";
import Loader from "@/components/loader/Loader.vue";
import type {Product} from "@/core/interface/Product.ts";
import {useRoute} from "vue-router";
import IsHalalTags from "@/components/Tags/IsHalalTags.vue";

// Initialisation de la variable avec un type correct
let product = ref<Product | null>(null);
const route = useRoute();

onMounted(() => {
  const barCode = route.params.barCode as string;

  setTimeout(async () => {
    try {
      const response = await OpenFoodFact.getProductInformations(barCode);
      if (!response) throw new Error("Réponse invalide de l'API");
      product.value = response;
    } catch (error) {
      console.error("Impossible de récupérer les informations du produit", error);
    }
  }, 30000); // 30 secondes d'attente
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
  <Loader v-else/>
</template>

<style scoped>

</style>