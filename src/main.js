import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

// 让$bus成为一个Vue实例，当做一个监听事件的事件总线
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
