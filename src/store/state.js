// 管理公共的数据对象：状态对象state
export default {
    latitude: 40.10038,
    longitude: 116.36867,
    addressData: {},    //地址相关信息
    foodTypes: [],      //商品分类数组
    shops: [],          //商家数组
    userInfos:{},       //用户的账号和密码信息
    shopGoods:[],       //点餐
    shopRatings:[],     //评价
    shopInfo:{},        //商家
    cartFoods:[],       //添加到购物车里面的food对象数组
    searchShops: []     //点击搜索后的商家列表
}