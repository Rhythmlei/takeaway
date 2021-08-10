<template>
  <div id="app">
    <router-view></router-view>
    <FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
    <!--在当前路由地址信息$route中，找到路由信息中的meta属性-->
  </div>
</template>

<script>
import FooterGuide from "./components/FooterGuide/FooterGuide.vue";


export default {
  components: {
    FooterGuide,
  },

// 在created函数上通过dispatch触发，actions上面的receive_address和receive_userInfos回调函数
// 应用打开时就需要触发，就要在主组件app上面写上触发异步请求函数
  created() {
    this.$store.dispatch('receive_address')
    this.$store.dispatch('receive_userInfos')
  },

};
</script>

<style lang="stylus" rel="stylesheet/stylus">
#app {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
}
</style>
