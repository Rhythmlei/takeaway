<template>
  <div class="shop-info" ref="info">
    <div class="info-content">
      <section class="section">
        <h3 class="section-title">配送信息</h3>
        <div class="delivery">
          <div>
            <span class="delivery-icon">{{ shopInfo.description }}</span>
            <span
              >由商家配送提供配送，约{{ shopInfo.deliveryTime }}分钟送达，距离{{
                shopInfo.distance
              }}</span
            >
          </div>
          <div class="delivery-money">配送费￥{{ shopInfo.deliveryPrice }}</div>
        </div>
      </section>

      <div class="split"></div>

      <section class="section">
        <h3 class="section-title">活动与服务</h3>
        <div class="activity">
          <div
            class="activity-item"
            v-for="(support, index) in shopInfo.supports"
            :key="index"
            :class="supportClasses(support)"
          >
            <span class="content-tag">
              <span class="mini-tag">{{ support.name }}</span>
            </span>
            <span class="activity-content">{{ support.content }}</span>
          </div>
        </div>
      </section>

      <div class="split"></div>

      <section class="section">
        <h3 class="section-title">商家实景</h3>
        <div class="pic-wrapper" ref="pics">
          <ul class="pic-list" ref="picsUl">
            <li
              class="pic-item"
              v-for="(pic, index) in shopInfo.pics"
              :key="index"
            >
              <img width="120" height="90" :src="pic" />
            </li>
          </ul>
        </div>
      </section>

      <div class="split"></div>

      <section class="section">
        <h3 class="section-title">商家信息</h3>
        <ul class="detail">
          <li>
            <span class="bold">品类</span> <span>{{ shopInfo.category }}</span>
          </li>
          <li>
            <span class="bold">商家电话</span> <span>{{ shopInfo.phone }}</span>
          </li>
          <li>
            <span class="bold">地址</span> <span>{{ shopInfo.address }}</span>
          </li>
          <li>
            <span class="bold">营业时间</span>
            <span>{{ shopInfo.workTime }}</span>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
import BetterScroll from "better-scroll";
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["shopInfo"]),
  },

  // 因为最开始shop组件已经异步获取了shopInfo数据，相当于在点击该组件，组件对象创建之前已经有shopInfo数据了
  // 所以在本组件的数据加载有dom元素mounted、更新后$nextTick，创建滑动单实例
  mounted() {
    // 1.先判断这是有初始shopInfo数据情况下，创建滑动单实例
    if (this.shopInfo.pics) {
      this.$nextTick(() => {
        this.initScroll();
      });
    }

    // 2.这是在该组件页面刷新后，还没有初始数据shopInfo数据情况下，直接退出，交给witch处理
    else {
      return;
    }
  },

  // 如果在当前组件页面刷新，则没有初始shopInfo数据了。
  // 刷新页面后，需要监视shopInfo数据，数据更新后，再去创建滑动实例
  watch: {
    shopInfo() {
      this.$nextTick(() => {
        this.initScroll();
      });
    },
  },

  methods: {
    supportClasses(support) {
      if (support.type === 0) {
        return "activity-green";
      } else if (support.type === 1) {
        return "activity-red";
      } else {
        return "activity-orange";
      }
    },

    // 有初始shopInfo数据情况下，创建滑动单实例
    initScroll() {
      if (!this.shopInfoScroll && !this.picsScroll) {
        this.shopInfoScroll = new BetterScroll(this.$refs.info, {
          click: true,
        });

        //问题： ul宽度没有被里面的li内容撑开，ul的宽度被指定了。也就是一开始横向滑动实例列表的高度已经确定，无法横向滑动
        //解决： 动态计算ul的宽度
        const ul = this.$refs.picsUl;
        const liWidth = 120;
        const space = 6;
        const count = this.shopInfo.pics.length;
        ul.style.width = (liWidth + space) * count - space + "px";

        this.picsScroll = new BetterScroll(this.$refs.pics, {
          click: true,
          scrollX: true,
        });
      }
    },
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../../common/stylus/mixins.styl';

.shop-info {
  position: absolute;
  top: 195px;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #fff;
  overflow: hidden;

  .section {
    padding: 16px 14px 14px;
    font-size: 16px;
    background-color: #fff;
    color: #666;
    border-bottom: 1px solid #eee;
    position: relative;

    .section-title {
      color: #000;
      font-weight: 700;
      line-height: 16px;

      > .iconfont {
        float: right;
        color: #ccc;
      }
    }

    .delivery {
      margin-top: 16px;
      font-size: 13px;
      line-height: 18px;

      .delivery-icon {
        width: 55px;
        font-size: 11px;
        margin-right: 10px;
        display: inline-block;
        text-align: center;
        color: #fff;
        background-color: #0097ff;
        padding: 1px 0;
        border-radius: 4px;
      }

      .delivery-money {
        margin-top: 5px;
      }
    }

    .activity {
      margin-top: 16px;

      .activity-item {
        margin-bottom: 12px;
        display: flex;
        font-size: 13px;
        align-items: center;

        &.activity-green {
          .content-tag {
            background-color: rgb(112, 188, 70);
          }
        }

        &.activity-red {
          .content-tag {
            background-color: rgb(240, 115, 115);
          }
        }

        &.activity-orange {
          .content-tag {
            background-color: rgb(241, 136, 79);
          }
        }

        .content-tag {
          display: inline-block;
          border-radius: 2px;
          width: 36px;
          height: 18px;
          margin-right: 10px;
          color: #fff;
          font-style: normal;
          position: relative;

          .mini-tag {
            position: absolute;
            left: 0;
            top: 0;
            right: -100%;
            bottom: -100%;
            font-size: 24px;
            transform: scale(0.5);
            transform-origin: 0 0;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
    }

    .pic-wrapper {
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      margin-top: 16px;

      .pic-list {
        font-size: 0;

        .pic-item {
          display: inline-block;
          margin-right: 6px;
          width: 120px;
          height: 90px;

          &:last-child {
            margin: 0;
          }
        }
      }
    }

    .detail {
      margin-bottom: -16px;

      > li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-right: -10px;
        padding: 16px 12px 16px 0;
        line-height: 16px;
        bottom-border-1px(#ddd);
        font-size: 13px;

        > .bold {
          font-weight: 700;
          color: #333;
        }

        &:last-child {
          border-none();
        }
      }
    }
  }

  .split {
    width: 100%;
    height: 16px;
    border-top: 1px solid rgba(7, 17, 27, 0.1);
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    background: #f3f5f7;
  }
}
</style>
