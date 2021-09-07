<template>
  <div>
    <div>
      <v-row justify="center" style="margin:auto 0px;">
        <v-col>
          <v-card ref="form">
            <v-card-title class="title font-weight-regular justify-space-between">
              <span>登录/注册</span>
            </v-card-title>
            <v-card-text>
              <v-text-field
                ref="phone"
                v-model="phone"
                :rules="rules"
                label="手机号"
                required
              ></v-text-field>
              <div class="flex-dir-row">
                <v-text-field 
                ref="yan"
                label="验证码"
                v-model="yan"
                :rules="[
                  () => !!yan || '请填写验证码'
                ]" />
                <v-btn v-if="getBtn" small text color="primary" style="margin-top:15px" @click="getBtnYan">获取</v-btn>
                <v-btn v-if="timeBtn" :disabled=true small text color="primary" style="margin-top:15px">重新获取 {{ time }} s</v-btn>
              </div>
              <div>{{ msg_i }}</div>
            </v-card-text>
            <v-divider class="mt-12"></v-divider>
            <v-card-actions>
              <v-btn text @click="backBtn">返回</v-btn>
              <v-spacer></v-spacer>
              <v-slide-x-reverse-transition>
                <v-tooltip
                  v-if="formHasErrors"
                  left
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      icon
                      class="my-0"
                      v-bind="attrs"
                      @click="resetForm"
                      v-on="on"
                    >
                      <v-icon>mdi-refresh</v-icon>
                    </v-btn>
                  </template>
                  <span>Refresh form</span>
                </v-tooltip>
              </v-slide-x-reverse-transition>
              <v-btn color="primary" text @click="submit">登录/注册</v-btn>
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

    </div>
  </div>
</template>

<script>
  import { 
    getphone,
    gettoken 
  } from '../../api/module/backend'
  export default {
    name: 'Login',

    data: () => ({
      // 手机号验证
      rules: [
        value => !!value || '请输入手机号！.',
        value => (value || '').length <= 11 || '超过上限！'
      ],
      snackbar: false,
      text: '请输入正确手机号！',
      timeout: 1500,

      // 
      phone: '',
      yan: '',
      formHasErrors: true,
      yanzhengma: false,

      getBtn: true,
      timeBtn: false,
      time: 60,

      // 路由监听
      loading: false,
      post: null,
      error: null,
      msg_i: ''
    }),

    computed: {
      form () {
        return {
          phone: this.phone,
          yan: this.yan
        }
      },
    },

    created() {
      this.fetchData()
    },

    watch: {
      '$route': 'fetchData'
    },

    methods: {
      // 返回主页面
      backBtn() {
        this.$router.push({ path: '/'})
      },
      // 获取验证码
      getBtnYan() {
        this.getBtn = false
        this.timeBtn = true
        this.setTime(this.time)
        let phoneNum = {
          PhoneNumber: this.phone
        }
        getphone(phoneNum).then(res => {
          console.log(res)
        })
      },
      setTime () {
        if (this.time === 0) {
          this.time = 60
          this.getBtn = true
          this.timeBtn = false
          return false
        } else {
          this.time--
          console.log(this.time)
          setTimeout(this.setTime, 1000)
        }
      },
      // 验证手机号
      getPhone() {
        // console.log(this.phone)
        const tp = this.phone
        const a = /^1(3|4|5|6|7|8|9)\d{9}$/.test(tp)
        // console.log(a)
        if (!a) {
          // console.log('请输入正确的手机号！')
          this.snackbar = true
          this.text = '请输入正确手机号！'
        } else if (this.yan.length !== 6) {
          this.snackbar = true
          this.text = '请输入正确验证码！'
        } else {
          this.yanzhengma = true
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
        this.yanzhengma = false
        this.getPhone()
        if (this.yanzhengma) {
          console.log('成功')
          let data = {
            client_id: 'sms.client',
            client_secret: 'secret',
            grant_type: 'sms',
            scope: 'eplus.test.scope openid',
            phone_number: this.phone,
            token: this.yan,
            // login_channel: this.$route.query.login_channel
            login_channel: 0
          }
          gettoken(data).then(res => {
            console.log(res.data)
            let info = {
              access_token: res.data.access_token
            }
            info = JSON.stringify(info)
            localStorage.setItem('token', info)
            this.$router.push({
              path: '/home/ngs'
            })
          })
        } else {
          console.log('失败')
        }
      },

      // 路由监听
      fetchData () {
      this.error = this.post = null
      this.loading = true
      // replace getPost with your data fetching util / API wrapper
      // getPost(this.$route.params.id, (err, post) => {
      //   this.loading = false
      //   if (err) {
      //     this.error = err.toString()
      //   } else {
      //     this.post = post
      //   }
      // })
      if (this.$route) {
        console.log(this.$route)
        this.msg_i = JSON.stringify(this.$route.matched)
        console.log(this.msg_i)
      }
    }
    }
  }
</script>

<style scoped>
  .flex-dir-row{
    display: flex;
    flex-direction: row;
  }
</style>
