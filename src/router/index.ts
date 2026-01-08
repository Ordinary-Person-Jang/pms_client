import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/commons/session/LoginPage.vue'
import { SESSION_CONSTANTS } from '@/constants/session/session.ts'
import { sessionCheck } from '@/script/utils/session/SessionUtils.ts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true}
    },
    {
      path: '/about',
      name: 'about',
      meta: { requiresAuth: true, role: 'ADMIN' },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/signin',
      name: 'login',
      component: LoginView,
    },
  ],
})

router.beforeEach((to, from, next) =>{
  const isLoggedIn: boolean = sessionCheck()
  const isAuthRequired = to.matched.some(record => record.meta.requiresAuth)

  if (isAuthRequired && !isLoggedIn) {
    next({ path: SESSION_CONSTANTS.LOGIN_PAGE_URL })
  }
  if (to.path === SESSION_CONSTANTS.LOGIN_PAGE_URL && isLoggedIn) {
    return { path: '/' }
  }
  return true;
})

export default router
