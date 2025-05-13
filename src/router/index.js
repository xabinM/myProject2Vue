import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import SignupView from '../views/SignupView.vue';

const routes = [
  { path: '/', redirect: '/login' }, // 기본 경로를 로그인으로 리다이렉트
  { path: '/login', component: LoginView },
  { path: '/signup', component: SignupView}, 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
