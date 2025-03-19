<script setup lang="ts">

import { useRoute } from "vue-router";
import IsHalalForm from "@/components/HalalForm/IsHalalForm.vue";

const route = useRoute();
const invalidBarcode = route.query.invalidBarcode as string;
</script>

<template>
  <IsHalalForm :invalidBarcode="invalidBarcode"/>
</template>

<style scoped>

</style>