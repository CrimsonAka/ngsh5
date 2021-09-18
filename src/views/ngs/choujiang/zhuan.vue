<template>
  <div id="app">
    <div>剩余抽奖次数：{{}}</div>
    <div>剩余抽奖次数：{{ a }}</div>
    <div class="turnplate_box">
      <canvas id="myCanvas" width="300px" height="300px">抱歉！浏览器不支持。</canvas>
      <canvas id="myCanvas01" width="200px" height="200px">抱歉！浏览器不支持。</canvas>
      <canvas id="myCanvas03" width="200px" height="200px">抱歉！浏览器不支持。</canvas>
      <canvas id="myCanvas02" width="150px" height="150px">抱歉！浏览器不支持。</canvas>
      <button id="tupBtn" class="turnplatw_btn" @click="startBtn"></button> 
    </div>

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
// import {css} from './js/jquery-1.11.3.min.js'
import {
  getPrizeTierActivity,
  postLottery,
  getPrizeItemById,
  getPrizeTier,
  getActivityUser
  // getLotteryRecords
} from '../../../api/module/backend'

export default {
  name: 'Zhuan',
  computed: {
    
  },
  data() {
    return {
      a: 0,
      //旋转角度
      angles: 0, 
      //可抽奖次数
      clickNum: 5,
      //旋转次数
      rotNum: 0,
      //中奖公告
      notice: null,
      //转盘初始化
      color: ["#626262","#787878","rgba(0,0,0,0.5)","#DCC722","white","#FF4350"],
      info: ["谢谢参与","1000","10","500","100","4999","1","20"],
      // info1: ['再接再厉', '元', '元', '淘金币', '元', '淘金币', '元', '淘金币']

      // 手机号验证
      snackbar: false,
      text: '请输入正确手机号！',
      timeout: 1500,
    }
  },
  mounted() {
    // this.ready()
    this.getData()
  },
  methods: {
    getData() {
      console.log(this.$route.query)
      let data = this.$route.query
      let actData = {
        ActivityId : data.activityId
      }
      let chouData = {
        UserId: data.userId,
        ActivityId : data.activityId
      }
      getActivityUser(chouData).then(res => {
        console.log(res.data.data)
        this.a = res.data.data.remainingDraws
      })
      getPrizeTierActivity(actData).then(res=> {
        console.log(res)
        this.info = res.data.data
        console.log(this.info)
        this.ready()
      })
    },
    // 开始按钮
    startBtn() {
      let data = this.$route.query
      postLottery(data).then(res=> {
        // console.log(res.data.data[0])
        let i = res.data.data[0]
        let itemId = {
          Id: i.prizeItemId
        }
        let tierId = {
          Id: i.prizeTierId
        }
        // console.log(itemId)
        getPrizeItemById(itemId).then(res2 => {
          // console.log(res2.data.data)
          let itemData = res2.data.data
          getPrizeTier(tierId).then(res3 => {
            // console.log(res3.data.data)
            let tierData = res3.data.data
            this.notice = tierData.name + itemData.name
            let itemid = itemData.id
            this.runCup(itemid)
            this.rotNum = this.rotNum + 1
            setTimeout(this.show,6000)
            this.getData()
          })
        })
      })
    },
    show(){
      this.snackbar = true
      this.text = this.notice
    },
    
    // 转盘旋转
    runCup(val) {
      console.log(val)
      this.probability(val)
      var degValue = 'rotate('+this.angles+'deg'+')'
      // var degValue = 'rotate(1800deg)'
      var b = document.getElementById('myCanvas')
      // b.css('-o-transform',degValue)           //Opera
      // b.css('-ms-transform',degValue)          //IE浏览器
      // b.css('-moz-transform',degValue)         //Firefox
      // b.css('-webkit-transform',degValue)      //Chrome和Safari
      // b.css('transform',degValue)
      b.style.transform = degValue
    },

    // 随机
    probability(val){
      console.log('商品id：')
      console.log(val)
      let a = 0
      var num = 0
      for (let i of this.info) {
        console.log("a:")
        console.log(a)
        if (val === i.prizeItemIds[0]) {
          // console.log(a)
          num = a
          console.log('num: ')
          console.log(num)
          break;
        } else {
          a = a + 1
        }
      }
        // 获取随机数
        // var num = parseInt(Math.random()*(7 - 0 + 0) + 0)
        // 概率
        if ( num == 0 ) {
          this.angles = 2160 * this.rotNum + 1800
          console.log(this.notice)
        }
        // 概率
        else if ( num == 7 ) {
          this.angles = 2160 * this.rotNum + 1845
          console.log(this.notice)
        }
        // 概率
        else if ( num == 6 ) {
          this.angles = 2160 * this.rotNum + 1890
          console.log(this.notice)
        }
        // 概率
        else if ( num == 5 ) {
          this.angles = 2160 * this.rotNum + 1935
          console.log(this.notice)
        }
        // 概率
        else if ( num == 4 ) {
          this.angles = 2160 * this.rotNum + 1980
          console.log(this.notice)
        }
        // 概率
        else if ( num == 3 ) {
          this.angles = 2160 * this.rotNum + 2025
          console.log(this.notice)
        }
        // 概率
        else if ( num == 2 ) {  
          this.angles = 2160 * this.rotNum + 2070
          console.log(this.notice)
        }
        // 概率
        else if ( num == 1 ) {
          this.angles = 2160 * this.rotNum + 2115
          console.log(this.notice)
        }
      },

    ready() {
      
      var color = this.color
      var info = this.info
      // var info1 = this.info1
      canvasRun()
      // 绘制转盘
      function canvasRun(){
        var canvas=document.getElementById('myCanvas')
        var canvas01=document.getElementById('myCanvas01')
        var canvas03=document.getElementById('myCanvas03')
        var canvas02=document.getElementById('myCanvas02')
        var ctx=canvas.getContext('2d')
        var ctx1=canvas01.getContext('2d')
        var ctx3=canvas03.getContext('2d')
        var ctx2=canvas02.getContext('2d')
        createCircle()
        createCirText()
        initPoint()
	
        // 外圆
        function createCircle(){
          var startAngle = 0//扇形的开始弧度
          var endAngle = 0//扇形的终止弧度
          // 画一个8等份扇形组成的圆形
          for (var i = 0; i< 8; i++){
            startAngle = Math.PI*(i/4-1/8)
            endAngle = startAngle+Math.PI*(1/4)
            ctx.save()
            ctx.beginPath() 
            ctx.arc(150,150,100, startAngle, endAngle, false)
            ctx.lineWidth = 120
            if (i%2 == 0) {
              ctx.strokeStyle =  color[0]
            } else {
              ctx.strokeStyle =  color[1]
            }
            ctx.stroke()
            ctx.restore()
          } 
        }

        // 各奖项
        function createCirText(){	 
          ctx.textAlign='start'
          ctx.textBaseline='middle'
          ctx.fillStyle = color[3]
          var step = 2*Math.PI/8
          for ( var i = 0; i < 8; i++) {
            ctx.save()
            ctx.beginPath()
            ctx.translate(150,150)
            ctx.rotate(i*step)
            ctx.font = " 20px Microsoft YaHei"
            ctx.fillStyle = color[3]
            ctx.fillText(info[i].name,-30,-115,60)
            // ctx.font = " 14px Microsoft YaHei"
            // ctx.fillText(info1[i],-30,-95,60)
            ctx.closePath()
            ctx.restore()
          }
        }
      
        function initPoint(){ 
          // 箭头指针
          ctx1.beginPath()
          ctx1.moveTo(100,24)
          ctx1.lineTo(90,62)
          ctx1.lineTo(110,62)
          ctx1.lineTo(100,24)
          ctx1.fillStyle = color[5]
          ctx1.fill()
          ctx1.closePath()
          // 中间小圆
          ctx3.beginPath()
          ctx3.arc(100,100,40,0,Math.PI*2,false)
          ctx3.fillStyle = color[5]
          ctx3.fill()
          ctx3.closePath()
          // 小圆文字
          ctx3.font = "Bold 20px Microsoft YaHei" 
          ctx3.textAlign='start'
          ctx3.textBaseline='middle'
          ctx3.fillStyle = color[4]
          ctx3.beginPath()
          ctx3.fillText('开始',80,90,40)
          ctx3.fillText('抽奖',80,110,40)
          ctx3.fill()
          ctx3.closePath()
          // 中间圆圈
          ctx2.beginPath()
          ctx2.arc(75,75,75,0,Math.PI*2,false)
          ctx2.fillStyle = color[2]
          ctx2.fill()
          ctx2.closePath()
        }
      }
    },
    
  },
};
</script>


