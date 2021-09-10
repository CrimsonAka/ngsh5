<template>
  <div>
    <div>{{ person }}</div>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      style="width:80vw; margin:0 auto;"
    >
      <v-text-field
        v-model="recipient"
        label="姓名"
        required
      ></v-text-field>
  
      <v-text-field
        v-model="recipientPhoneNumber"
        label="电话号码"
        required
      ></v-text-field>
  
      <div>
        <v-select
          v-model="province"
          :items="provinceArea"
          label="请选择省份"
          dense
          outlined
          @change="areaChange"
        ></v-select>
        <v-select
          v-model="city"
          :items="cityArea"
          label="请选择市"
          dense
          outlined
          @change="areaChange2"
        ></v-select>
        <v-select
          v-model="region"
          :items="regionArea"
          label="请选择区"
          dense
          outlined
          @change="areaChange3"
        ></v-select>
      </div>

      <v-text-field
        v-model="detailedAddress"
        label="详细地址"
        required
      ></v-text-field>
  
      <v-text-field
        v-model="postcode"
        label="邮编"
        required
      ></v-text-field>

      <v-row class="ml-1 mb-3">
        <v-checkbox
          v-model="isDefault"
          label="是否设置为默认地址"
          color="orange"
          value='1'
          hide-details
        ></v-checkbox>
      </v-row>

      <v-btn
        color="error"
        class="mr-4"
        @click="reset"
      >
        取 消
      </v-btn>
  
      <v-btn
        color="warning"
        @click="addBtn"
      >
        确 定
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import {
  addAddress, // 添加新地址
} from '../../../api/module/backend'
import { regionData } from 'element-china-area-data'
  export default {
    name: 'Address',

    data: () => ({
      // 
      person: '个人信息',

      // 获取本地数据
      userMsg: {},
      valid: true,
      address: null,
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ],
      checkbox: false,

      recipient: '',
      recipientPhoneNumber: '',
      detailedAddress: '',
      postcode: '',
      

      // 地区信息
      area: regionData,
      province: '',
      provinceArea: [],
      city: '',
      cityArea: [],
      region: '',
      regionArea: [],
      isDefault: '1'
    }),

    created() {
      // this.ifLogin()
      this.showarea()
    },

    methods: {
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },

      // 获取localstorage信息
      getLocalStorageUser() {
        let user = localStorage.getItem('user')
        user = JSON.parse(user)
        return user
      },

      // 添加地址
      addBtn() {
        let user = this.getLocalStorageUser()
        let data = {
          recipient: this.recipient,
          recipientPhoneNumber: this.recipientPhoneNumber,
          province: this.province,
          city: this.city,
          region: this.region,
          detailedAddress: this.detailedAddress,
          postcode: this.postcode,
          userId: user.userId
        }
        if (this.isDefault === '1') {
          data.isDefault = true
        }
        console.log(data)
        addAddress(data).then(res => {
          console.log(res)
          this.$router.back()
        })
      },

      // 显示地区信息
      showarea() {
        let a = []
        for (let i of this.area) {
          a.push(i.label)
        }
        this.provinceArea = a
      },
      // 地区变换
      areaChange() {
        let b = []
        this.c = []
        for (let j of this.area) {
          if (this.province === j.label) {
            for (let k of j.children) {
              b.push(k.label)
              this.c.push(k)
            }
          }
        }
        this.cityArea = b
        this.region = ''
      },
      areaChange2() {
        let d = []
        for (let i of this.c) {
          if (this.city === i.label) {
            for (let k of i.children) {
              d.push(k.label)
            }
          }
        }
        this.regionArea = d
      },
      areaChange3() {
        console.log(this.province + '-' + this.city + '-' + this.region)
      },

    }

  }
</script>

