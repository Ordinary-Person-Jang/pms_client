import Cookies from 'js-cookie';
import { SESSION_CONSTANTS } from '@/constants/session/session'
import Api from '@/script/utils/session/AxiosInterceptor'
import router from '@/router'
import { useUserStore } from '@/stores/userStore'

export function sessionCheck(){
  const cookieStr :string = Cookies.get(SESSION_CONSTANTS.TOKEN_KEY) || SESSION_CONSTANTS.DEFAULT_TOKEN
  return cookieStr.startsWith('Bearer ') ? true : false
}

export async function loginRequest(post :{empNo:string, pjtId:string, Password:string}) {
  const userStore = useUserStore();

  return await Api.post('/login', {
    id : post.empNo,
    pjtId : post.pjtId,
    password : post.Password
  })
    .then(res => {
      const { headers, data } = res
      if(data != null){
        const token = headers['Authorization'];

        userStore.setUserInfo(data);

        const expiresTime :Date = new Date(new Date().getTime() + 30 * 60 * 1000);

        Cookies.set('Authorization', token, {
          expires : expiresTime,
          path: '/'
        })

        return headers
      } else {
        alert("사번 및 비밀번호를 확인해 주세요")
      }
    }).catch(e => {console.error(e)})
}
export async function logoutProcess(){
  const userStore = useUserStore();
  userStore.clearUserInfo();
  Cookies.remove(SESSION_CONSTANTS.TOKEN_KEY);
  router.push(SESSION_CONSTANTS.LOGIN_PAGE_URL);
}
