<template>
  <div class="login-container">
    <h2>로그인</h2>
    <form @submit.prevent="login">
      <input v-model="username" placeholder="아이디" />
      <input v-model="password" type="password" placeholder="비밀번호" />
      <button type="submit">로그인</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from '../axios';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();

const login = async () => {
  try {
    const res = await axios.post('/auth/login', {
      username: username.value,
      password: password.value,
    });
    localStorage.setItem('jwt_token', res.data.token);
    router.push('/dashboard');
  } catch (e) {
    error.value = '로그인 실패: 아이디 또는 비밀번호가 틀렸습니다.';
  }
};
</script>

<style scoped>
.login-container {
  align-content: center;
  max-width: 300px;
  margin: auto;
  padding: 20px;
}
.error {
  color: red;
  margin-top: 10px;
}
</style>
