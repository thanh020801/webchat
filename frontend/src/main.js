import { createApp } from 'vue'
import { createPinia } from 'pinia'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
// import vueStickyScroll from 'vue-sticky-scroll';
import "bootstrap";
import App from './App.vue';
import router from './router';
import './assets/main.css';
import realtime from '@/services/realtime.js'
import {store} from '@/stores/store.js'
const app = createApp(App)
app.config.globalProperties.$socketInstant = realtime()
app.use(VueSweetalert2)
// app.use(vueStickyScroll)
app.use(createPinia())
app.use(router)
app.config.globalProperties.$store = store()

app.mount('#app')
