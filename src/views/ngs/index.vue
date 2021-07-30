<template>
  <div id="app">
    <div>msg: {{ msg }}</div>
    <div>id: {{ personid }}</div>
    <div>phone: {{ userMsg.phone }}</div>
    <v-btn @click="getRandom">获取随机数</v-btn>
    <div>{{ randomNum2 }}</div>
    <div>{{ randomMsg }}</div>
    <div>{{ randomNum }}</div>
    <div>{{ addward }}</div>

    <router-link to="/">返回</router-link>

    <!-- <div class="wrapper" id='pointer'>
      <div class="panel">
        <div class="sector">
          <div class="sector-inner">
            <span>谢谢参与</span>
          </div>
        </div>
        <div class="sector">
          <div class="sector-inner">
            <span> 50 积分</span>
          </div>
        </div>
        <div class="sector">
          <div class="sector-inner">
            <span>谢谢参与</span>
          </div>
        </div>
        <div class="sector">
          <div class="sector-inner">
            <span>100话费</span>
          </div>
        </div>
        <div class="sector">
          <div class="sector-inner">
            <span> 50 积分</span>
          </div>
        </div>
        <div class="sector">
          <div class="sector-inner">
            <span>谢谢参与</span>
          </div>
        </div>
        <div class="sector">
          <div class="sector-inner">
            <span>100话费</span>
          </div>
        </div>
        <div class="sector">
          <div class="sector-inner">
            <span>谢谢参与</span>
          </div>
        </div>
        <div class="sector">
          <div class="sector-inner">
            <span> 50 积分</span>
          </div>
        </div>
        <div class="sector">
          <div class="sector-inner">
            <span>10元话费</span>
          </div>
        </div>
        <div class="pointer" @click="startC">开始抽奖</div>
      </div>
    </div> -->
    <v-btn @click="guaBtn">点我跳转刮刮卡</v-btn>

    <div @click="vm.showDialog = true">点我打开Dialog</div>
    <div class="dialogDiv" v-if="vm.showDialog">
      <div class="borderDiv">
        <v-btn @click="closeBtn" class="closeImg">X</v-btn>
        <div class="message">这是一段中奖信息</div>
      </div>
    </div>

    <div class="modal-header">
      <h3>custom header</h3>
      <v-btn>点击按钮--开始</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Playngs',
  data: () => ({
      vm: {
        showDialog: false,
      },
      userMsg: {},
      // 需要算上库存 设置物品权重
      wupin: [
        { id: 1, name: '可乐', shu: 100, weight: 100 },
        { id: 2, name: '雪碧', shu: 100, weight: 100 },
        { id: 3, name: '铅笔', shu: 50, weight: 50 },
        { id: 4, name: '记事本', shu:10, weight: 10 },
      ],
      addward: '',
      msg: 'ngs抽奖页面',
      personid: '',
      randomNum: 0,
      randomNum2: 0,
      randomMsg: ''
  }),
  created () {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.fetchData()
    this.getLS()
    // this.getAdward()
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'fetchData'
  },
  methods: {
    // 跳转刮刮卡
    guaBtn() {
      this.$router.push({
        path: '/home/gua'
      })
    },
    closeBtn(){
      this.vm.showDialog = false;
    },
    // 确定
    dec() {
      let a = 0
      console.log(a)
    },
    // 开始抽奖
    startC() {
      let a = document.getElementById('pointer')
      var t
      var stopT = Math.floor( Math.random() * 10 + 1 )
      console.log(stopT)
      // t = 360 * ( stopT / 10 ) + 1080
      t = 360 * 10
      a.style.transform = 'rotate(' + t + 'deg)'
      a.style.transition = 'all 4s ease 0.5s'
    },

    // 获取localstorage信息
    getLS() {
      this.userMsg = JSON.parse(localStorage.getItem('user'))
    },
    // 计算中奖物品
    getAdward() {
      const a = this.wupin
      let i = 0
      let n = 0
      for (i; i < a.length; i++){
        n += a[i].shu
      }
      const r1 = Math.floor(Math.random() * n) + 1
      let n1 = 0
      for (i = 0; i < a.length; i++){
        n1 += a[i].shu
        if (r1 <= n1) {
          this.addward = a[i].name
          break
        }
      }
      this.randomNum = r1
      // console.log(r1)
    },
    getRandom() {
      const a = Math.floor(Math.random() * 100)
      this.randomNum2 = a
      if (a <= 80) {
        this.randomMsg = '没中奖...'
        this.randomNum = 0
        this.addward = ''
      } else if (a > 80 && a <= 100) {
        this.randomMsg = '中奖了！'
        this.getAdward()
      }
    },
    fetchData () {
      this.personid = this.$route.params.id
      this.msg = 'ngs'
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

<style>
    /* .wrapper {
      position: relative;
      height: 300px;
      width: 300px;
      padding: 20px;
      margin: 20px;
      background-color: #c0381f;
      box-shadow: #000000 0px 0px 10px;
      border-radius: 50%;
    }
    .panel {
      position: relative;
      height: 200px;
      width: 200px;
      background-color: #b7b7b7;
      border-radius: 100px;
    }
    .sector {
      position: absolute;
      width: 100px;
      height: 200px;
      border-radius: 0px 100px 100px 0;
      overflow: hidden;
      left: 100px;
      top: 0px;
      transform-origin: left center;
    }
    .sector:nth-child(1) {
      transform: rotate(-18deg);
    }
    .sector:nth-child(2) {
      transform: rotate(18deg);
    }
    .sector:nth-child(3) {
      transform: rotate(54deg);
    }
    .sector:nth-child(4) {
      transform: rotate(90deg);
    }
    .sector:nth-child(5) {
      transform: rotate(126deg);
    }
    .sector:nth-child(6) {
      transform: rotate(162deg);
    }
    .sector:nth-child(7) {
      transform: rotate(198deg);
    }
    .sector:nth-child(8) {
      transform: rotate(234deg);
    }
    .sector:nth-child(9) {
      transform: rotate(270deg);
    }
    .sector:nth-child(10) {
      transform: rotate(306deg);
    }
    .sector:nth-child(2n+1) .sector-inner {
      background: #fef6e0;
    }
    .sector:nth-child(2n) .sector-inner {
      background: #ffffff;
    }
    .sector-inner {
      text-align: center;
      display: block;
      width: 40px;
      padding: 5px 3px 0 57px;
      height: 195px;
      transform: translateX(-100px) rotate(36deg);
      transform-origin: right center;
      border-radius: 100px 0 0 100px;
    }
    .sector-inner span {
      display: block;
      transform-origin: center;
      transform: rotate(-19deg);
      color: #d46854;
    }
    .pointer {
      position: absolute;
      left: 79px;
      top: 79px;
      z-index: 10;
      height: 30px;
      width: 30px;
      padding: 6px;
      color: #fff899;
      line-height: 15px;
      font-size: 12px;
      text-align: center;
      background-color: #dc5b5b;
      border-radius: 50%;
      border: 1px solid #c0381f;
    }
    .pointer::after {
      content: '';
      position: absolute;
      left: 14px;
      top: -24px;
      border-width: 12px 6px;
      border-style: solid;
      border-color: transparent;
      border-bottom-color: #c0381f;
    }


  .dialogDiv{
    z-index: 15;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.3);
    width: 100%;
    height: 100%;
  }
  .message{
    background-color: #ff5350;
    text-align: center; 
    width: 40%;
    height: 40%;
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
  .closeImg{
    width: 20px;
    height: 20px;
    float: right;
    margin-right: 5px;
    margin-top: 5px;
    cursor: pointer;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .borderDiv{
    text-align: center;
    background-color: white;
    border-radius: 20px;
    width: 40%;
    height: 40%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  } */
</style>

