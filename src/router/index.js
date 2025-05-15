import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import SignupView from '../views/SignupView.vue';
import DashboardView from '@/views/DashboardView.vue';
import axios from 'axios';

const routes = [
  { path: '/', redirect: '/login' }, // 기본 경로를 로그인으로 리다이렉트
  { path: '/login', component: LoginView },
  { path: '/signup', component: SignupView},
  { path: '/dashboard', component: DashboardView},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const isAuthPage = to.path === '/login' || to.path === '/signup';


  try {
    const res = await axios.get('/auth/check', { withCredentials: true });
    
    if (res.status === 200 && isAuthPage) {
      return next('/123');
    }

    next();
  } catch (e) {
    if (!isAuthPage) {
      return next('/login');
    }
    next();
  }
});


export default router;
