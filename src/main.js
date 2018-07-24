import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue'
import { routes } from './routes';
import * as VueGoogleMaps from "vue2-google-maps";
import VueDisqus from 'vue-disqus'
import firebase from 'firebase';

Vue.use(VueDisqus);

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyDh8N8ZL5QKHNBhEJfovFcJYCGp0vEOews",
    libraries: "places" // necessary for places input
  }
});

Vue.use(VueRouter);


const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
