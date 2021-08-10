import Vue from "vue"
import state from "./state"

// 包含多个，直接更新，状态对象state.js里面数据的，方法或对象
export default {
    RECEIVE_ADDRESS(state, { address }) {
        state.addressData = address
    },
    RECEIVE_FOODTYPES(state, { foodtype }) {
        state.foodTypes = foodtype
    },
    RECEIVE_SHOPS(state, { shop }) {
        state.shops = shop
    },
    RECEIVE_USERINFOS(state, { userinfo }) {
        state.userInfos = userinfo
    },
    RESET_USERINFOS(state) {
        state.userInfos = {}
    },
    RECEIVE_SHOPGOODS(state, { shopgood }) {
        state.shopGoods = shopgood
    },
    RECEIVE_SHOPRATINGS(state, { shoprating }) {
        state.shopRatings = shoprating
    },
    RECEIVE_SHOPINFO(state, { shopinfo }) {
        state.shopInfo = shopinfo
    },

    INCREASE_FOOD_COUNT(state, { food }) {
        if (!food.count) {   //第一次food上面没有count属性，需要添加 count 属性, 并指定为 1
            // food.count = 1 // 添加 count 属性, 并指定为 1
            // 问题: 新添加的属性是没有数据劫持==>没有数据绑定==>更新了数据但界面不变
            Vue.set(food, 'count', 1)// vue上面set方法：给有数据绑定的food对象，添加指定属性名和值

            //点击food，第一次添加count属性。并将该food对象添加到购物车数组cartFoods中，cartFoods中才会有count数据相应
            state.cartFoods.push(food)
        }
        else {
            food.count++
        }
    },
    DECREASE_FOOD_COUNT(state, { food }) {
        if (food.count) {
            food.count--
            if (food.count === 0) {
                // 如果当前food.count减到0，就将当前food从cartFoods数组中移除splice(start,n,添加元素) 开始位置 删除个数，添加元素
                state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
            }
        }
    },

    CLEAR_CARTFOODS(state) {
        state.cartFoods.forEach((item) => {
            return item.count = 0
        })
        state.cartFoods = []
    },

    RECEIVE_SEARCH_SHOPS(state, { searchShops }) {
        state.searchShops = searchShops
    }
}