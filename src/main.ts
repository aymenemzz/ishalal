//import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import Cunt from './DemoOpenFoodFacts.vue'

const app = createApp(Cunt)
app.use(createPinia())
app.mount('#app')
