<template>
  <header class="header">
    <router-link to="/" class="logo">📘 MyWeb</router-link>

    <nav class="nav">
      <template v-if="isLoggedIn">
        <div class="user-info" @click="toggleMenu">
          {{ user.username }} ({{ user.email }})
          <div v-if="menuVisible" class="dropdown">
            <router-link to="/mypage">내 정보 보기</router-link>
            <button @click="logout">로그아웃</button>
          </div>
        </div>
      </template>
      <template v-else>
        <router-link to="/login">로그인</router-link>
        <router-link to="/signup">회원가입</router-link>
      </template>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from '@/axios'

const isLoggedIn = ref(false)
const user = ref({ username: '', email: '' })
const menuVisible = ref(false)
const router = useRouter()

const checkAuth = async () => {
  try {
    const res = await axios.get('/auth/check', { withCredentials: true })
    if (res.status === 200) {
      isLoggedIn.value = true
      const userInfoRes = await axios.get('/member/memberInfo', { withCredentials: true })
      user.value = userInfoRes.data
    }
  } catch {
    isLoggedIn.value = false
  }
}

const logout = async () => {
  try {
    await axios.post('/auth/logout', {}, { withCredentials: true })
    isLoggedIn.value = false
    user.value = { username: '', email: '' }
    menuVisible.value = false;
    router.push('/')
  } catch (e) {
    console.error('로그아웃 실패:', e)
  }
}

const toggleMenu = () => {
  menuVisible.value = !menuVisible.value
}

onMounted(() => {
  checkAuth()
})
</script>


<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  padding: 12px 20px;
  background-color: #f8f9fa;
  align-items: center;
  border-bottom: 1px solid #ddd;
}

.logo {
  font-weight: bold;
  font-size: 20px;
  text-decoration: none;
  color: #333;
}

.nav > * {
  margin-left: 12px;
  text-decoration: none;
  color: #333;
}

.user-info {
  cursor: pointer;
  position: relative;
}

.dropdown {
  position: absolute;
  top: 30px;
  right: 0;
  background: white;
  border: 1px solid #ccc;
  padding: 8px 12px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.dropdown > * {
  margin: 4px 0;
  text-decoration: none;
  color: #333;
}

.dropdown > button {
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  padding: 0;
}

</style>
