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
    component: EventDetail
  },
  {
    path: '/events/list',
    name: 'events-list',
    component: EventList
  },
  {
    path: '/contact',
    name: 'contact',
    component: Contact
  },
  {
    path: '/events/NewEvent',
    name: 'events-new-event',
    component: NewEvent },
  {
    path: '/events/EditEvent/:id',
    name:'EditEvent',
    component: EditEvent
  },
  {
    path: '/SignUp',
    name: 'sign-up',
    component: SignUp,
    meta: {
      requiresVisitor: true,
    }
  },
  {
    path: '/SignUpSuccess',
    name: 'sign-up-success',
    component: SignUpSuccess
  }
];
