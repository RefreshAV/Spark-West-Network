import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import VueDisqus from 'vue-disqus'
import { auth } from 'firebase/app'
import VueScrollTo from 'vue-scrollto'
import { firestorePlugin } from 'vuefire'

// Bootstrap
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

// Froala
import VueFroala from 'vue-froala-wysiwyg'
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/themes/dark.min.css'

// Froala Plugins
import CharactersCounter from 'froala-editor/js/plugins/char_counter.min';
import 'froala-editor/css/plugins/char_counter.min.css';

import Colors from 'froala-editor/js/plugins/colors.min.js';
import 'froala-editor/css/plugins/colors.min.css';

import Emoticons from 'froala-editor/js/plugins/emoticons.min.js';
import 'froala-editor/css/plugins/emoticons.min.css';

import FontSize from 'froala-editor/js/plugins/font_size.min.js';
import FontFamily from 'froala-editor/js/plugins/font_family.min.js';

Vue.use(VueFroala, {
  plugins: [
      CharactersCounter,
      Colors,
      Emoticons,
      FontSize,
      FontFamily
  ]
});

Vue.use(VueScrollTo)
Vue.use(VueDisqus)
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
