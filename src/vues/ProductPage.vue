<script setup lang="ts">

// Import des fonctions vueJs
import {useRoute, useRouter} from "vue-router";
import {computed, onMounted, ref} from "vue";

// Import des scripts
import * as OpenFoodFact from '@/core/api/openFoodFacts.ts';
import * as IsHalalProduct from "@/core/IsHalalProduct.ts";
import type {Product} from "@/core/interface/Product.ts";

// Import des composants
import Loader from "@/components/loader/Loader.vue";
import IsHalalTags from "@/components/Tags/IsHalalTags.vue";
import NonHalalPicto from "@/components/Tags/NonHalalPicto.vue";
import HalalIndicatorDescription from "@/components/Tags/HalalIndicatorDescription.vue";

type HalalStatus = IsHalalProduct.HalalStatus;

// Initialisation de la variable avec un type correct
let product = ref<Product | null>(null);
const route = useRoute();
const router = useRouter();

onMounted(() => {
  const barCode = route.params.barCode as string;

  setTimeout(async () => {
    try {
      const response = await OpenFoodFact.getProductInformations(barCode);
      if (!response) throw new Error("Réponse invalide de l'API");
      product.value = response;
    } catch (error) {
      router.push({name: "Home", query: {invalidBarcode: barCode}});
      console.error("Impossible de récupérer les informations du produit", error);
    }
  }, 30000); // 30 secondes d'attente pour montrer qu'on sait le faire et pour la musique
});


// Calcul du statut halal
const isHalal = computed(() => {
  if (product.value) {
    return IsHalalProduct.isHalal(product.value);
  }
  return "doubtful"; // or any default value you prefer
});

const nonHalalIngredients = computed(() => {
  if (product.value) {
    return IsHalalProduct.getNonHalalIngredients(product.value);
  }
  return [];
});

</script>

<template>

  <div class="product-container" v-if="product">
    <div class="column first">

      <div>
        <non-halal-picto :non-halal-ingredients="nonHalalIngredients"/>
      </div>
      <img v-if="product.imageUrl" :src="product.imageUrl" alt="image not found" class="product-image"/>

    </div>
    <div class="column second">
      <is-halal-tags :halalTag="isHalal"/>
      <div class="product-name-and-brand">
        <h1 class="product-name">{{ product.productName }}</h1>
        <h4 class="brand-name">{{ product.companies.join(", ") }}</h4>
      </div>

      <halal-indicator-description :status="isHalal" :non-halal-ingredients="nonHalalIngredients" class="halal-indicator-description"/>
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
  font-weight: bold;
}

.column {
  display: flex;
  flex-direction: column;
  margin: 2%;
}

.product-image {
  max-height: 80%;
  max-width: 80%;
  height: 100%;
  object-fit: contain; /* Assure que l'image est contenue sans déformation */
}

.first {
  align-items: center;
  justify-content: space-evenly;
}

.halal-indicator-description {
  margin-top: 3rem;
  font-size: 2rem;
}

.product-name-and-brand {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

</style>