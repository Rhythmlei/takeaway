import Vue from "vue";
import VueRouter from "vue-router";

// import Miste from '../pages/Miste/Miste'
// import Search from '../pages/Search/Search'
// import Order from '../pages/Order/Order'
// import Personal from '../pages/Personal/Personal'
// import Login from '../pages/Login/Login'
// 最外层的顶级路由懒加载    () => import()  函数
const Miste = () => import('../pages/Miste/Miste')
const Search = () => import('../pages/Search/Search')
const Order = () => import('../pages/Order/Order')
const Personal = () => import('../pages/Personal/Personal')
const Login = () => import('../pages/Login/Login')

import Shop from '../pages/Shop/Shop'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods'
import ShopRatings from '../pages/Shop/ShopRatings/ShopRatings'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo'
Vue.use(VueRouter)

export default
    new VueRouter({
        routes: [
            { path: '/miste', component: Miste, meta: { showFooter: true } },
            { path: '/search', component: Search, meta: { showFooter: true } },
            { path: '/order', component: Order, meta: { showFooter: true } },
            { path: '/personal', component: Personal, meta: { showFooter: true } },
            { path: '/login', component: Login, meta: { showFooter: false } },

            {
                path: '/shop', component: Shop, meta: { showFooter: false }, children: [
                    { path: '/shop/shopgoods', component: ShopGoods },
                    { path: '/shop/shopratings', component: ShopRatings },
                    { path: '/shop/shopinfo', component: ShopInfo },

                    { path: '', redirect: '/shop/shopgoods' },
                ]
            },

            { path: '/', redirect: '/miste' },
        ],
        mode: 'history'
    })