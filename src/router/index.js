import Vue from 'vue'
import Router from 'vue-router'
import Calender from '@/components/Calender'
import EditEvent from '@/components/EditEvent'
import ViewEvent from '@/components/ViewEvent'
import NewEvent from '@/components/NewEvent'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Calender',
      component: Calender
    },
    {
      path: '/new',
      name: 'new-event',
      component: NewEvent
    },
    {
      path: '/edit/:event_id',
      name: 'edit-event',
      component: EditEvent
    },
    {
      path: '/:event_id',
      name: 'view-event',
      component: ViewEvent
    }
  ]
})
