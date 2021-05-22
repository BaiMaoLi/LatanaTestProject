import { createApp } from 'vue'
// import Vue from 'vue'
import VueLazyload from 'vue3-lazyload'
import App from './App.vue'
let app=createApp(App);
app.use(VueLazyload, {
    preLoad: 1.3,
    error: './404.png',
    loading: './default.png',
    attempt: 1
})
app.mount('#app')
