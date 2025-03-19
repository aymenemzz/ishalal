<script setup lang="ts">

  // Import des fonctions vueJs
  import {useRoute, useRouter} from "vue-router";
  import {onMounted, ref, computed, toRaw} from "vue";

  // Import des scripts
  import * as OpenFoodFact from '@/core/api/openFoodFacts.ts';
  import * as IsHalalProduct from "@/core/IsHalalProduct.ts";
  type HalalStatus = IsHalalProduct.HalalStatus;
  import type {Product} from "@/core/interface/Product.ts";

  // Import des composants
  import Loader from "@/components/loader/Loader.vue";
  import IsHalalTags from "@/components/Tags/IsHalalTags.vue";

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
      router.push({ name: "Home", query: { invalidBarcode: barCode } });
      console.error("Impossible de récupérer les informations du produit", error);
    }
  }, 3000); // 30 secondes d'attente
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
      const nonHalal = IsHalalProduct.getNonHalalIngredients(product.value);
      return nonHalal;
    }
    return [];
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
      <is-halal-tags :halalTag="isHalal"/>
      <h1 class="product-name">{{ product.productName }}</h1>
      <h4 class="brand-name">{{ product.companies.join(", ") }}</h4>
      Show all non halal ingredients
      <ul>
        <li v-for="ingredient in nonHalalIngredients" :key="ingredient">{{ ingredient }}</li>
      </ul>
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