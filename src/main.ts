import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
//@ts-ignore忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// 导入svg
import 'virtual:svg-icons-register'
// 全局组件
import gloablComponent from './components/index';
// 引入全局样式
import '@/styles/index.scss'
// 引入路由
import router from './router';
// 引入icon全局组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 引入仓库
import pinia from './store';
// 路由鉴权
import './permission'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(pinia)
app.use(router)
app.use(gloablComponent);
app.use(ElementPlus, {
    locale: zhCn
})
app.mount('#app')
