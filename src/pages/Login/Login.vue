<template>
  <div class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">团团外卖</h2>
        <div class="login_header_title">
          <a
            href="javascript:;"
            :class="{ on: loginWay }"
            @click="loginWay = true"
            >短信登录</a
          >
          <a
            href="javascript:;"
            :class="{ on: !loginWay }"
            @click="loginWay = false"
            >密码登录</a
          >
        </div>
      </div>
      <div class="login_content">
        <!-- 阻止表单默认提交事件，改为执行login表单验证方法 -->
        <form @submit.prevent="login">
          <div :class="{ on: loginWay }">
            <section class="login_message">
              <input
                type="text"
                maxlength="11"
                placeholder="手机号"
                v-model="phone"
              />
              <button
                :disabled="!rightPhone"
                class="get_verification"
                :class="{ right_phone: rightPhone }"
                @click.prevent="getCode"
              >
                {{
                  computeTime > 0 ? "已发送" + computeTime + "s" : "获取验证码"
                }}
              </button>
            </section>
            <section class="login_verification">
              <input
                type="text"
                maxlength="6"
                placeholder="验证码"
                v-model="code"
              />
            </section>
            <section class="login_hint">
              温馨提示：未注册团团外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{ on: !loginWay }">
            <section>
              <section class="login_message">
                <input
                  type="text"
                  maxlength="11"
                  placeholder="手机/邮箱/用户名"
                  v-model="name"
                />
              </section>
              <section class="login_verification">
                <input
                  :type="showPwd ? 'text' : 'password'"
                  maxlength="8"
                  placeholder="密码"
                  v-model="pwd"
                />
                <div
                  class="switch_button"
                  :class="showPwd ? 'on' : 'off'"
                  @click="showPwd = !showPwd"
                >
                  <div class="switch_circle" :class="{ right: showPwd }"></div>
                  <span class="switch_text">{{
                    showPwd ? "abc" : ". . ."
                  }}</span>
                </div>
              </section>
              <section class="login_message">
                <input
                  type="text"
                  maxlength="11"
                  placeholder="验证码"
                  v-model="captcha"
                />
                <img
                  class="get_verification"
                  src="http://localhost:4000/captcha"
                  alt="captcha"
                  @click="changeCaptcha"
                  ref="captcha"
                />
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <router-link to="/personal" class="go_back">
        <i class="iconfont icon-jiantouzuo"></i>
      </router-link>
    </div>
    <AlertTip
      :alertText="alertText"
      v-show="showAlert"
      @closeTip="closeTip"
    ></AlertTip>
  </div>
</template>

<script>
import AlertTip from "../../components/AlertTip/AlertTip.vue";

