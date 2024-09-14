import { defineStore } from 'pinia'
import type { ResponseData,loginResponseData,loginFromData,userInfoResponseData } from '@/api/type'
import { reqLogin, reqUserInfo, reqLogout } from '../../api/user'
import { UserState } from './types/type'
import { SET_TOKEN, GET_TOKEN } from '../../utils/token'
import { constRoute } from '../../router/routes'

let useUserStore = defineStore('User', {
  // 数据
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
      menuRoutes: constRoute,
      username: '',
      avatar: '',
    }
  },
  // 异步逻辑
  actions: {
    async userLogin(data: loginFromData) {
      let res: loginResponseData = await reqLogin(data)


      if (res.code == 200) {

        this.token = res.data as string
        SET_TOKEN(res.data as string)
        return 'ok'
      } else {
        console.log(res.message)

        return Promise.reject(new Error(res.message))
      }
    },
    async getUserInfo() {
      let res = await reqUserInfo()
      if (res.code == 200) {
        this.username = res.data.name
        this.avatar = res.data.avatar
        return 'ok'
      } else {
        return Promise.reject('获取用户信息失败')
      }
    },
    async userLogout() {
      let res = await reqLogout()
      if (res.code == 200) {
        this.username = ''
        this.avatar = ''
        this.token = ''
        SET_TOKEN('')
        return 'ok';
      }else{
        Promise.reject(res.message)
      }}

    },
    // 计算属性
    getters: {},
  }

)

export default useUserStore
