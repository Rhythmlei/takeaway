// 入口js

import Vue from 'vue'
import App from './App'

import router from './router/router'
import store from './store'

import VueLazyload from 'vue-lazyload'
import loading from './common/imgs/loading.gif'
// 按需引入mint-ui里面的部分组件Button
import { Button } from 'mint-ui';

// 这里只需要，像css文件那样，加载模拟数据的接口文件即可
import './mock/mockServer'
// 加载过滤器
import './filters/filters'

// 注册全局组件标签：<mt-button>
Vue.component(Button.name, Button);
Vue.use(VueLazyload, {
  loading
})

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  store,
})
