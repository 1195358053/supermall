import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import toast from 'components/common/toast'
// import FastClick from 'fastClick'

import VueLazyLoad from 'vue-lazyload'


Vue.config.productionTip = false

//安装toast插件
Vue.use(toast)

//解决移动端的300ms延迟
// FastClick.attach(document.body)

// 图片懒加载插件
Vue.use(VueLazyLoad,{
  loading: require('./assets/img/common/placeholder.png')
})
// 添加事件总线对象
Vue.prototype.$bus = new Vue()
new Vue({
  router,
  store,
  toast,
  render: h => h(App)
}).$mount('#app')
