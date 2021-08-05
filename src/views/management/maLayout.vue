<template>
  <v-app>
    <!-- 导航栏 -->
    <v-navigation-drawer fixed width="225px">
      <v-row class="fill-height" no-gutters>
        <!-- 左导航栏 -->
        <v-navigation-drawer
          v-model="drawer"
          :color="color"
          :mini-variant="miniVariant"
          permanent
          :src="bg"
          dark
        >
          <v-list
            dense
            class="py-0"
          >
            <v-list-item two-line :class="miniVariant && 'px-0'">
              <v-menu
                v-model="menu"
                :close-on-content-click="false"
                :nudge-width="200"
                offset-x
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-list-item-avatar
                    color="indigo"
                    dark
                    v-bind="attrs"
                    v-on="on"
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
                        <v-list-item-title>陈鸿炜</v-list-item-title>
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
  
                  <v-list>
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
                  </v-list>
  
                  <!-- 个人信息表按钮 -->
                  <v-card-actions>
                    <v-spacer></v-spacer>
  
                    <v-btn text @click="menu = false">退 出</v-btn>
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
        <v-list nav class="grow" v-if="this.submenu === '个人信息'">

          <v-subheader>{{ this.submenu }}</v-subheader>
          <v-list-item-group v-model="item" color="primary">
            <v-list-item
              v-for="item in dashboardmenu"
              :key="item.subtitle"
            >
              <v-list-item-icon @click="routerClick(item)">
                <v-icon>mdi-chevron-right</v-icon>
                <span>{{item.subtitle}}</span>
              </v-list-item-icon>
            </v-list-item>
          </v-list-item-group>
        </v-list>

        <!-- 选项二 -->
        <v-list class="grow" v-if="this.submenu === '抽奖管理'">
          <v-subheader>{{ this.submenu }}</v-subheader>
          <v-list-item-group v-model="item" color="primary">
            <v-list-item
              v-for="item in photosmenu"
              :key="item.subtitle"
            >
              <v-list-item-icon @click="routerClick(item)">
                <v-icon>mdi-chevron-right</v-icon>
                <span>{{item.subtitle}}</span>
              </v-list-item-icon>
            </v-list-item>
          </v-list-item-group>
        </v-list>

        <!-- 选项三 -->
        <v-list class="grow" v-if="this.submenu === '奖品管理'">
          <v-subheader>{{ this.submenu }}</v-subheader>
          <v-list-item-group v-model="item" color="primary">
            <v-list-item
              v-for="item in aboutmenu"
              :key="item.subtitle"
            >
              <v-list-item-icon @click="routerClick(item)">
                <v-icon>mdi-chevron-right</v-icon>
                <span>{{item.subtitle}}</span>
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
  export default {
    name: 'Layout',

    data: () => ({
      // 导航栏
      drawer: true,
      items: [
        { title: '个人信息', icon: 'mdi-view-dashboard' },
        { title: '抽奖管理', icon: 'mdi-image' },
        { title: '奖品管理', icon: 'mdi-help-box' },
      ],
      submenu: '个人信息',
      dashboardmenu: [
        { subtitle: 'Home1', id: 'person' },
        { subtitle: '个人信息' },
        { subtitle: 'Settings' }
      ],
      photosmenu: [
        { subtitle: '添加活动', id: 'addActivity' },
        { subtitle: '活动管理' },
        { subtitle: '奖品管理' }
      ],
      aboutmenu: [
        { subtitle: '会员信息' },
        { subtitle: '奖品' },
        { subtitle: 'Set' }
      ],
      color: 'primary',
      colors: [
        'primary',
        'blue',
        'success',
        'red',
        'teal',
      ],
      miniVariant: true,
      background: true,
      item: [
        {
          text: '个人信息',
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
    }
  }
</script>
