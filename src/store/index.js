// 整个vuex的核心对象store，收拢各个模块，暴露一个统一的store模块给main
import Vue from "vue";
import Vuex from 'vuex'

import state from "./state";
import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

Vue.use(Vuex)

export default
    new Vuex.Store({
        state,
        getters,
        actions,
        mutations,
    })