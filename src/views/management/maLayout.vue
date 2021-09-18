<template>
  <v-app>
    <!-- 导航栏 -->
    <v-navigation-drawer absolute width="225px">
      <v-row class="fill-height" no-gutters>
        <!-- 左导航栏 -->
        <v-navigation-drawer
          v-model="drawer"
          mini-variant
          permanent
          :src="bg"
          dark
        >
          <v-list
            dense
            class="py-0"
          >
            <v-list-item :class="'px-0'">
              <v-menu
                v-model="menu"
                :close-on-content-click="false"
                :nudge-width="200"
                offset-x
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-list-item-avatar
                    dark
                    v-bind="attrs"
                    v-on="on"
                    style="margin:10px auto;"
                  >
                    <img alt="wutu" src="https://randomuser.me/api/portraits/men/81.jpg">
                  </v-list-item-avatar>
                </template>

                <!-- 个人信息窗口 -->
                <v-card>
                  <v-list>
                    <v-list-item>
                      <v-list-item-avatar>
                        <img src="https://randomuser.me/api/portraits/men/81.jpg" alt="John">
                      </v-list-item-avatar>
  
                      <v-list-item-content>
                        <!-- <v-list-item-title>陈鸿炜</v-list-item-title> -->
                        <v-list-item-subtitle>管理员</v-list-item-subtitle>
                      </v-list-item-content>
  
                      <v-list-item-action>
                        <v-btn
                          :class="fav ? 'red--text' : ''"
                          icon
                          @click="fav = !fav"
                        >
                          <v-icon>mdi-heart</v-icon>
                        </v-btn>
                      </v-list-item-action>
                    </v-list-item>
                  </v-list>
  
                  <v-divider></v-divider>
  
                  <!-- <v-list>
                    <v-list-item>
                      <v-list-item-action>
                        <v-switch v-model="message" color="purple"></v-switch>
                      </v-list-item-action>
                      <v-list-item-title>Enable messages</v-list-item-title>
                    </v-list-item>
  
                    <v-list-item>
                      <v-list-item-action>
                        <v-switch v-model="hints" color="purple"></v-switch>
                      </v-list-item-action>
                      <v-list-item-title>Enable hints</v-list-item-title>
                    </v-list-item>
                  </v-list> -->
  
                  <!-- 个人信息表按钮 -->
                  <v-card-actions>
                    <v-spacer></v-spacer>
  
                    <v-btn text @click="backBtn">退 出</v-btn>
                    <v-btn color="primary" text @click="menu = false">关 闭</v-btn>
                  </v-card-actions>
                </v-card>
              </v-menu>
            </v-list-item>

            <v-divider></v-divider>

            <v-list-item
              v-for="item in items"
              :key="item.title"
              link
            >
              <v-tooltip right>
                <template v-slot:activator="{ on, attrs }">
                  <v-list-item-icon
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon @click="changeList(item)">{{ item.icon }}</v-icon>
                  </v-list-item-icon>
                </template>
                <span>{{ item.title }}</span>
              </v-tooltip>
              
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>

        <!-- 选项一 -->
        <v-list dense nav v-if="this.submenu === '用户管理'">

          <v-subheader style="font-size:17px; font-weight:700;">{{ this.submenu }}</v-subheader>
          <v-list-item-group v-model="item" color="blue">
            <v-list-item
              v-for="item in dashboardmenu"
              :key="item.subtitle"
            >
              <v-list-item-icon @click="routerClick(item)">
                <v-icon medium>mdi-chevron-right</v-icon>
                <span style="font-size: 14px;line-height:180%">{{item.subtitle}}</span>
              </v-list-item-icon>
            </v-list-item>
          </v-list-item-group>
        </v-list>

        <!-- 选项二 -->
        <v-list dense nav  v-if="this.submenu === '活动管理'">
          <v-subheader style="font-size:17px; font-weight:700;">{{ this.submenu }}</v-subheader>
          <v-list-item-group v-model="item" color="blue">
            <v-list-item
              v-for="item in photosmenu"
              :key="item.subtitle"
            >
              <v-list-item-icon @click="routerClick(item)">
                <v-icon medium>mdi-chevron-right</v-icon>
                <span style="font-size: 14px;line-height:180%">{{item.subtitle}}</span>
              </v-list-item-icon>
            </v-list-item>
          </v-list-item-group>
        </v-list>

        <!-- 选项三 -->
        <v-list dense nav  v-if="this.submenu === '奖品管理'">
          <v-subheader style="font-size:17px; font-weight:700;">{{ this.submenu }}</v-subheader>
          <v-list-item-group v-model="item" color="blue">
            <v-list-item
              v-for="item in aboutmenu"
              :key="item.subtitle"
            >
              <v-list-item-icon @click="routerClick(item)">
                <v-icon medium>mdi-chevron-right</v-icon>
                <span style="font-size: 14px;line-height:180%">{{item.subtitle}}</span>
              </v-list-item-icon>
            </v-list-item>
          </v-list-item-group>
        </v-list>

      </v-row>
    </v-navigation-drawer>

    <!-- Sizes your content based upon application components -->
    <v-main style="margin-left:245px; margin-top:20px;">
      <!-- Provides the application the proper gutter -->

      <!-- If using vue-router -->
      <router-view></router-view>
    </v-main>
  </v-app>
  
</template>

<script>
import {
    getuserid // 获取用户id
  } from '../../api/module/backend'
  export default {
    name: 'Layout',

    data: () => ({
      // 导航栏
      drawer: true,
      items: [
        { title: '用户管理', icon: 'mdi-view-dashboard' },
        { title: '活动管理', icon: 'mdi-image' },
        { title: '奖品管理', icon: 'mdi-help-box' },
      ],
      submenu: '活动管理',
      dashboardmenu: [
        // { subtitle: 'Home1', id: 'person' },
        { subtitle: '添加管理', id: 'addManager' },
      ],
      photosmenu: [
        { subtitle: '添加活动', id: 'addActivity' },
        { subtitle: '活动管理', id: 'manageActivity' },
      ],
      aboutmenu: [
        { subtitle: '添加商品', id: 'addProd' },
        { subtitle: '奖品管理', id: 'manageProd' },
      ],
      miniVariant: true,
      background: true,
      item: [
        {
          text: '用户管理',
          disabled: false,
          href: 'breadcrumbs_dashboard',
        },
        {
          text: 'Link 1',
          disabled: false,
          href: 'breadcrumbs_link_1',
        },
        {
          text: 'Link 2',
          disabled: true,
          href: 'breadcrumbs_link_2',
        },
      ],
      links: ['Home', 'Contacts', 'Settings'],
      fav: true,
      menu: false,
      message: false,
      hints: true,
    }),
    computed: {
      bg () {
        return this.background ? 'https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg' : undefined
      },
    },
    methods: {
      // 更改选项
      changeList(value) {
        console.log(value.title)
        this.submenu = value.title
      },
      // 页面跳转
      routerClick(val) {
        console.log(val)
        if (val.id) {
          console.log('1')
          let a = '/management/' + val.id
          console.log(a)
          this.$router.push({ path: a })
        }
      },
      // 获取用户信息
      getUser() {
        getuserid().then(res2 => {
          console.log('用户信息：')
          console.log(res2)
        })
      },
      // 登出按钮
      backBtn() {
        this.$router.push({ path: '/management/login' })
      },
    }
  }
</script>
