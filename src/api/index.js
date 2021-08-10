// 暴露包含n个接口函数的模板
// 这些接口函数返回的是promise对象

import ajax from "./ajax";
// const BASE_URL = 'http://localhost:4000'
const BASE_URL = '/api'


// 1、根据经纬度获取位置详情          (参数类型：params        ,get)
export const reqAddress = (geohash) =>
    ajax(BASE_URL + '/position/' + geohash)

// 2、获取食品分类列表                                       get

export
    const reqFoodTypes = function () {
        return ajax(BASE_URL + '/index_category')
    }


// 3、根据经纬度获取商铺列表          (参数类型：query         ,get)
export const reqShops = ({ latitude, longitude }) => ajax(BASE_URL + '/shops', { latitude, longitude }, 'GET')

// 4、根据经纬度和关键字搜索商铺列表   (参数类型：query         ,get)
export const reqSearchShop = (geohash, keyword) =>
    ajax(BASE_URL + '/search_shops', { geohash, keyword })








// 6、用户名密码登陆                  (参数类型: 请求体        ,post)
export
    const reqPwdLogin = function ({ name, pwd, captcha }) {
        return ajax(BASE_URL + '/login_pwd', { name, pwd, captcha }, 'POST')
    }
// 7、发送短信验证码                  (参数类型：query         ,get)
export
    const reqSendCode = function (phone) {
        return ajax(BASE_URL + '/sendcode', { phone })
    }
// 8、手机号验证码登陆                (参数类型：请求体        ,post)
export
    const reqSmsLogin = function (phone, code) {
        return ajax(BASE_URL + '/login_sms', { phone, code }, 'POST')
    }
// 9、根据会话获取用户信息                                    get
export
    const reqUserInfo = function () {
        return ajax(BASE_URL + '/userinfo')
    }
// 10、用户登出                                              get
export
    const reqLogout = function () {
        return ajax(BASE_URL + '/logout')
    }




// 当mock模拟后台的数据，此时需要发送Ajax请求
// 下面三个Ajax请求不需要代理（不需要/api开头的路径）：拦截相同的/api路径 ，并向代理的前台服务器发送Ajax请求
// 前端服务器就能发送Ajax请求
// 11、获取商家信息                                         get
export
    const reqShopInfo = function () {
        return ajax('/shopinfo')
    }
// 12、获取商家评价数组                                     get
export
    const reqShopRatings = function () {
        return ajax('/shopratings')
    }
// 13、获取商家商品数组                                     get
export
    const reqShopGoods = function () {
        return ajax('/shopgoods')
    }