// 基于状态对象state中的的数据，所得的计算属性对象
export default {
    totalCount(state) {
        return state.cartFoods.reduce((pre, food) => pre + food.count, 0)
    },
    totalPrice(state) {
        return state.cartFoods.reduce((pre, food) => pre + food.count * food.price, 0)
    },
    positiveSize(state) {
        return state.shopRatings.reduce((pre, rating) => pre + (rating.rateType === 0 ? 1 : 0), 0)
    }
}