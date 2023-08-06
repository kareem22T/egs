import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')

window.main_url = 'https://egs23.egyptgamestore.com/api/users'

