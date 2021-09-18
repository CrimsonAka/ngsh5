<template>
  <div class="mr">
    <v-list two-line subheader>
      <v-subheader inset>历史中奖记录</v-subheader>

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

        <v-list-item-content>
          <v-list-item-title v-text="item.activityName"></v-list-item-title>
          <v-list-item-subtitle>{{item.prizeTierName}} - {{item.prizeItemName}}</v-list-item-subtitle>
          <!-- <v-list-item-subtitle v-if="item.prizeType === 'Coupon'">{{item.couponActiveCode}}</v-list-item-subtitle> -->
        </v-list-item-content>

        <!-- <v-list-item-action>
          <v-btn icon>
            <v-icon color="grey lighten-1"  @click="crtlC(item)">mdi-clipboard-text</v-icon>
          </v-btn>
        </v-list-item-action> -->
      </v-list-item>

    </v-list>


    <!-- 提示框 -->
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      top
    >
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import {
  getLotteryWinRecords, // 获取用户获奖记录
  getPrizeItemById,
  getPrizeTier,
  getActivity
  // getLotteryRecords
} from '../../../api/module/backend'
// import Clipboard from 'clipboard';
  export default {
    name: 'Adward',

    data: () => ({
      // 测试数据
      items: [
        // { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: '中奖1', subtitle: '123', thirdtitle: '321' },
        // { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: '中奖2', subtitle: '456', thirdtitle: '654' },
        // { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: '中奖3', subtitle: '789', thirdtitle: '987' },
      ],
      // 
      person: '个人信息',
      // 获取本地数据
      userMsg: {},
      snackbar: false,
      text: '请输入正确手机号！',
      timeout: 1500,
    }),

    created() {
      this.getLotteryWinningRecords()
    },

    methods: {
      // 获取用户历史中奖记录
      getLotteryWinningRecords() {
        // let dataD = []
        this.items = []
        let user = localStorage.getItem('user')
        user = JSON.parse(user)
        let userid = {
          UserId: user.userId
        }
        console.log(userid)
        getLotteryWinRecords(userid).then(res => {
          // console.log(res.data.data)
          let D = res.data.data
          for (let i of D) {
            console.log(i)
            let itemId = {
              Id: i.prizeItemId
            }
            let tierId = {
              Id: i.prizeTierId
            }
            let actId = {
              Id: i.activityId
            }
            getPrizeItemById(itemId).then(res2 => {
              // console.log(res2.data.data)
              let itemData = res2.data.data
              getPrizeTier(tierId).then(res3 => {
                // console.log(res3.data.data)
                let tierData = res3.data.data
                getActivity(actId).then(res4 => {
                  // console.log(res4.data.data)
                  let actData = res4.data.data
                  let a = {
                    activityId: actData.id,
                    activityName: actData.name,
                    lotteryDisplay: actData.lotteryDisplay,
                    prizeTierId: tierData.id,
                    prizeTierName: tierData.name,
                    prizeItemId: itemData.id,
                    prizeItemName: itemData.name,
                    prizeType: itemData.prizeType,
                    date: i.date,
                    credit: itemData.credit,
                    couponActiveCode: itemData.couponActiveCode
                  }
                  // dataD.push(a)
                  if (itemData.credit === 0) {
                    console.log('积分为0')
                  } else {
                    console.log('积分不为0')
                    this.items.push(a)
                  }
                })
              })
            })
            
          }
        })
        // getLotteryRecords(userid).then(res => {
        //   console.log(res)
        // })
      },

      // crtlC(val) {
      //   console.log(val)
      //   var clipboard = new Clipboard('#clip')
      //   clipboard.on('success', e => {
      //     this.snackbar = true
      //     this.text = '复制成功'
      //     console.log(e)
      //     //  释放内存
      //     clipboard.destory()
      //   })
      //   clipboard.on('error', e =>{
      //     console.log(e)
      //     // 不支持复制
      //     console.log('该浏览器不支持复制')
      //     // 释放内存
      //     clipboard.destory()
      //   })
      // },
    }

  }
</script>

<style scoped>
.mr{
  margin-top: 20px;
  margin-bottom: 45px;
}
</style>
