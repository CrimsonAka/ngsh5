<template>
  <div>
    <div>
      <!-- 登录框 -->
      <v-row justify="center" style="
        position: absolute;
        width: 60vw;
        height: 50vh;
        top: calc(50% - 25vh);
        left: calc(50% - 30vw);
        "
        v-if="this.login === true"
      >
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-card ref="form">
            <v-card-title class="title font-weight-regular justify-space-between">
              <span>登 录</span>
            </v-card-title>
            <v-card-text>
              <v-text-field
                ref="username"
                v-model="username"
                label="用户名"
                required
              ></v-text-field>
                <div class="flex-dir-row">
                  <v-text-field 
                  ref="yan"
                  label="密码"
                  v-model="pwd"
                  />
                </div>
            </v-card-text>
            <v-divider class="mt-12"></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="zhuceBtn">注 册</v-btn>
              <v-btn color="primary" text @click="submit">登 录</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

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

      <!-- 注册框 -->
      <v-row justify="center" style="
        position: absolute;
        width: 60vw;
        height: 50vh;
        top: calc(50% - 25vh);
        left: calc(50% - 30vw);
        "
        v-if="this.zhuce === true"
      >
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-card ref="form">
            <v-card-title class="title font-weight-regular justify-space-between">
              <span>注 册</span>
            </v-card-title>
            <v-card-text>
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
                  />
                </div>
                <div class="flex-dir-row">
                  <v-text-field 
                  ref="yan"
                  label="确认密码"
                  v-model="zc_sure_pwd"
                  />
                </div>
            </v-card-text>
            <v-divider class="mt-12"></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="backBtn">返 回</v-btn>
              <v-btn color="primary" text @click="submit">注册并登录</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

    </div>
  </div>
</template>

<script>
  import {
    gettoken, // 获取token
  } from '../../../api/module/backend'
  export default {
    name: 'MaLogin',

    data: () => ({
      // 手机号验证
      snackbar: false,
      text: '请输入正确手机号！',
      timeout: 1500,

      // 登录信息
      username: '',
      pwd: '',
      formHasErrors: true,
      yanzheng: false,

      getBtn: true,
      timeBtn: false,
      time: 60,

      // 登录、注册转换
      login: true,
      zhuce: false,

      // 注册框
      zc_username: '',
      zc_pwd: '',
      zc_sure_pwd: ''
    }),

    computed: {
      form () {
        return {
          username: this.username,
          yan: this.yan
        }
      },
    },

    watch: {
    },

    methods: {
      // 返回主页面
      backBtn() {
        this.zhuce = false
        this.login = true
      },

      // 验证账号与密码
      check_username_pwd() {
        if (!this.username) {
          this.snackbar = true
          this.text = "请输入用户名！"
        } else if (!this.pwd) {
          this.snackbar = true
          this.text = '请输入密码！'
        } else {
          this.yanzheng = true
        }
      },
      
      resetForm () {
        this.formHasErrors = true
        Object.keys(this.form).forEach(f => {
          this.$refs[f].reset()
          // console.log(this.$refs[f])
        })
      },
      
      submit () {
        this.yanzheng = false
        this.check_username_pwd()
        if (this.yanzheng) {
          console.log('成功')
          let data = {
            client_id: 'password',
            grant_type: 'password',
            scope: 'eplus.test.scope openid',
            username: this.username,
            password: this.pwd
          }
          gettoken(data).then(res => {
            console.log(res.data)
            let info = {
              access_token: res.data.access_token
            }
            info = JSON.stringify(info)
            localStorage.setItem('token', info)
            this.$router.push({
              path: '/management/person'
            })
          })
        } else {
          console.log('验证失败')
        }
      },

      // 打开注册框
      zhuceBtn() {
        this.login = false
        this.zhuce = true
      },
    }
  }
</script>

<style scoped>
  .flex-dir-row{
    display: flex;
    flex-direction: row;
  }
</style>
