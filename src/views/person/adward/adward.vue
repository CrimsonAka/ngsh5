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
          <v-list-item-title v-text="item.title"></v-list-item-title>
          <v-list-item-subtitle>{{item.subtitle}}  {{item.thirdtitle}}</v-list-item-subtitle>
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
        let user = localStorage.getItem('user')
        user = JSON.parse(user)
        let userId = {
          UserId: user.userId
        }
        console.log(userId)
        getLotteryWinRecords(userId).then(res => {
          console.log(res)
        })
      },
    }

  }
</script>
