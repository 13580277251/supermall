import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import toast from '@components/common/toast'

// 消息提示的环境配置，设置为开发环境或者生产环境
Vue.config.productionTip = false

// 让$bus成为一个Vue实例，当做一个监听事件的事件总线
Vue.prototype.$bus = new Vue()

// 解决移动端300ms延迟
FastClick.attach(document.body)

// 使用懒加载的插件
Vue.use(VueLazyLoad,{
  // 图片未加载出来时候的填充物
  loading: require('./assets/img/common/placeholder.png')
})

// 安装toast插件
Vue.use(toast)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
