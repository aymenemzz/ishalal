<script setup lang="ts">
import {computed, defineProps} from 'vue';
import porkPicto from '@/assets/picto/porkPicto.svg';
import alcoolPicto from '@/assets/picto/alcoolPicto.svg';
import drugsPicto from '@/assets/picto/drugsPicto.svg';
import tobbacoPicto from '@/assets/picto/tobbacoPicto.svg';

const ingredientIcons: Record<string, string> = {
  "en:pork": porkPicto,
  "en:alcohol": alcoolPicto,
  "en:drugs": drugsPicto,
  "en:tobbaco": tobbacoPicto,
};

const props = defineProps<{
  nonHalalIngredients: string[];
}>();

const uniqueNonHalalIngredients = computed(() => {
  return [...new Set(props.nonHalalIngredients)];
});

</script>

<template>
  <div v-if="uniqueNonHalalIngredients.length > 0" class="non-halal-icons">
    <img
        v-for="ingredient in uniqueNonHalalIngredients"
        :key="ingredient"
        :src="ingredientIcons[ingredient]"
        :alt="ingredient"
        class="icon"
    />
  </div>
</template>

<style scoped>
.non-halal-icons {
  display: flex;
  gap: 12px;
}

.icon {
  width: 128px;
  height: 128px;
}
</style>