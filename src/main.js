import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {getUser} from './assets/js/get-user'
getUser().then(()=> {
    createApp(App).use(router).mount('#app')
    window.main_url = 'http://api.egyptgamestore.com/api/users'
})

