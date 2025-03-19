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
    <div class="column first">

      <div class="nonHalalPictoList">
      </div>
      <img v-if="product.imageUrl" :src="product.imageUrl" alt="image not found" class="product-image"/>

    </div>
    <div class="column second">
      <is-halal-tags :ingredients="product.ingredients" :halal-tag="product.withHalalTag"/>
      <h1 class="product-name">{{ product.productName }}</h1>
      <h4 class="brand-name">{{ product.companies.join(", ") }}</h4>
    </div>

  </div>
  <Loader v-else/>
</template>

<style scoped>
.product-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 1rem;
  color: black;
  height: 80vh;
}

.product-name {
  font-weight: bold;
  font-size: 4rem;
}

.brand-name {
  font-size: 2rem;
}

.product-image {
  max-height: 70vh;
  width: auto;
}

.column {
  display: flex;
  flex-direction: column;
  height: inherit;
  margin: 2%;
}

.first {
  align-items: center;
  justify-content: end;
}


</style>