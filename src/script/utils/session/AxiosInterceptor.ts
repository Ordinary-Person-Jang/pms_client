import axios from 'axios'
import type { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import Cookies from 'js-cookie';

import { SESSION_CONSTANTS } from '@/constants/session/Session.ts'
import { sessionCheck } from '@/script/utils/session/SessionUtils.ts'
import { useUserStore } from '@/stores/userStore'
import { isEmpty } from 'lodash'


export const Api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000,
});

Api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if(!config.headers) return config;

  const token :string = Cookies.get(SESSION_CONSTANTS.COOKIE_TOKEN_KEY) || SESSION_CONSTANTS.DEFAULT_TOKEN;

  if(config.headers) {
    config.headers.set('Authorization', token)
    config.headers.set('Accept','application/json')
    config.headers.set('Content-Type', 'application/json')
  }

  config.withCredentials = false

  return config
}, (error) => {

  console.error(error);
  return Promise.reject(error)
})


Api.interceptors.response.use(

  (response: AxiosResponse) => {
    const isToken = sessionCheck()
    if(isToken){
      const token :string = Cookies.get(SESSION_CONSTANTS.COOKIE_TOKEN_KEY) as string;
      const expiresTime :Date =new Date(new Date().getTime() + 30 * 60 * 1000);
      Cookies.set(SESSION_CONSTANTS.COOKIE_TOKEN_KEY, token, {
        expires: expiresTime,
        path: '/'
      })
    }
    return response
  },
  (error: AxiosError) => {
    if(error.response){
      const { status, data } = error.response as { status: number, data: { code?:string, message?:string }}

      const isProxyError =
        typeof data === 'object' && !isEmpty(data.code) && data.code === 'PROXY_NETWORK_ERROR'
      if (status === 500 && isProxyError) {
        return Promise.reject({ code: data.code })
      }

      if (status === 403) {
        const userStore = useUserStore();

        userStore.clearUserInfo();
        Cookies.remove(SESSION_CONSTANTS.COOKIE_TOKEN_KEY);
        // router.push(SESSION_CONSTANTS.LOGIN_PAGE_URL);
        return Promise.reject({ code: 'AUTH_EXPIRED' })
      }

      const message = (data as { message? :string })?.message ?? '알 수 없는 에러가 발생했습니다.';
      return Promise.reject({ code: 'BUSINESS_ERROR', message })
    }

    else if (error.request) {
      return Promise.reject({ code: 'NETWORK_ERROR' })
    }

    return Promise.reject({ code: 'UNKNOWN_ERROR', message: '알 수 없는 에러가 발생했습니다.' })
  }
);
export default Api;
