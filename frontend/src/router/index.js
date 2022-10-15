import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'chats',
      redirect: '/contacts',
      component: HomeView,
      children:[
        {path: '/chats' ,component: () => import('../components/taskbars/Chats.cpn.vue')},
        {path: '/groups',component: () => import('../components/taskbars/Groups.cpn.vue')},
        {path: '/contacts', component: () => import('../components/taskbars/Contacts.cpn.vue')},
        {path: '/profile' , component: () => import('../components/taskbars/Profile.cpn.vue')}
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },

  ]
})

export default router
