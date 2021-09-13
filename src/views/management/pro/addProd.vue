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
        label="商品名称"
        required
      ></v-text-field>

      <v-subheader>商品类型：</v-subheader>
      <v-row class="ml-1 mb-3">
        <v-checkbox
          v-model="prizeType"
          label="积分奖励"
          color="orange"
          value="Credit"
          hide-details
        ></v-checkbox>
        <v-checkbox
          v-model="prizeType"
          label="优惠券兑换码"
          color="orange darken-3"
          value="Coupon"
          hide-details
          class="ml-5"
        ></v-checkbox>
        <v-checkbox
          v-model="prizeType"
          label="实物奖励"
          color="orange darken-6"
          value="Physical"
          hide-details
          class="ml-5"
        ></v-checkbox>
      </v-row>

      <div v-show="this.prizeType === 'Credit'">
      <v-row class="ml-1 mb-3">
        <v-text-field
          v-model="credit"
          label="积分"
          required
        ></v-text-field>
      </v-row>
      </div>

      <div v-show="this.prizeType === 'Coupon'">
      <v-row class="ml-1 mb-3">
        <v-text-field
          v-model="couponActiveCode"
          label="优惠券兑换码"
          required
        ></v-text-field>
      </v-row>
      </div>

      
      <v-btn
        color="error"
        class="mr-4"
        @click="reset"
      >
        取 消
      </v-btn>
  
      <v-btn
        color="warning"
        @click="addProd"
      >
        确 定
      </v-btn>
    </v-form>
  </div>
</template>

<script>
  import {
    postPrizeItem, // 添加心商品
    // getPrizeItemByName, // 通过商品名获取商品
    // getPrizeItemById
  } from '../../../api/module/backend'
  export default {
    name: 'AddProd',

    data: () => ({
      // 
      person: '添加商品',

      // 获取本地数据
      userMsg: {},
      valid: true,
      email: '',
      select: null,
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ],
      checkbox: false,


      // 添加活动
      name: '',
      lotteryDisplay: 'Roulette',
      availableChannels: [],
      prizeType: 'Credit',
      timeType: 'st',

      startTime: new Date().toISOString().substr(0, 10),
      menu: false,
      endTime: null,
      menu2: false,

      // tabledata
      dialog: false,
      headers: [
        {
          text: '奖励等级',
          align: 'start',
          // sortable: false,
          value: 'level'
        },
        { text: '概率', value: 'carbs' },
        { text: '奖励名称', value: 'acid' },
        { text: '图片', value: 'fat' },
        // { text: 'Protein (g)', value: 'protein' },
        { text: '操作', value: 'actions', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        level: '',
        acid: 0,
        fat: null,
        carbs: 0,
        protein: 0,
        index: 0
      },
      defaultItem: {
        level: '',
        acid: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
        index: 0
      },
      expanded: [],
      singleExpand: true,
      channelCode: 0
    }),

    created() {
      // this.ifLogin()
      this.initialize()
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? '添加' : '修改'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    methods: {
      // 创建活动
      addProd() {
        if (this.prizeType !== 'Credit') {
          this.credit = null
        } 
        if (this.prizeType !== 'Coupon') {
          this.couponActiveCode = null
        }
        let data = {
          name: this.name,
          prizeType: this.prizeType,
          couponActiveCode: this.couponActiveCode,
          credit: this.credit,
          categoryName: 'other',
          brandName: 'other'
        }
        console.log(data)
        postPrizeItem(data).then(res => {
          console.log(res)
        })
      },
      
      // 设置结束时间
      validate () {
        // this.$refs.form.validate()
      },
      reset () {
        // this.$refs.form.reset()
        confirm('cancel')
      },
      resetValidation () {
        // this.$refs.form.resetValidation()
        confirm('sure')
      },
      initialize () {
        this.desserts = [
          {
            level: '特等奖',
            acid: 159,
            // fat: 6.0,
            // carbs: 24,
            // protein: 4.0,
            index: 0
          },
          {
            level: '二等奖',
            acid: 237,
            // fat: 9.0,
            // carbs: 37,
            // protein: 4.3,
            index: 2
          },
          {
            level: '一等奖',
            acid: 237,
            // fat: 9.0,
            // carbs: 37,
            // protein: 4.3,
            index: 1
          },
          {
            level: '三等奖',
            acid: 999,
            // fat: 9.0,
            // carbs: 37,
            // protein: 4.3,
            index: 3
          },
        ]
      },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.desserts.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
      },

     close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
       })
      },

      save () {
        if (this.editedItem.level === "特等奖") {
          this.editedItem.index = 0
        } else if (this.editedItem.level === "一等奖") {
          this.editedItem.index = 1
        } else if (this.editedItem.level === "二等奖") {
          this.editedItem.index = 2
        } else if (this.editedItem.level === "三等奖") {
          this.editedItem.index = 3
        } 
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      },
    }

  }
</script>
