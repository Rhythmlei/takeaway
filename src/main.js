// 入口js

import Vue from 'vue'
import App from './App'

import router from './router/router'

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
})
