// 路由鉴权
import router from '@/router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import pinia from './store'
import useUserStore from './store/modules/user'
// 组件外需使用大仓库注册
let userStore = useUserStore(pinia)
//加载进度条小圆球
nprogress.configure({
    showSpinner: false
})
router.beforeEach(async (to: any, from: any, next: any) => {
    document.title = '硅谷运营' + '-' + to.meta.title
    nprogress.start()

    let token = userStore.token
    let username = userStore.username
    if (token) {
        // 登录成功

        if (to.path == '/login') {
            next('/')
        } else {
            if (username) {
                next()
            } else {
                try {
                    await userStore.getUserInfo()
                    next()
                } catch (error) {
                    //token过期
                    userStore.userLogout()
                    next({
                        path: '/login',
                        query: {
                            redirect: to.path
                        }
                    })
                }

            }


        }
    } else {
        //登录失败
        if (to.path == '/login') {
            next()
        } else {
            next({
                path: '/login',
                query: {
                    redirect: to.path
                }
            })
        }
    }
})

router.afterEach((to: any, from: any, next: any) => {
    nprogress.done()
})