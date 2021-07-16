import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/login/index.vue'

// 主页面
import Layout from '../views/Layout.vue'
// ==============================
// layout子路由
// 个人信息页面
import person from '../views/person/index.vue'
// 地址页面
import address from '../views/person/address/address.vue'
import addAddress from '../views/person/address/addAddress.vue'
// 中奖页面
import adward from '../views/person/adward/adward.vue'
// 主页
import ngs from '../views/ngs/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Layout',
    component: Layout,
    children: [
      // 个人信息
      {
        path: '/home/person',
        name: 'Person',
        component: person,
        // children: [
        //   {
        //     path: '/home/person/address',
        //     name: 'Address',
        //     component: address
        //   },
        //   {
        //     path: '/home/person/adward',
        //     name: 
        //   }
        // ]
      },
      // 主页面
      {
        path: '/home/ngs',
        name: 'Ngs',
        component: ngs
      },
      // 地址管理
      {
        path: '/home/address',
        name: 'Address',
        component: address
      },
      // 添加地址
      {
        path: '/home/addAddress',
        name: 'addAddress',
        component: addAddress
      },
      // 中奖记录页面
      {
        path: '/home/adward',
        name: 'Adward',
        component: adward
      }
    ]
  },
  {
    path: '/',
    redirect: '/home/ngs'
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router