import 'virtual:svg-icons-register';
import { createApp } from 'vue'
import App from './App.vue'

import routers from './router/index'
import store from './store/index'

import "ant-design-vue/dist/antd.css";
import './global.less'

let creatProject= createApp(App)
creatProject.use(routers)
creatProject.use(store)
creatProject.mount('#app')
