// 包含n个接口函数的模板

import ajax from "./ajax";
const BASE_URL = 'http://localhost:4000'


// 1、根据经纬度获取位置详情          (参数类型：params        ,get)
export
    const reqAddress = function (geohash) {
        ajax(BASE_URL + '/position/' + geohash)
    }
// 2、获取食品分类列表                                       get
export
    const reqFoodTypes = function () {
        ajax(BASE_URL + '/index_category')
    }
// 3、根据经纬度获取商铺列表          (参数类型：query         ,get)
export
    const reqShops = function ({ latitude, longitude }) {
        ajax(BASE_URL + '/shops', { latitude, longitude })
    }
// 4、根据经纬度和关键字搜索商铺列表   (参数类型：query         ,get)
export
    const reqSearchShop = function ({ geohash, keyword }) {
        ajax(BASE_URL + '/search_shops', { geohash, keyword })
    }









// 6、用户名密码登陆                  (参数类型: 请求体        ,post)
export
    const reqPwdLogin = function ({ name, pwd, captcha }) {
        ajax(BASE_URL + '/login_pwd', { name, pwd, captcha }, 'POST')
    }
// 7、发送短信验证码                  (参数类型：query         ,get)
export
    const reqSendCode = function ({ phone }) {
        ajax(BASE_URL + '/sendcode', { phone })
    }
// 8、手机号验证码登陆                (参数类型：请求体        ,post)
export
    const reqSmsLogin = function ({ phone, code }) {
        ajax(BASE_URL + '/login_sms', { phone, code }, 'POST')
    }
// 9、根据会话获取用户信息                                    get
export
    const reqUser = function () {
        ajax(BASE_URL + '/userinfo')
    }
// 10、用户登出                                              get
export
    const reqLogout = function () {
        ajax(BASE_URL + '/logout')
    }




// 11、获取商家信息                                         get
export
    const reqShopInfo = function () {
        ajax(BASE_URL + '/info')
    }
// 12、获取商家评价数组                                     get
export
    const reqShopRatings = function () {
        ajax(BASE_URL + '/ratings')
    }
// 13、获取商家商品数组                                     get
export
    const reqShopGoods = function () {
        ajax(BASE_URL + '/goods')
    }