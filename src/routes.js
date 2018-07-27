import About from './components/About/About.vue';
import Home from './components/Main/Home.vue';
import Events from './components/Events/Events.vue';
import EventDetail from './components/Events/EventDetail.vue';
import EventList from './components/Events/EventList';
import EditEvent from './components/Events/EditEvent';
import NewEvent from './components/Events/NewEvent';
import Contact from './components/Contact/Contact.vue';
import FAQ from './components/FAQ/FAQ.vue';
import SignUp from './components/Auth/SignUp.vue';
import SignUpSuccess from './components/Auth/SignUpSuccess.vue';
import LogOut from './components/Auth/LogOut.vue';
import Profile from './components/Profile/Profile.vue';
import OrganizationsList from './components/Profile/OrganizationsList';
import OrganizationProfileDetail from './components/Profile/OrganizationProfileDetail';
import NewOrganizationProfile from './components/Profile/NewOrganizationProfile.vue'
import UserList from "./components/Profile/UserList.vue";
import UserDetail from "./components/Profile/UserDetail.vue"
import EventMap from './components/Events/EventLocations.vue';
import firebase from 'firebase';

export const routes = [
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
    beforeEnter: (to, from, next) => {
      var user = firebase.auth().currentUser;
      if (user) {
        next();
      } else {
        next(false);
      }
    },
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
    component: NewEvent ,
    beforeEnter: (to, from, next) => {
      var user = firebase.auth().currentUser;
      if (user) {
        next();
      } else {
        next(false);
      }
    },
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/events/EventMap',
    name: 'event-map',
    component: EventMap ,
    beforeEnter: (to, from, next) => {
      var user = firebase.auth().currentUser;
      if (user) {
        next();
      } else {
        next(false);
      }
    },
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/events/EditEvent/:id',
    name:'EditEvent',
    component: EditEvent,
    beforeEnter: (to, from, next) => {
      var user = firebase.auth().currentUser;
      if (user) {
        next();
      } else {
        next(false);
      }
    },
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/SignUp',
    name: 'sign-up',
    component: SignUp,
    meta: {
      requiresGuest: true,
    }
  },
  {
    path: '/SignUpSuccess',
    name: 'sign-up-success',
    component: SignUpSuccess,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/LogOut',
    name: 'log-out',
    component: LogOut,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/Profile',
    name:'profile',
    component: Profile,
    beforeEnter: (to, from, next) => {
      var user = firebase.auth().currentUser;
      if (user) {
        next();
      } else {
        next(false);
      }
    },
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/Users/',
    name: 'userList',
    component: UserList
  },
  {
    path: '/Users/user/:id',
    name: 'userDetail',
    component: UserDetail
  },
  {
    path: '/Users/organizations',
    name: 'organizationList',
    component: OrganizationsList
  },
  {
    path: '/Organization/detail/:id',
    name: 'organizationProfileDetail',
    component: OrganizationProfileDetail
  },
  {
    path: '/Organization/New',
    name: 'newOrganizationProfile',
    component: NewOrganizationProfile,
    beforeEnter: (to, from, next) => {
      var user = firebase.auth().currentUser;
      if (user) {
        next();
      } else {
        next(false);
      }
    },
    meta: {
      requiresAuth: true,
    }
  }
];


// // Nav Guard
// routes.beforeEach((to, from, next) => {
//   //Check for requiredAuth guard
//   if(to.match.some(record => record.meta.requiresAuth)) {
//     //Check if not logged in
//     if(!firebase.auth().currentUser) {
//       // Go to login
//       next({
//         path: '/SignUp',
//         query: {
//           redirect: to.fullPath
//         }
//       });
//     } else {
//       // Proceed to route
//       next();
//     }
//   } else if(to.match.some(record => record.meta.requiresGuest)){
//     //Check if not logged in
//     if(firebase.auth().currentUser) {
//       // Go to login
//       next({
//         path: '/',
//         query: {
//           redirect: to.fullPath
//         }
//       });
//     } else {
//       // Proceed to route
//       next();
//     }
//   } else {
//     // Proceed to route
//     next();
//   }
// });
