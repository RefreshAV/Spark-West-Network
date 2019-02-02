import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'
import About from './components/About/About.vue'
import Home from './components/Main/Home.vue'
import Events from './components/Events/Events.vue'
import EventDetail from './components/Events/EventDetail.vue'
import EventList from './components/Events/EventList'
import EditEvent from './components/Events/EditEvent'
import NewEvent from './components/Events/NewEvent'
import Contact from './components/Contact/Contact.vue'
import FAQ from './components/FAQ/FAQ.vue'
import Login from './components/Auth/Login.vue'
import SignUp from './components/Auth/SignUp.vue'
import SignUpSuccess from './components/Auth/SignUpSuccess.vue'
import LogOut from './components/Auth/LogOut.vue'
import Profile from './components/Profile/Profile.vue'
import OrganizationsList from './components/Profile/OrganizationsList'
import OrganizationProfileDetail from './components/Profile/OrganizationProfileDetail'
import NewOrganizationProfile from './components/Profile/NewOrganizationProfile.vue'
import UserList from './components/Profile/UserList.vue'
import UserDetail from './components/Profile/UserDetail.vue'
import EventMap from './components/Events/EventLocations.vue'
import EventGallery from './components/Events/EventGallery.vue'
import firebase from 'firebase'

Vue.use(Router)
Vue.use(Meta)

const routes = [
  // {
  //   path: '*',
  //
  // },
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/FAQ',
    name: 'faq',
    component: FAQ
  },
  {
    path: '/events',
    name: 'events',
    component: Events
  },
  {
    path: '/events/event/:id',
    name: 'event-detail',
    component: EventDetail,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/events/list',
    name: 'events-list',
    component: EventList,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/contact',
    name: 'contact',
    component: Contact

  },
  {
    path: '/events/NewEvent',
    name: 'events-new-event',
    component: NewEvent,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/events/EventMap',
    name: 'event-map',
    component: EventMap,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/events/EditEvent/:id',
    name: 'EditEvent',
    component: EditEvent,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/events/EventGallery',
    name: 'EventGallery',
    component: EventGallery,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/Login',
    name: 'login',
    component: Login
  },
  {
    path: '/SignUp',
    name: 'signup',
    component: SignUp
  },
  {
    path: '/SignUpSuccess',
    name: 'sign-up-success',
    component: SignUpSuccess,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/LogOut',
    name: 'log-out',
    component: LogOut,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/Profile',
    name: 'profile',
    component: Profile,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/Users/',
    name: 'userList',
    component: UserList,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/Users/user/:id',
    name: 'userDetail',
    component: UserDetail,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/Organizations',
    name: 'organizationList',
    component: OrganizationsList,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/Organization/detail/:id',
    name: 'organizationProfileDetail',
    component: OrganizationProfileDetail,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/Organization/New',
    name: 'newOrganizationProfile',
    component: NewOrganizationProfile,
    beforeEnter: (to, from, next) => {
      var user = firebase.auth().currentUser
      if (user) {
        next()
      } else {
        next(false)
      }
    },
    meta: {
      requiresAuth: true
    }
  }
]

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
