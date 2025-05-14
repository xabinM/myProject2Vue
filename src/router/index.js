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

router.beforeEach(async (to, from, next) => {
  const isAuthPage = to.path === '/login' || to.path === '/signup'; // 로그인 또는 회원가입 페이지 접근 요청인가?

  try {
    const res = await axios.get('/auth/check', { withCredentials: true}); // /auth/check로 GET 요청 보내

    if (res.status === 200 && isAuthPage) { // 반환 코드가 200이면

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
