<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper">
        <ul>
          <!--current-->
          <li
            class="menu-item"
            v-for="(shopGood, index) in shopGoods"
            :key="index"
            :class="{ current: currentIndex === index }"
            @click="clickMenuItem(index)"
          >
            <span class="text bottom-border-1px">
              <img class="icon" :src="shopGood.icon" v-if="shopGood.icon" />
              {{ shopGood.name }}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper">
        <ul ref="foodsUl">
          <li
            class="food-list-hook"
            v-for="(shopGood, index) in shopGoods"
            :key="index"
          >
            <h1 class="title">{{ shopGood.name }}</h1>
            <ul>
              <li
                class="food-item bottom-border-1px"
                v-for="(food, index) in shopGood.foods"
                :key="index"
                @click="ShowFood(food)"
              >
                <div class="icon">
                  <img width="57" height="57" :src="food.icon" />
                </div>
                <div class="content">
                  <h2 class="name">{{ food.name }}</h2>
                  <p class="desc">{{ food.description }}</p>
                  <div class="extra">
                    <span class="count">月售{{ food.sellCount }}份</span>
                    <span>好评率{{ food.rating }}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{ food.price }}</span>
                    <span class="old" v-if="food.oldPrice"
                      >￥{{ food.oldPrice }}</span
                    >
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"></CartControl>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ShopCart></ShopCart>
    </div>
    <transition name="fade">
      <Food :food="food" v-if="isShow" @closeFood="closeFood"></Food>
    </transition>
  </div>
</template>


<script>
import { mapState } from "vuex";
import BetterScroll from "better-scroll";
import CartControl from "../../../components/CartControl/CartControl.vue";
import Food from "../../../components/Food/Food.vue";
import ShopCart from '../../../components/ShopCart/ShopCart.vue'
export default {
  data() {
    return {
      scrollY: 0, //右侧滑动的Y轴坐标（滑动过程中实时变化）
      tops: [], //所有右侧的分类li，得到它们的top值（数据异步请求完，并解析显示后，top值就固定了）
      food: {}, //用来单独存储，每一个被点击的food对象，并将当前food对象绑定给Food组件。因为只需要显示被点击的food。
                //而循环体里面的<CartControl :food="food"></CartControl>，绑定的是所有food对象，所有循环的列表都有相同组件样式
      isShow: false,
    };
  },
  components: {
    CartControl,
    Food,
    ShopCart,
  },

  created() {
    this.$store.dispatch("receive_shopgoods");
  },
  computed: {
    ...mapState(["shopGoods"]),

    // 选中当前分类li时的下标，所需要满足的条件
    currentIndex() {
      const { scrollY, tops } = this;
      const Cindex = tops.findIndex((top, index) => {
        return scrollY >= top && scrollY < tops[index + 1];
      });
      return Cindex;
    },
  },
  watch: {
    shopGoods(value) {
      //监视：当shopGoods数据更新变动后，
      this.$nextTick(() => {
        //数据更新后执行：1.数据更新后的第一次，搜集右侧分类li的top值。
        //              2.创建BetterScroll对象，用来搜集右侧滑动的Y轴坐标scrollY

        //1.数据更新后的第一次，搜集右侧分类li的top值
        // （1）初始化
        const topArrs = [];
        let top = 0;
        topArrs.push(top);
        // （2）搜集所有分类li的top
        const lis = this.$refs.foodsUl.querySelectorAll(".food-list-hook");
        const lisArrs = [...lis];
        lisArrs.forEach((item) => {
          top += item.clientHeight;
          topArrs.push(top);
        });
        // （3）更新数据
        this.tops = topArrs;
        console.log(this.tops);

        //2.创建BetterScroll对象，用来搜集右侧滑动的Y轴坐标scrollY
        const menuScroll = new BetterScroll(".menu-wrapper", {
          click: true, //配置对象：派发点击事件
        });
        this.foodsScroll = new BetterScroll(".foods-wrapper", {
          probeType: 2, //配置对象：派发滑动scroll事件的三种情况。1和2：手指离开后，依靠惯性滑动，是不会去触发scroll事件的。只有3才会在惯性滑动时触发scroll事件
          click: true,
        });

        // 给右侧绑定scroll正在手指滚动事件监听
        this.foodsScroll.on("scroll", (position) => {
          this.scrollY = Math.abs(position.y);
          // console.log(this.scrollY);
        });
        // 给右侧绑定scrollEnd惯性滚动结束后的事件监听：因为上面的probeType配置是2，在手指离开，后面的惯性滑动无法触发scroll
        this.foodsScroll.on("scrollEnd", (position) => {
          this.scrollY = Math.abs(position.y);
        });
      });
    },
  },
  methods: {
    clickMenuItem(index) {
      // 根据左侧分类数组的index，对应获取右侧分类li的tops数组的值（应该滑动的值）
      const y = this.tops[index];
      // 直接更新右侧滑动的Y轴坐标scrollY：让上面的左侧，点击当前分类li时，传入更新后的scrollY，currentIndex()函数生效，样式效果立即生效。
      this.scrollY = y;
      this.foodsScroll.scrollTo(0, -y, 1000);
    },

    ShowFood(food) {
      this.food = food;
      this.isShow = !this.isShow;
    },
    closeFood() {
      this.isShow = !this.isShow;
    },
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../../common/stylus/mixins.styl';

.goods {
  display: flex;
  position: absolute;
  top: 195px;
  bottom: 46px;
  width: 100%;
  background: #fff;
  overflow: hidden;

  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;

    .menu-item {
      display: table;
      height: 54px;
      width: 56px;
      padding: 0 12px;
      line-height: 14px;

      &.current {
        position: relative;
        z-index: 10;
        margin-top: -1px;
        background: #fff;
        color: $green;
        font-weight: 700;

        .text {
          border-none();
        }
      }

      .icon {
        display: inline-block;
        vertical-align: top;
        width: 12px;
        height: 12px;
        margin-right: 2px;
        background-size: 12px 12px;
        background-repeat: no-repeat;
      }

      .text {
        display: table-cell;
        width: 56px;
        vertical-align: middle;
        bottom-border-1px(rgba(7, 17, 27, 0.1));
        font-size: 12px;
      }
    }
  }

  .foods-wrapper {
    flex: 1;

    .title {
      padding-left: 14px;
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      font-size: 12px;
      color: rgb(147, 153, 159);
      background: #f3f5f7;
    }

    .food-item {
      display: flex;
      margin: 18px;
      padding-bottom: 18px;
      bottom-border-1px(rgba(7, 17, 27, 0.1));

      &:last-child {
        border-none();
        margin-bottom: 0;
      }

      .icon {
        flex: 0 0 57px;
        margin-right: 10px;
      }

      .content {
        flex: 1;

        .name {
          margin: 2px 0 8px 0;
          height: 14px;
          line-height: 14px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }

        .desc, .extra {
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }

        .desc {
          line-height: 12px;
          margin-bottom: 8px;
        }

        .extra {
          .count {
            margin-right: 12px;
          }
        }

        .price {
          font-weight: 700;
          line-height: 24px;

          .now {
            margin-right: 8px;
            font-size: 14px;
            color: rgb(240, 20, 20);
          }

          .old {
            text-decoration: line-through;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }

        .cartcontrol-wrapper {
          position: absolute;
          right: 0;
          bottom: 12px;
        }
      }
    }
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
