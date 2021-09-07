<template>
  <div>
    <div>{{ person }}</div>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-text-field
        v-model="name"
        :counter="10"
        label="姓名"
        required
      ></v-text-field>
  
      <v-text-field
        v-model="phone"
        label="电话号码"
        required
      ></v-text-field>
  
      <v-select
        v-model="address"
        :items="items"
        label="地区"
        required
      ></v-select>
  
      <v-checkbox
        v-model="checkbox"
        :rules="[v => !!v || 'You must agree to continue!']"
        label="Do you agree?"
        required
      ></v-checkbox>
  
      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="validate"
      >
        Validate
      </v-btn>
  
      <v-btn
        color="error"
        class="mr-4"
        @click="reset"
      >
        取 消
      </v-btn>
  
      <v-btn
        color="warning"
        @click="resetValidation"
      >
        确 定
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import {
  // addAddress, // 添加新地址
} from '../../../api/module/backend'
  export default {
    name: 'Address',

    data: () => ({
      // 
      person: '个人信息',

      // 获取本地数据
      userMsg: {},
      valid: true,
      name: '',
      nameRules: [
        // v => !!v || 'Name is required',
        // v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      phone: '',
      phoneRules: [
        // v => !!v || 'E-mail is required',
        // v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      address: null,
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ],
      checkbox: false,
    }),

    created() {
      // this.ifLogin()
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

      // 添加地址
      addBtn() {
        let data = {
          recipient: '',
          recipientPhoneNumber: '',
          country: '',
          province: '',
          city: '',
          detailedAddress: '',
          postcode: '',
          userId: ''
        }
      },
    }

  }
</script>

