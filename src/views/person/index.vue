<template>
  <div>
    <div>{{ person }}</div>
    <v-list two-line subheader>
      <v-subheader inset>个人资料</v-subheader>

      <!-- <v-list-item>
        <v-list-item-content>
          <v-list-item-title> 个人资料 </v-list-item-title>
        </v-list-item-content>
      </v-list-item> -->

      <v-list-item
        v-for="item in items"
        :key="item.title"
      >
        <!-- <v-list-item-avatar>
          <v-icon
            :class="[item.iconClass]"
            v-text="item.icon"
          ></v-icon>
        </v-list-item-avatar> -->

        <v-list-item-content @click="itemBtn(item)">
          <v-list-item-title v-text="item.title"></v-list-item-title>
          <v-list-item-subtitle v-show="item.title === '个人信息'">积分：{{item.subtitle}}</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <!-- <v-btn v-if="item.val === 0" icon @click="attendance(item)">
            签到
          </v-btn> -->
          <v-btn v-if="item.val !== 0" icon @click="itemBtn(item)">
            <v-icon color="grey lighten-1">mdi-information</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>

    </v-list>
  </div>
</template>

<script>
import {
  getUser, // 获取用户信息
  postAttendance, // 签到
} from '../../api/module/backend'
  export default {
    name: 'Person',

    data: () => ({
      // 测试数据
      items: [
        { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: '个人信息', subtitle: '', val: 0 },
        { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: '中奖记录', subtitle: '', val: 1 },
        { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: '地址管理', subtitle: '', val: 2 },
      ],
      // 
      person: '个人信息',

      // 获取本地数据
      userMsg: {}
    }),

    created() {
      this.ifLogin()
      this.getUserinfo()
    },

    methods: {
      // 签到
      attendance(data) {
        console.log('签到：')
        console.log(data)
        let user = this.getLocalStorageUser()
        let postdata = {
          channelCode: "ngs",
          earnedCredits: 0,
          reason: "签到",
          userId: user.userId,
          activityId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
        }
        console.log(postdata)
        postAttendance(postdata).then(res => {
          console.log(res)
        })
      }, 
      
      // 获取用户信息
      getUserinfo() {
        let user = this.getLocalStorageUser()
        let userId = {
          id: user.userId
        }
        console.log(userId)
        getUser(userId).then(res => {
          console.log('获取到的用户数据')
          console.log(res)
          this.items[0].subtitle = res.data.data.credit
        })
      },


      // 判断是否登录
      ifLogin() {
        this.userMsg = JSON.parse(localStorage.getItem('token'))
        // console.log(this.userMsg)
        if(!this.userMsg) {
          this.userMsg = {}
          this.$router.push({path: '/login'})
        } else if (this.userMsg) {
          console.log('登录')
        }
      },

      // 列表按钮
      itemBtn(value) {
        console.log(value.val)
        if (value.val === 2) {
          this.$router.push({
            path: '/home/address'
          })
        } else if (value.val === 1) {
          this.$router.push({
            path: '/home/adward'
          })
        }
      },
      // 获取localstorage信息
      getLocalStorageUser() {
        let user = localStorage.getItem('user')
        user = JSON.parse(user)
        return user
      },

    }

  }
</script>