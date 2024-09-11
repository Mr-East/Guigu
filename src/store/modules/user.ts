import { defineStore } from 'pinia'
import { loginForm, loginResponse } from '../../api/user/type'
import { reqLogin,reqUserInfo } from '../../api/user'
import { UserState } from './types/type'
import { SET_TOKEN, GET_TOKEN } from '../../utils/token'
import { constRoute } from '../../router/routes'


let useUserStore = defineStore('User', {
    // 数据
    state: (): UserState => {
        return {
            token: GET_TOKEN(),
            menuRoutes:constRoute,
            username:'',
            avatar:'',
        }
    },
    // 异步逻辑
    actions: {
        async userLogin(data: loginForm) {
            let res: loginResponse = await reqLogin(data)
            if (res.code == 200) {
                this.token = (res.data.token as string)
                SET_TOKEN((res.data.token as string))
                return 'ok'
            } else {
                console.log(res.data.message)

                return Promise.reject(new Error(res.data.message))
            }
        },
        async getUserInfo(){
             let res = await reqUserInfo();
             if(res.code == 200){
                 this.username = res.data.checkUser.username;
                 this.avatar = res.data.checkUser.avatar;
                 return 'ok'
             }else{
                return Promise.reject('获取用户信息失败')
             }
        },
        userLogout() {
          this.username=''  
          this.avatar=''
          this.token = ''
          SET_TOKEN('')

        },
        // 计算属性
        getters: {

        }
    }
}
)

export default useUserStore;