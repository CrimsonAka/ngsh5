<template>
  <div>
    <div>{{ person }}</div>
    <v-col class="ml-1 mb-3">
      <v-text-field
        ref="username"
        v-model="zc_username"
        label="用户名"
        required
      ></v-text-field>
      <div class="flex-dir-row">
        <v-text-field 
        ref="yan"
        label="密码"
        v-model="zc_pwd"
        :rules="pwdRule"
        required
        />
      </div>
      <div class="flex-dir-row">
        <v-text-field 
        ref="yan"
        label="确认密码"
        v-model="zc_sure_pwd"
        required
        />
      </div>
      <div>密码需包含大小写、数字和符号</div>
    </v-col>
    <v-spacer></v-spacer>
    <v-btn color="primary" text @click="zcBtn">注册</v-btn>
    
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
    postUser
  } from '../../../api/module/backend'
  export default {
    name: 'AddManager',

    data: () => ({
      person: '添加管理员',
      zc_username: '',
      zc_pwd: '',
      zc_sure_pwd: '',
      snackbar: false,
      text: '请输入正确手机号！',
      timeout: 1500,
    }),

    created() {},
    computed: {
    },

    watch: {
    },

    methods: {
      zcBtn() {
        if (this.zc_pwd === this.zc_sure_pwd) {
          let data = {
            userName: this.zc_username,
            password: this.zc_pwd,
            // role: 'tester',
            role: 'manager'
          }
          postUser(data).then(res2 => {
            console.log(res2)
            this.snackbar = true
            this.text = "添加管理员成功"
            this.zc_username = ''
            this.zc_pwd = ''
            this.zc_sure_pwd = ''
          })
        } else {
          this.snackbar = true
          this.text = "密码不一致！"
        }
      },
      
    }

  }
</script>
