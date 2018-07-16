import About from './components/About/About.vue';
import Home from './components/Main/Home.vue';
import Events from './components/Events/Events.vue';
import EventDetail from './components/Events/EventDetail.vue';
import EventList from './components/Events/EventList';
import EditEvent from './components/Events/EditEvent';
import NewEvent from './components/Events/NewEvent';
import Contact from './components/Contact/Contact.vue';
import SignUp from './components/Auth/SignUp.vue';
import SignUpSuccess from './components/Auth/SignUpSuccess.vue';

export const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/FAQ', component: FAQ },
  { path: '/events', component: Events },
  { path: '/events/event/:id', name: 'event-detail', component: EventDetail },
  { path: '/events/list', component: EventList },
  { path: '/contact', component: Contact },
  { path: '/events/NewEvent', component: NewEvent },
  { path: '/events/EditEvent/:id', name:'EditEvent', component: EditEvent },
  { path: '/auth', component: SignUp },
  { path: '/success', component: SignUpSuccess }
];
