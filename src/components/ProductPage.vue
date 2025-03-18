<script setup lang="ts">
import * as OpenFoodFact from '@/api/openFoodFacts';
import {onMounted, ref} from "vue";
import IsHalalTags from "@/components/Tags/IsHalalTags.vue";

// Définition du type pour le produit
interface Product {
  barcode: string;
  productName: string;
  companies: string[];
  ingredients: any[];
  imageUrl: string | null;
}

// Initialisation de la variable avec un type correct
let product = ref<Product | null>(null);

onMounted(async () => {
  try {
    const response = await OpenFoodFact.getProductInformations('3017620422003'); // TODO : Remplacer par le barcode du produit qui doit etre passer en parametre de la route
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
    <is-halal-tags :ingredients="product.ingredients"/>
  </div>
  <p v-else>Chargement...</p>
</template>

<style scoped>

</style>