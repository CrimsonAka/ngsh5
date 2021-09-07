<template>
  <div>
    <div>{{ person }}</div>
    <v-list two-line subheader>
      <v-subheader inset>默认地址</v-subheader>
      

      <v-list-item
        v-for="item in items2"
        :key="item.title"
      >
        <v-list-item-avatar>
          <v-icon
            :class="[item.iconClass]"
            v-text="item.icon"
          ></v-icon>
        </v-list-item-avatar>

        <v-list-item-content @click="getAddressInfo(item)">
          <v-list-item-title v-text="item.title"></v-list-item-title>
          <v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle>
        </v-list-item-content>

        <!-- <v-list-item-action>
          <v-btn icon>
            <v-icon color="grey lighten-1">mdi-information</v-icon>
          </v-btn>
        </v-list-item-action> -->
      </v-list-item>

      <v-divider inset></v-divider>

      <v-subheader inset>其他地址</v-subheader>

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

        <v-list-item-content @click="getAddressInfo(item)">
          <v-list-item-title v-text="item.title"></v-list-item-title>
          <v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-content></v-list-item-content>

        <v-list-item-action style="display: flex; flex-direction: row;">
          <v-btn icon>
            <v-icon color="grey lighten-1" @click="delAddBtn(item)">mdi-trash-can</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon color="grey lighten-1">mdi-arrow-up</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>

      <v-btn width="95%" rounded @click="addBtn">添加地址</v-btn>

    </v-list>
  </div>
</template>

<script>
import {
  getAddressUser, // 获取用户所有地址信息
  // deleteAddress // 删除地址信息
} from '../../../api/module/backend'
export default {
  name: 'Address',

  data: () => ({
    // 测试数据
    items: [
      { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: '地址1', subtitle: '' },
      { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: '地址2', subtitle: '' },
      { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: '地址3', subtitle: '' },
    ],
    items2: [
      { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: '默认地址', subtitle: '' },
    ],
    // 
    person: '个人信息',
    // 得到的数据 
    shuju: '',
    // 获取本地数据
    userMsg: {}
  }),

  created() {
    // this.ifLogin()
    this.getAddUser()
  },

  methods: {
    // 获取用户所有地址信息
    getAddUser() {
      let user = localStorage.getItem('user')
      user = JSON.parse(user)
      let userId = {
        id: user.userId
      }
      console.log(userId)
      getAddressUser(userId).then(res => {
        console.log(res)
      })
    },

    // 显示地址具体信息
    getAddressInfo(data) {
      console.log(data)
    },

    // 删除地址
    delAddBtn(data) {
      console.log('删除')
      console.log(data)
      // deleteAddress().then(res => {
      //   console.log(res)
      // })
    },

    // 
    addBtn() {
      this.$router.push({
        path: '/home/addAddress'
      })
    }
  }

}
</script>