import { reqSendCode, reqSmsLogin, reqPwdLogin } from "../../api/index";
export default {
  components: {
    AlertTip,
  },
  data() {
    return {
      loginWay: true,
      showPwd: false,
      computeTime: 0,
      phone: "",
      code: "",
      name: "",
      pwd: "",
      captcha: "",
      alertText: "",
      showAlert: false,
    };
  },
  computed: {
    rightPhone() {
      // 方法一：正则
      return /^1\d{10}$/.test(this.phone);

      // 方法二：
      // const phoneArr = this.phone.split("");
      // if (phoneArr.length === 11 && phoneArr[0] === "1") {
      //   return true;
      // }
    },
    rightCode() {
      return /^\d{6}$/.test(this.code);
    },
  },
  methods: {
    // 异步获取短信验证码
    async getCode() {
      // 1.获取短信验证的循环倒计时
      if (this.computeTime === 0) {
        this.computeTime = 60;
        this.timer = setInterval(() => {
          this.computeTime--;
          if (this.computeTime === 0) {
            clearInterval(this.timer);
          }
        }, 1000);
      }

      // 2.发送Ajax请求：调用接口函数，得到是promise对象（获取短信验证码）
      // 直接得到promise对象的结果，就需要使用async+await
      const result = await reqSendCode(this.phone);
      if (result.code === 1) {
        // 失败情况下：显示提示框
        this.alertS(result.msg);

        // 失败情况下：清除定时器
        if (this.computeTime) {
          this.computeTime = 0;
          clearInterval(this.timer);
        }
      }
    },

    alertS(text) {
      this.showAlert = true;
      this.alertText = text;
    },
    // 异步登录
    async login() {
      let result
      if (this.loginWay) {       //手机号 + 短信验证码登录
      const {rightPhone,rightCode,phone,code}=this
        // 1.前台表单验证
        if (!rightPhone) {
          this.alertS("手机号错误");
          return; //一旦满足就不往下执行了
        } else if (!rightCode) {
          this.alertS("手机验证码错误");
          return;
        }
        // 2.发送Ajax请求：调用接口函数，得到是promise对象（手机号 + 验证码登陆）
        result = await reqSmsLogin(phone,code)
        
      } else {                   //账号 + 密码登录
        // 1.前台表单验证
        const {name,pwd,captcha}=this
        if (!name) {
          this.alertS("账号错误");
          return;
        } else if (!pwd) {
          this.alertS("密码错误");
          return;
        } else if (!captcha) {
          this.alertS("图像验证码失败");
          return;
        }
        // 2.发送Ajax请求：调用接口函数，得到是promise对象（账号 + 密码登陆）
        result = await reqPwdLogin({name,pwd,captcha})
        
      }

      // 只要一点击登录，不管成功与否，就会清除定时器
      if (this.computeTime) {
          this.computeTime = 0;
          clearInterval(this.timer);
          this.timer=undefined
        }

      // 处理统一的登录Ajax请求的结果数据
      if(result.code===0){
          // 登录请求成功后，将用户信息user保存记录到vuex的state中
          const user=result.data
          this.$store.dispatch('record_userInfos',user)
          // 成功登录后跳转页面
          this.$router.replace('/personal')
        }
        else{
          // 显示新的图片验证
          this.changeCaptcha()
          // 登录失败后提示框
          const msg=result.msg
          this.alertS(msg)
          
        }
    },
    // 关闭提示框
    closeTip() {
      this.showAlert = false;
      this.alertText = "";
    },

    // 点击切换新验证码图片
    // 需要每次的src地址不一样才会更新，在src后面加上每次点击的时间的参数     ?time=" + Date.now()
    changeCaptcha() {
      this.$refs.captcha.src = "http://localhost:4000/captcha?time=" + Date.now();
    },
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins';

.loginContainer {
  width: 100%;
  height: 100%;
  background: #fff;

  .loginInner {
    padding-top: 60px;
    width: 80%;
    margin: 0 auto;

    .login_header {
      .login_logo {
        font-size: 40px;
        font-weight: bold;
        color: #02a774;
        text-align: center;
      }

      .login_header_title {
        padding-top: 40px;
        text-align: center;

        >a {
          color: #333;
          font-size: 14px;
          padding-bottom: 4px;

          &:first-child {
            margin-right: 40px;
          }

          &.on {
            color: #02a774;
            font-weight: 700;
            border-bottom: 2px solid #02a774;
          }
        }
      }
    }

    .login_content {
      >form {
        >div {
          display: none;

          &.on {
            display: block;
          }

          input {
            width: 100%;
            height: 100%;
            padding-left: 10px;
            box-sizing: border-box;
            border: 1px solid #ddd;
            border-radius: 4px;
            outline: 0;
            font: 400 14px Arial;

            &:focus {
              border: 1px solid #02a774;
            }
          }

          .login_message {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .get_verification {
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);
              border: 0;
              color: #ccc;
              font-size: 14px;
              background: transparent;

              &.right_phone {
                color: black;
              }
            }
          }

          .login_verification {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .switch_button {
              font-size: 12px;
              border: 1px solid #ddd;
              border-radius: 8px;
              transition: background-color 0.3s, border-color 0.3s;
              padding: 0 6px;
              width: 30px;
              height: 16px;
              line-height: 16px;
              color: #fff;
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);

              &.off {
                background: #fff;

                .switch_text {
                  float: right;
                  color: #ddd;
                }
              }

              &.on {
                background: #02a774;
              }

              >.switch_circle {
                position: absolute;
                top: -1px;
                left: -1px;
                width: 16px;
                height: 16px;
                border: 1px solid #ddd;
                border-radius: 50%;
                background: #fff;
                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
                transition: transform 0.3s;

                &.right {
                  transform: translateX(27px);
                }
              }
            }
          }

          .login_hint {
            margin-top: 12px;
            color: #999;
            font-size: 14px;
            line-height: 20px;

            >a {
              color: #02a774;
            }
          }
        }

        .login_submit {
          display: block;
          width: 100%;
          height: 42px;
          margin-top: 30px;
          border-radius: 4px;
          background: #4cd96f;
          color: #fff;
          text-align: center;
          font-size: 16px;
          line-height: 42px;
          border: 0;
        }
      }

      .about_us {
        display: block;
        font-size: 12px;
        margin-top: 20px;
        text-align: center;
        color: #999;
      }
    }

    .go_back {
      position: absolute;
      top: 5px;
      left: 5px;
      width: 30px;
      height: 30px;

      >.iconfont {
        font-size: 20px;
        color: #999;
      }
    }
  }
}
</style>