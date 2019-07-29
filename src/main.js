import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueDisqus from 'vue-disqus'
import { auth } from 'firebase/app'
import VueScrollTo from 'vue-scrollto'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { firestorePlugin } from 'vuefire'

Vue.use(VueScrollTo)
Vue.use(VueDisqus)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyC4hgE393XANjwBWyxW6wEGI3U-TUnVt8c',
    libraries: 'places'
  }
})
Vue.use(firestorePlugin)

// Router guard checks if AuthRequired
router.beforeEach((to, from, next) => {
  let currentUser = auth().currentUser
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !currentUser) {
    next('Login')
  } else if (!requiresAuth && currentUser) {
    next()
  } else {
    next()
  }
})

let app

// Initialize the app after Firebase has iniitalized
auth().onAuthStateChanged(function (user) {
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      render: h => h(App)
    })
  }
})
