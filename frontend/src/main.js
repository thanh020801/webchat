import { createApp } from 'vue'
import { createPinia } from 'pinia'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
// import 'mdbootstrap/css/bootstrap.css';
import "bootstrap"
import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(VueSweetalert2)
app.use(createPinia())
app.use(router)

app.mount('#app')
