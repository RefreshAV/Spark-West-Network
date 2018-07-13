import About from './components/About/About.vue';
import Home from './components/Main/Home.vue';
import Events from './components/Events/Events.vue';
import EventDetail from './components/Events/EventDetail.vue';
import EventList from './components/Events/EventList'
import Contact from './components/Contact/Contact.vue';

export const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/events', component: Events },
  { path: '/events/:id/detail', component: EventDetail },
  { path: '/events/list', component: EventList },
  { path: '/contact', component: Contact }
];
