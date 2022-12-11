import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AdminView from '../views/AdminView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'contacts',
      redirect: '/contacts',
      component: HomeView,
      children:[
        // {path: '/chats' ,component: () => import('../components/taskbars/Chats.cpn.vue')},
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
    {
      path: '/viewer/:initialDoc',
      name: 'viewer',
      component: () => import('../views/WebViewerView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      redirect: '/admin/users',
      component: AdminView,
      children:[
        {path: '/admin/users',component: () => import('../components/admin/AdUsers.cpn.vue')},
        {path: '/admin/user/:username',component: () => import('../components/admin/AdUserInfo.cpn.vue')},
        {path: '/admin/groups', component: () => import('../components/admin/AdGroups.cpn.vue') },
        {path: '/admin/messages/:id_message', component: () => import('../components/admin/AdMessages.cpn.vue')},
      ]
    },
  ]
})

export default router
