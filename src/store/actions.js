// 包含多个，间接异步更新state数据的函数，对象
// 那些接口函数返回的是promise对象，就需要使用async+await，直接得到promise对象的数据结果
import { reqAddress, reqFoodTypes, reqShops, reqUserInfo, reqLogout, reqShopInfo, reqShopRatings, reqShopGoods, reqSearchShop } from '../api/index'

export default {
    async receive_address({ commit, state }) {
        const geohash = state.latitude + ',' + state.longitude
        const result = await reqAddress(geohash)
        if (result.code === 0) {
            const address = result.data
            commit('RECEIVE_ADDRESS', { address })
        }
    },
    async receive_foodtypes({ commit }) {
        const result = await reqFoodTypes()
        if (result.code === 0) {
            const foodtype = result.data
            commit('RECEIVE_FOODTYPES', { foodtype })
        }
    },
    async receive_shops({ commit, state }) {
        const { latitude, longitude } = state
        const result = await reqShops({ latitude, longitude })
        if (result.code === 0) {
            const shop = result.data
            commit('RECEIVE_SHOPS', { shop })
        }
    },

    // 先往state里面存数据：
    // 注意：这里是 “同步” 保存记录（更新）用户信息的回调函数。
    // 在login组件中两种登录的异步请求成功后，将登录的用户信息数据user-->userinfo参数传进去
    // 不需要调用api中的异步请求接口函数了
    record_userInfos({ commit }, userinfo) {
        commit('RECEIVE_USERINFOS', { userinfo })
    },

    // 再从state里面异步拿出数据：
    // 在该应用打开时,就需要自动异步更新请求拿出后台的用户信息数据(相当于自动登录，一天之内)
    async receive_userInfos({ commit }) {
        const result = await reqUserInfo()
        if (result.code === 0) {
            const userinfo = result.data
            commit('RECEIVE_USERINFOS', { userinfo })
        }
    },
    // 异步登出请求的回调函数
    async logout({ commit }) {
        const result = await reqLogout()
        if (result.code === 0) {
            commit('RESET_USERINFOS')
        }
    },

    async receive_shopgoods({ commit }) {
        const result = await reqShopGoods()
        if (result.code === 0) {
            const shopgood = result.data
            commit('RECEIVE_SHOPGOODS', { shopgood })
        }
    },
    async receive_shopratings({ commit }) {
        const result = await reqShopRatings()
        if (result.code === 0) {
            const shoprating = result.data
            commit('RECEIVE_SHOPRATINGS', { shoprating })
        }
    },
    async receive_shopinfo({ commit }) {
        const result = await reqShopInfo()
        if (result.code === 0) {
            const shopinfo = result.data
            commit('RECEIVE_SHOPINFO', { shopinfo })
        }
    },


    // 同步更新food中的count属性
    update_food_count({ commit }, { food, isAdd }) {
        if (isAdd) {
            commit('INCREASE_FOOD_COUNT', { food })
        }
        else {
            commit('DECREASE_FOOD_COUNT', { food })
        }
    },

    // 同步（不需要跟后台异步请求接口）清空购物车
    clear_cartFoods({ commit }) {
        commit('CLEAR_CARTFOODS')
    },


    async searchShops({ commit, state }, keyword) {
        const  geohash  = state.latitude + ',' + state.longitude
        const result = await reqSearchShop( geohash, keyword )
        if (result.code === 0) {
            const searchShops = result.data
            commit('RECEIVE_SEARCH_SHOPS', { searchShops })
        }
    }
}