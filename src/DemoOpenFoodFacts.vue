  <!-- Pour tester ce truc sans routeur, il faut aller dans main.ts, et mettre DemoOpenFoodFacts dans la fonction createApp au lieu de App -->

<script setup lang="ts">
import { ref } from 'vue'
import * as OpenFoodFacts from './api/openFoodFacts.ts';

const barcode = ref('')
let product = ref({})

const searchIngredients = async (barcode: String) => {
  try {
    product.value = await OpenFoodFacts.getProductInformations(barcode);
  } catch (error) {
    console.error(error);
  }
}
</script>


<template>
  <h1>Cunt</h1>
  <h2>Get ingredients from product barcode</h2>
  <form>
    <input type="text" name="barcode" v-model="barcode"/>
    <input type="button" value="Search" @click="searchIngredients(barcode)"/>
  </form>
  <h2>{{ product.productName }}</h2>
  <img :src="product.imageUrl" alt="image not found"/>
    <ul>
      <li class="ingredient" v-for="ingredient in product.ingredients" :key="ingredient.id">
        <span>{{ ingredient.id }}</span>
        <span v-if="ingredient.percent">{{ ingredient.percent }}%</span>
        <span v-else-if="ingredient.percent_estimate">~{{ ingredient.percent_estimate}}%</span>
        <span v-else>(no percentage estimate available)</span>
      </li>
    </ul>
</template>

<style scoped>
  .ingredient > span{
    margin-right: 10px;
  }
</style>