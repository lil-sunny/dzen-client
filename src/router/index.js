import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Auth/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Auth/RegisterView.vue'),
    },

    {
      path: '/post/:id',
      name: 'post',
      component: () => import('../views/PostView.vue'),
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach(async (to, from) => {
  if (to.meta.requiresAuth) {
    const isAuthenticated = localStorage.getItem('access_token');

    if (!isAuthenticated) {
      return '/login';
    }
  }
});

export default router
