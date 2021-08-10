<template>
  <div class="msite">
    <!--首页头部-->
    <HeaderTop :title="addressData.name">
      <router-link to="/search" slot="search" class="header_search">
        <i class="iconfont icon-sousuo"></i>
      </router-link>
      <router-link
        :to="userInfos._id ? '/userinfo' : '/login'"
        slot="login"
        class="header_login"
      >
        <span class="header_login_text" v-if="!userInfos._id">登录|注册</span>
        <span class="header_login_text" v-else>
          <i class="iconfont icon-icon-test"></i>
        </span>
      </router-link>
    </HeaderTop>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container" v-if="foodTypes.length">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            v-for="(foods, index1) in readFoodTypes"
            :key="index1"
          >
            <a
              href="javascript:"
              class="link_to_food"
              v-for="(food, index2) in foods"
              :key="index2"
            >
              <div class="food_container">
                <img :src="imgBaseUrl + food.image_url" />
              </div>
              <span>{{ food.title }}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <img src="./images/msite_back.svg" alt="back" v-else />
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <ShopList></ShopList>
    </div>
  </div>
</template>

<script>
import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";
import Swiper from "swiper";

import "swiper/css/swiper.min.css";

import ShopList from "../../components/ShopList/ShopList.vue";

import { mapState } from "vuex";
export default {
  data() {
    return {
      imgBaseUrl: "https://fuss10.elemecdn.com",
    };
  },
  mounted() {
    this.$store.dispatch("receive_foodtypes");
    this.$store.dispatch("receive_shops");
  },
  computed: {
    ...mapState(["addressData", "foodTypes", "userInfos"]),

    readFoodTypes() {
      const { foodTypes } = this;
      const outFoodArrs = [];
      let inFoodArrs = [];
      foodTypes.forEach((item) => {
        if (inFoodArrs.length === 8) {
          inFoodArrs = [];
        }
        if (inFoodArrs.length === 0) {
          outFoodArrs.push(inFoodArrs);
        }
        inFoodArrs.push(item);
      });
      return outFoodArrs;
    },
  },
  watch: {
    foodTypes(value) {
      this.$nextTick(() => {
        //初始化Swiper插件：new创建一个Swiper实例对象
        new Swiper(".swiper-container", {
          loop: true, //循环轮播
          pagination: {
            //分页器
            el: ".swiper-pagination",
          },
        });
      });
    },
  },
  components: {
    HeaderTop,
    ShopList,
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins';

.msite {
  width: 100%;

  .msite_nav {
    bottom-border-1px(#e4e4e4);
    margin-top: 45px;
    height: 200px;
    background: #fff;

    .swiper-container {
      width: 100%;
      height: 100%;

      .swiper-wrapper {
        width: 100%;
        height: 100%;

        .swiper-slide {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          flex-wrap: wrap;

          .link_to_food {
            width: 25%;

            .food_container {
              display: block;
              width: 100%;
              text-align: center;
              padding-bottom: 10px;
              font-size: 0;

              img {
                display: inline-block;
                width: 50px;
                height: 50px;
              }
            }

            span {
              display: block;
              width: 100%;
              text-align: center;
              font-size: 13px;
              color: #666;
            }
          }
        }
      }

      .swiper-pagination {
        >span.swiper-pagination-bullet-active {
          background: #02a774;
        }
      }
    }
  }

  .msite_shop_list {
    top-border-1px(#e4e4e4);
    margin-top: 10px;
    background: #fff;

    .shop_header {
      padding: 10px 10px 0;

      .shop_icon {
        margin-left: 5px;
        color: #999;
      }

      .shop_header_title {
        color: #999;
        font-size: 14px;
        line-height: 20px;
      }
    }
  }
}
</style>