<style>

*{
	padding: 0px;
	margin: 0px;
	font-size: 16px;
	font-family: "Microsoft YaHei";
}
.turnplate_box{
	width: 300px;
	height: 300px;
	margin: 100px auto;
	position: relative; 
}
.turnplate_box canvas{
	position: absolute;
}
#myCanvas{
	background-color: white;
	border-radius: 100%;
}
#myCanvas01,#myCanvas03{
	left: 50px;
	top: 50px;
	z-index: 30;
}
#myCanvas02{
	left: 75px;
	top: 75px;
	z-index: 20;
}
#myCanvas{
  -o-transform:  transform 6s;
	-ms-transform:  transform 6s;
	-moz-transform:  transform 6s;		
	-webkit-transform:  transform 6s;
	transition: transform 6s;
	-o-transform-origin:  50% 50%;
	-ms-transform-origin:  50% 50%;
	-moz-transform-origin:  50% 50%;		
	-webkit-transform-origin:  50% 50%;
	transform-origin: 50% 50%;
}
.turnplatw_btn{
	width: 60px;
	height: 60px;
	left: 120px;
	top: 120px;
	border-radius: 100%;
	position: absolute;
	cursor: pointer;
	border: none;
	background: transparent;
	outline: none;
	z-index: 40;
}

</style>


