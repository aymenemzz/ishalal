import HomePage from "@/vues/HomePage.vue";
import {createRouter, createWebHistory} from "vue-router";
import ProductPage from "@/vues/ProductPage.vue";

const routes = [
    {path: '/', name: 'Home', component: HomePage},
    {path: '/product/:barCode', name: 'ProductPage', component: ProductPage},
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;