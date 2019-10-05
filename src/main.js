import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import VueDisqus from 'vue-disqus'
import { auth } from 'firebase/app'
import VueScrollTo from 'vue-scrollto'
import { firestorePlugin } from 'vuefire'
import CKEditor from '@ckeditor/ckeditor5-vue';
import lineClamp from 'vue-line-clamp'

// Bootstrap
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.use(VueScrollTo)
Vue.use(VueDisqus)
Vue.use(firestorePlugin)
Vue.use(CKEditor)
Vue.use(lineClamp)

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
