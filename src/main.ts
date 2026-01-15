import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useDialog } from '@/script/utils/commons/useDialog.ts'
import { SESSION_CONSTANTS } from '@/constants/session/session.ts'

const { alert } = useDialog()

const app = createApp(App)

app.use(createPinia())
app.use(router)

window.addEventListener('unhandledrejection', async (event) => {
  const error = event.reason;
  console.error('Unhandled Promise Rejection:', error);

  if (error.type === 'AUTH_EXPIRED') {
    await alert('세션이 만료되었습니다. 다시 로그인해주세요.');
    router.push(SESSION_CONSTANTS.LOGIN_PAGE_URL);
    return;
  }
  else if (error.type === 'BUSINESS_ERROR' || error.type === 'NETWORK_ERROR') {
    await alert(error.message);
    return;
  }

  const fallbackMsg = error?.message || '시스템 오류가 발생했습니다.';
  alert(fallbackMsg);
});

app.mount('#app')
