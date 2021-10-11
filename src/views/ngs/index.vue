<template>
  <div id="app">
    <v-row dense class="mt-10">
      <v-col cols="12">
        <v-card
          color="#385F73"
          dark
        >
          <v-card-title class="headline">活动list</v-card-title>

          <!-- <v-card-subtitle>选择活动</v-card-subtitle> -->

          <!-- <v-card-actions>
            <v-btn text>XXXXX</v-btn>
          </v-card-actions> -->
        </v-card>
      </v-col>

      <v-col
        v-for="(item, i) in items"
        :key="i"
        cols="12"
      >
        <v-card
          :color="item.color"
          dark
        >
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title
                class="headline"
                v-text="item.name"
              ></v-card-title>

              <v-card-subtitle style="font-size:14px;">剩余活动抽奖次数：{{item.remainingDraws}}</v-card-subtitle>
              <v-card-actions>
                <v-btn :elevation="4" text @click="patchBtn(item)">兑换抽奖次数</v-btn>
                <v-btn :elevation="4" text @click="postBtn(item)">抽奖</v-btn>
              </v-card-actions>
              
            </div>

            <v-avatar
              class="ma-3"
              size="125"
              tile
              @click="activityBtn(item)"
            >
              <v-img :src="require('../../assets/activity.png')"></v-img>
            </v-avatar>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <!-- <v-btn @click="getUserinfo">获取用户信息</v-btn>
    <v-btn @click="deleteUserBtn">删除用户信息</v-btn> -->

    <!-- <router-link to="/">返回</router-link>

    <v-btn @click="guaBtn">点我跳转刮刮卡</v-btn>

    <div @click="vm.showDialog = true">点我打开Dialog</div>
    <div class="dialogDiv" v-if="vm.showDialog">
      <div class="borderDiv">
        <v-btn @click="closeBtn" class="closeImg">X</v-btn>
        <div class="message">这是一段中奖信息</div>
      </div>
    </div>

    <div class="modal-header">
      <h3>custom header</h3>
      <v-btn>点击按钮--开始</v-btn>
    </div> -->

    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark :color="msg.color">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-list three-line subheader>
          <!-- <v-subheader>活动详情</v-subheader>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>{{ msg.title }}</v-list-item-title>
              <v-list-item-subtitle>{{ msg.subtitle }}</v-list-item-subtitle>
              <v-list-item-subtitle>可抽奖次数：{{ msg.cishu }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-btn style="margin:10px 10vw; color:white;" width="80vw" :color="msg.color">抽奖</v-btn>
          <v-divider></v-divider> -->
          <v-img :src="require('../../assets/actinfo.jpg')"></v-img>
        </v-list>
        
        <!-- <v-list three-line subheader>
          <v-subheader>General</v-subheader>
          <v-list-item>
            <v-list-item-action>
              <v-checkbox v-model="notifications"></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Notifications</v-list-item-title>
              <v-list-item-subtitle>Notify me about updates to apps or games that I downloaded</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-action>
              <v-checkbox v-model="sound"></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Sound</v-list-item-title>
              <v-list-item-subtitle>Auto-update apps at any time. Data charges may apply</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-action>
              <v-checkbox v-model="widgets"></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Auto-add widgets</v-list-item-title>
              <v-list-item-subtitle>Automatically add home screen widgets</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list> -->
      </v-card>
    </v-dialog>


  </div>
</template>

<script>

import {
  getuserid, // 获取用户id
  getActivityAvailable, // 获取活动列表  GetActivityAvailable
  getUser, // 获取用户信息
  deleteUser, // 删除用户信息
  postActivityUserBindAvailable, // 为用户绑定所有可参与活动
  patchActivityUser, // 用户兑换抽奖次数
  // postLottery, // 抽奖,
  getActivityUserUser, // 获取用户正在参与的活动
  getActivity, // 获取活动信息 
} from '../../api/module/backend'
import dayjs from 'dayjs'


export default {
  name: 'Playngs',
  data: () => ({
      vm: {
        showDialog: false,
      },
      userMsg: {},
      // 需要算上库存 设置物品权重
      wupin: [
        { id: 1, name: '可乐', shu: 100, weight: 100 },
        { id: 2, name: '雪碧', shu: 100, weight: 100 },
        { id: 3, name: '铅笔', shu: 50, weight: 50 },
        { id: 4, name: '记事本', shu:10, weight: 10 },
      ],
      addward: '',
      personid: '',
      randomNum: 0,
      randomNum2: 0,
      randomMsg: '',
      items: [],
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      msg: {},
      info: [
        {
          name: '活动名称',
        }
      ],
      colorItem: ['#1F7087', '#952175'],
  }),
  created () {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.fetchData()
    // this.getLS()
    this.getActAvailable()
    this.getUserinfo()
    // this.getPhoto()
    // this.getAdward()
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'fetchData'
  },
  methods: {
    // getPhoto() {
    //   this.picture1 = picture
    // },
    // 获取localstorage信息
    getLocalStorageUser() {
      let user = localStorage.getItem('user')
      user = JSON.parse(user)
      return user
    },
    // 抽奖按钮
    postBtn(val) {
      console.log('抽奖')
      console.log(val)
      let user = this.getLocalStorageUser()
      console.log(user)
      let data = {
        channelCode: user.login_channel, // 渠道
        lotteryDisplay: val.lotteryDisplay, // 抽奖类型
        userId: user.userId, // 用户id
        activityId: val.activityId, // 活动id
        count: 1 // 抽奖次数
      }
      console.log(data)
      this.$router.push({path: '/home/zhuan', query: data})
      // postLottery(data).then(res => {
      //   console.log(res)
      //   this.getActAvailable()
      // })
    },
    // 兑换次数
    patchBtn(val) {
      console.log(val)
      console.log('兑换抽奖次数')
      let user = this.getLocalStorageUser()
      let data = {
        activityId: val.activityId,
        userId: user.userId,
        count: 1,
        unitPrice: 1, // 兑换的积分
        reason: "抽奖兑换次数"
      }
      console.log(data)
      patchActivityUser(data).then(res => {
        console.log(res)
        this.getActAvailable()
      })
    },

    // 删除用户
    deleteUserBtn() {
      let user = this.getLocalStorageUser()
      let userId = {
        id: user.userId
      }
      console.log(userId)
      deleteUser(userId).then(res => {
        console.log(res)
      })
    },
    // 活动详情
    activityBtn(val) {
      console.log(val)
      this.dialog = true
      this.msg = val
    },
    // 跳转刮刮卡
    guaBtn() {
      this.$router.push({
        path: '/home/gua'
      })
    },
    closeBtn(){
      this.vm.showDialog = false;
    },
    // 确定
    dec() {
      let a = 0
      console.log(a)
    },
    // 开始抽奖
    startC() {
      let a = document.getElementById('pointer')
      var t
      var stopT = Math.floor( Math.random() * 10 + 1 )
      console.log(stopT)
      // t = 360 * ( stopT / 10 ) + 1080
      t = 360 * 10
      a.style.transform = 'rotate(' + t + 'deg)'
      a.style.transition = 'all 4s ease 0.5s'
    },

    // 获取localstorage信息
    getLS() {
      getuserid().then(res => {
        if (res) {
          console.log("userid:")
          console.log(res)
          let info = {
            userId: res.data.sub
          }
          info = JSON.stringify(info)
          localStorage.setItem('user', info)
          // 后续获取到用户id之后自动获取用户数据信息并保存到localstorage中
        } else {
          console.log('刷新')
        }
      })
    },

    

    // 获取活动列表 并绑定所有活动
    getActAvailable() {
      this.info = []
      let user = this.getLocalStorageUser()
      let dj = dayjs().format('YYYY-MM-DD')
      let data = {
        startTime: dj,
        AvailableChannels: user.login_channel
      }
      data = JSON.stringify(data)
      data = JSON.parse(data)
      // console.log(data)
      getActivityAvailable(data).then(res => {
        console.log(res.data.data)
      })
      let binddata = {
        userId: user.userId,
        availableChannel: user.login_channel
      }
      // console.log(binddata)
      postActivityUserBindAvailable(binddata).then(res => {
        console.log(res)
        let getData = {
          userId: user.userId,
          availableChannel: user.login_channel
        }
        getActivityUserUser(getData).then(res2 => {
          // console.log(res2.data.data)
          for (let i of res2.data.data) {
            // console.log(i)
            let actData = {
              Id: i.activityId
            }
            getActivity(actData).then(actinfo => {
              // console.log('活动信息：')
              let a = actinfo.data.data
              // console.log(a)
              let j = {
                activityId: a.id,
                name: a.name,
                availableChannels: a.availableChannels,
                activityType: a.activityType,
                lotteryDisplay: a.lotteryDisplay,
                startTime: a.startTime,
                endTime: a.endTime,
                activityCode: a.activityCode,
                userId: i.userId,
                usedDraws: i.usedDraws,
                todayUsedDraws: i.todayUsedDraws,
                remainingDraws: i.remainingDraws,
                attendanceDays: i.attendanceDays,
                sequentialAttendanceDays: i.sequentialAttendanceDays,
                lastAttendanceDate: i.lastAttendanceDate,
                // color: this.colorItem[i]
              }
              // console.log(j)
              this.info.push(j)
              // console.log(this.info.length)
              let c = this.info.length
              let mod = c % 2
              // console.log(mod)
              this.info[c-1].color = this.colorItem[mod]
              // console.log(this.info)
              this.items = this.info
            })
          }
        })
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
      })
    },
    // 计算中奖物品
    getAdward() {
      const a = this.wupin
      let i = 0
      let n = 0
      for (i; i < a.length; i++){
        n += a[i].shu
      }
      const r1 = Math.floor(Math.random() * n) + 1
      let n1 = 0
      for (i = 0; i < a.length; i++){
        n1 += a[i].shu
        if (r1 <= n1) {
          this.addward = a[i].name
          break
        }
      }
      this.randomNum = r1
      // console.log(r1)
    },
    getRandom() {
      const a = Math.floor(Math.random() * 100)
      this.randomNum2 = a
      if (a <= 80) {
        this.randomMsg = '没中奖...'
        this.randomNum = 0
        this.addward = ''
      } else if (a > 80 && a <= 100) {
        this.randomMsg = '中奖了！'
        this.getAdward()
      }
    },
    fetchData () {
      this.personid = this.$route.params.id
      // this.msg = 'ngs'
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

