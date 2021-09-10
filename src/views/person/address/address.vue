<template>
  <div>
    <div>{{ person }}</div>
    <v-list two-line subheader>
      <v-subheader inset>默认地址</v-subheader>
      

      <v-list-item
        v-for="item in items2"
        :key="item.title"
      >

        <v-list-item-content @click="getAddressInfo(item)">
          <v-list-item-title>{{item.recipient}} {{item.recipientPhoneNumber}}</v-list-item-title>
          <v-list-item-subtitle>{{item.province}} {{item.city}} {{item.region}}</v-list-item-subtitle>
          <v-list-item-subtitle>{{item.detailedAddress}}</v-list-item-subtitle>
        </v-list-item-content>

        <!-- <v-list-item-action>
          <v-btn icon>
            <v-icon color="grey lighten-1">mdi-information</v-icon>
          </v-btn>
        </v-list-item-action> -->
      </v-list-item>

      <v-divider inset></v-divider>

      <v-subheader inset>所有地址</v-subheader>

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

        <v-list-item-content @click="getAddressInfo(item)">
          <v-list-item-title>{{item.recipient}} {{item.recipientPhoneNumber}}</v-list-item-title>
          <v-list-item-subtitle>{{item.province}} {{item.city}} {{item.region}}</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-content></v-list-item-content>

        <v-list-item-action style="display: flex; flex-direction: row;">
          <v-btn icon>
            <v-icon color="grey lighten-1" @click="delAddBtn(item)">mdi-trash-can</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon color="grey lighten-1" @click="updateAddBtn(item)">mdi-arrow-up</v-icon>
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
  deleteAddress, // 删除地址信息
  updateAddress // 更换默认地址
} from '../../../api/module/backend'
export default {
  name: 'Address',

  data: () => ({
    // 测试数据
    items: [
    ],
    items2: [
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
      this.items = []
      this.items2 = []
      let user = localStorage.getItem('user')
      user = JSON.parse(user)
      let userId = {
        UserId: user.userId
      }
      console.log(userId)
      getAddressUser(userId).then(res => {
        console.log(res.data)
        this.items = res.data.data
        for(let i of res.data.data) {
          // console.log(i)
          if (i.isDefault === true) {
            this.items2.push(i)
          }
        }
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
      let deldata = {
        id: data.id
      }
      console.log(deldata)
      deleteAddress(deldata).then(res => {
        console.log(res)
        this.getAddUser()
      })
    },

    // 更换默认地址
    updateAddBtn(val) {
      // console.log(val)
      let data = val
      data.isDefault = true
      console.log(data)
      updateAddress(data).then(res => {
        console.log(res)
        this.getAddUser()
      })
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

