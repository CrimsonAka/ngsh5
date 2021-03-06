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
import gua from '../views/ngs/choujiang/gua.vue'

import zhuan from '../views/ngs/choujiang/zhuan.vue'


// 管理页面
import maLayout from '../views/management/maLayout.vue'
import addActivity from '../views/management/pro/addActivity.vue'
import addProd from '../views/management/pro/addProd.vue'
import manageActivity from '../views/management/pro/manageActivity.vue'
import manageProd from '../views/management/pro/manageProd.vue'
import maLogin from '../views/management/login/maLogin.vue'
import addPrizeTier from '../views/management/pro/addPrizeTier.vue'
import addmanager from '../views/management/pro/addManager.vue'


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
      // 抽奖页面
      {
        path: '/home/gua',
        name: 'Gua',
        component: gua
      },
      // 转盘
      {
        path: '/home/zhuan',
        name: 'Zhuan',
        component: zhuan
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
    redirect: '/login'
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
    meta: {
      pagetitle: '登录'
    },
    component: Login
  },

  // 管理端页面 
  {
    path: '/management',
    name: 'management',
    component: maLayout,
    children: [
      {
        path: '/management/person',
        name: 'Person',
        component: person
      },
      {
        path: '/management/addActivity',
        name: 'AddActivity',
        component: addActivity
      },
      {
        path: '/management/addprod',
        name: 'AddProd',
        component: addProd
      },
      {
        path: '/management/addManager',
        name: 'AddManager',
        component: addmanager,
      },
      {
        path: '/management/addPrizeTier',
        name: 'AddPrizeTier',
        component: addPrizeTier
      },
      {
        path: '/management/manageActivity',
        name: 'ManageActivity',
        component: manageActivity
      },
      {
        path: '/management/manageProd',
        name: 'ManageProd',
        component: manageProd
      }
    ]
  },
  {
    path: '/management/login',
    name: 'MaLogin',
    component: maLogin
  }
]

const router = new VueRouter({
  mode: 'history',
  base: '/choujiang/',
  routes
})

export default router
