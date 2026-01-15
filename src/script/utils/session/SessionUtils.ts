import Cookies from 'js-cookie';
import { SESSION_CONSTANTS } from '@/constants/session/Session.ts'
import Api from '@/script/utils/session/AxiosInterceptor'
import router from '@/router'
import { useUserStore } from '@/stores/userStore'

export interface LoginInfo {
  empNo:string,
  pjtId:string,
  password:string
}

export function sessionCheck(){
  const cookieStr :string = Cookies.get(SESSION_CONSTANTS.COOKIE_TOKEN_KEY) || SESSION_CONSTANTS.DEFAULT_TOKEN
  return cookieStr.startsWith('Bearer ')
}

export async function loginRequest(post :LoginInfo):Promise<boolean> {
  const userStore = useUserStore();

  const res = await Api.post('/login', {
    id : post.empNo,
    pjtId : post.pjtId,
    password : post.password
  })

  const { headers, data } = res

  if(!data){
    throw new Error('INVALID_CREDENTIALS')
  }

  const token = headers[SESSION_CONSTANTS.RESPONSE_AUTH_HEADER]

  if(!token){
    throw new Error('TOKEN_NOT_FOUND')
  }

  userStore.setUserInfo(data)

  const expiresTime :Date = new Date(new Date().getTime() + 30 * 60 * 1000);

  Cookies.set(SESSION_CONSTANTS.COOKIE_TOKEN_KEY, token, {
    expires: expiresTime,
    path: '/',
  })

  return true
}

export async function logoutProcess(){
  const userStore = useUserStore();
  userStore.clearUserInfo();
  Cookies.remove(SESSION_CONSTANTS.COOKIE_TOKEN_KEY);
  router.push(SESSION_CONSTANTS.LOGIN_PAGE_URL);
}
