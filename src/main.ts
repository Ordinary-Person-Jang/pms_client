import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useDialog } from '@/script/utils/commons/useDialog.ts'
import { SESSION_CONSTANTS } from '@/constants/session/Session.ts'
import { getErrorMessage } from '@/constants/message/ErrorMessage.ts'
import { isEmpty, isUndefined } from 'lodash'

const { alert } = useDialog()

const app = createApp(App)

app.use(createPinia())
app.use(router)

window.addEventListener('unhandledrejection', async (event) => {

  interface ApiError {
    code: string
    message?: string
  }

  const error = event.reason as ApiError
  console.error('Unhandled Promise Rejection:', error)

  const message: string = !isEmpty(error.message) && !isUndefined(error.message) ? error.message : getErrorMessage(error.code)

  if (error.code === 'AUTH_EXPIRED') {
    await alert(message)
    router.push(SESSION_CONSTANTS.LOGIN_PAGE_URL);
    return;
  }
  else if (error.code === 'BUSINESS_ERROR' || error.code === 'NETWORK_ERROR') {
    await alert(message)
    return;
  }

  const fallbackMsg = message || '시스템 오류가 발생했습니다.'
  alert(fallbackMsg);
});

app.mount('#app')
