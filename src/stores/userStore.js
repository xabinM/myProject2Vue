import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const user = ref(null);

  const setUser = (userInfo) => {
    user.value = userInfo;
  };

  const clearUser = () => {
    user.value = null;
  };

  return { user, setUser, clearUser };
}, {
  persist: true
},);