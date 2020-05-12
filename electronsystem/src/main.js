import Vue from 'vue'
import App from './App.vue'
import electron from 'electron'; // 引入electron用于系统级启动时使用
import axios from 'axios'
import jquery from 'jquery'
import Toast from './toast'  // tost组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import moment from 'moment'//导入文件
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.http = Vue.prototype.$http = axios // 引入axios请求
window.jquery = window.$ = jquery // 引入jq用于解析xml或json
Vue.prototype.$electron = electron // 将electron引入vue全局
Vue.prototype.$moment = moment;//赋值使用
Vue.use(ElementUI) // element-ui
Vue.use(Toast)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
