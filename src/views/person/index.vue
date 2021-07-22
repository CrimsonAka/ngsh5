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
        <v-list-item-avatar>
          <v-icon
            :class="[item.iconClass]"
            v-text="item.icon"
          ></v-icon>
        </v-list-item-avatar>

        <v-list-item-content @click="itemBtn(item)">
          <v-list-item-title v-text="item.title"></v-list-item-title>
          <v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn v-if="item.val === 0" icon @click="itemBtn(item)">
            签到
          </v-btn>
          <v-btn v-if="item.val !== 0" icon @click="itemBtn(item)">
            <v-icon color="grey lighten-1">mdi-information</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>

    </v-list>
  </div>
</template>

<script>
  export default {
    name: 'Person',

    data: () => ({
      // 测试数据
      items: [
        { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: '个人信息', subtitle: '积分：100', val: 0 },
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
    },

    methods: {
      // 判断是否登录
      ifLogin() {
        this.userMsg = JSON.parse(localStorage.getItem('ngs'))
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
      }

    }

  }
</script>