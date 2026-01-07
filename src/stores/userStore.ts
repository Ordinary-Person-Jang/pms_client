import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref(null)

  function setUserInfo(data: any) {
    userInfo.value = data
  }

  function clearUserInfo() {
    userInfo.value = null
  }

  return { userInfo, setUserInfo, clearUserInfo }
})
