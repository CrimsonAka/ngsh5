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
              <span>管理员登陆</span>
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
              <!-- <v-btn color="primary" text @click="zhuceBtn">注 册</v-btn> -->
              <v-btn color="primary" text @click="bckBtn">返回用户端</v-btn>
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
            </v-card-text>
            <v-divider class="mt-12"></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="backBtn">返 回</v-btn>
              <v-btn color="primary" text @click="zcBtn">注册并登录</v-btn>
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
    postUser, // 注册管理员账号
    getuserid // 获取用户id
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
      zc_sure_pwd: '',
      pwdRule: [
        v => (v && v.length >= 6) || '密码长度 > 6',
      ],
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
      bckBtn() {
        this.$router.push({ path: '/login' })
      },
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
            getuserid().then(res2 => {
              if (res2) {
                console.log("userid:")
                console.log(res2)
                let info2 = {
                  userId: res2.data.sub
                }
                info2 = JSON.stringify(info2)
                localStorage.setItem('user', info2)
                // 后续获取到用户id之后自动获取用户数据信息并保存到localstorage中
                this.$router.push({
                  path: '/management/manageActivity'
                })
              }
            })
            // this.$router.push({
            //   path: '/management/person'
            // })
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

      // 注册
      zcBtn() {
        let logindata = {
          client_id: 'password',
          grant_type: 'password',
          scope: 'eplus.test.scope openid',
          username: 'admin',
          password: 'Pa$$w0rd'
        }
        console.log(logindata)
        gettoken(logindata).then(res => {
          let info = {
            access_token: res.data.access_token
          }
          info = JSON.stringify(info)
          localStorage.setItem('token', info)
          if (this.zc_pwd === this.zc_sure_pwd) {
          let data = {
            userName: this.zc_username,
            password: this.zc_pwd,
            // role: 'tester',
            role: 'manager'
          }
          postUser(data).then(res2 => {
            console.log(res2)
            this.username = this.zc_username
            this.pwd = this.zc_pwd
            this.submit()
          })
        } else {
          this.snackbar = true
          this.text = "密码不一致！"
        }
        })
        
        // if (this.zc_pwd === this.zc_sure_pwd) {
        //   let data = {
        //     userName: this.zc_username,
        //     password: this.zc_pwd,
        //     role: 'manager'
        //   }
        //   postUser(data).then(res => {
        //     console.log(res)
        //     this.username = this.zc_username
        //     this.pwd = this.zc_pwd
        //     this.submit()
        //   })
        // } else {
        //   this.snackbar = true
        //   this.text = "密码不一致！"
        // }
        
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
