import axios from 'axios'
import type { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import router from '@/router'
import Cookies from 'js-cookie';
import { SESSION_CONSTANTS } from '@/constants/session/session'
import { sessionCheck } from '@/script/utils/session/SessionUtils.ts'
import { useUserStore } from '@/stores/userStore'

export const Api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000,
});

Api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if(!config.headers) return config;

  const token :string = Cookies.get(SESSION_CONSTANTS.TOKEN_KEY) || SESSION_CONSTANTS.DEFAULT_TOKEN;

  if(config.headers) {
    config.headers.set('Authorization', token)
    config.headers.set('Accept','application/json')
    config.headers.set('Content-Type', 'application/json')
  }

  config.withCredentials = true

  return config
}, (error) => {
  console.error(error);
  return Promise.reject(error)
})


Api.interceptors.response.use(

  (response: AxiosResponse) => {
    const isToken = sessionCheck()
    if(isToken){
      const token :string = Cookies.get(SESSION_CONSTANTS.TOKEN_KEY) as string;
      const expiresTime :Date =new Date(new Date().getTime() + 30 * 60 * 1000);
      Cookies.set(SESSION_CONSTANTS.TOKEN_KEY, token, {
        expires: expiresTime,
        path: '/'
      })
    }
    return response
  },
  (error: AxiosError) => {
    if(error.response){
      const { status, data } = error.response

      if (status === 403) {
        const userStore = useUserStore();

        alert('세션이 만료되었습니다. 다시 로그인해주세요.');
        userStore.clearUserInfo();
        Cookies.remove(SESSION_CONSTANTS.TOKEN_KEY);
        router.push(SESSION_CONSTANTS.LOGIN_PAGE_URL);
        return Promise.reject(new Error(SESSION_CONSTANTS.EXPIRED_TOKEN));
      }

      const message = (data as { message? :string })?.message ?? '알 수 없는 에러가 발생했습니다.';
      return Promise.reject(new Error(message));
    }
    return Promise.reject(error);
  }
);
export default Api;
