<template>
  <div>
    <div>{{ person }}</div>
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
        </v-list-item-content>

        <v-list-item-action>
          <v-btn icon>
            <v-icon color="grey lighten-1">mdi-clipboard-text</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>

    </v-list>
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
  export default {
    name: 'Adward',

    data: () => ({
      // 测试数据
      items: [
        { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: '中奖1', subtitle: '123', thirdtitle: '321' },
        { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: '中奖2', subtitle: '456', thirdtitle: '654' },
        { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: '中奖3', subtitle: '789', thirdtitle: '987' },
      ],
      // 
      person: '个人信息',
      // 获取本地数据
      userMsg: {}
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
                    date: i.date
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
    }

  }
</script>
