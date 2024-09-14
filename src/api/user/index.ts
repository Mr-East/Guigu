import request from '@/utils/request'
import type { ResponseData,loginResponseData,loginFromData,userInfoResponseData } from './type'
enum API {
  LOGIN_URL = '/admin/acl/index/login',
  USERINFO_URL = '/admin/acl/index/info',
  LOGOUT_URL = '/admin/acl/index/logout',
}

export const  reqLogin =  (data:loginFromData) => request.post<any,loginResponseData>(API.LOGIN_URL,data)

export const reqUserInfo = () => request.get<any,userInfoResponseData>(API.USERINFO_URL)

export const reqLogout = () => request.post<any,any>(API.LOGOUT_URL)