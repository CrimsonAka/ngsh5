<template>
  <div id="app">
    <v-card>
      <v-card-title>
        <v-toolbar-title>活动管理</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          hide-details
        ></v-text-field>
      </v-card-title>

      <v-data-table
        style="margin-top:-10px;"
        :headers="headers"
        :items="desserts"
        sort-by="calories"
        :search="search"
      >
        <template v-slot:top>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">活动修改</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.name" label="活动名称"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.activityType" label="活动类型"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.availableChannels" label="抽奖渠道"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.lotteryDisplay" label="抽奖方式"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.startTime" label="开始时间"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.endTime" label="结束时间"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
            v-show="item.activityType === 'Lottery'"
            color="primary"
            class="mr-2"
            @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            
            class="mr-2"
            @click="getAct(item)"
          >
            mdi-clipboard-list
          </v-icon>
          <v-icon
            color="red"
            class="mr-2"
            @click="delAct(item)"
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialogProd" max-width="800px">
      <v-data-table
      :headers="headersProd"
      :items="dessertsProd"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>添加活动档次 - 奖品</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialogProdAdd" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >New Item</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
  
              <v-card-text>
                <v-container>
                  <v-col>
                    <v-col cols="12" sm="6" md="8">
                      <v-text-field v-model="editedItemProd.name" label="活动档次"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="8">
                      <v-text-field v-model="editedItemProd.percentage" label="活动概率"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="8">
                      <v-select
                        v-model="editedItemProd.prizeItemIds"
                        :items="states"
                        item-text="name"
                        item-value="id"
                        label="选择奖品"
                        multiple
                        chips
                        persistent-hint
                        @change="prizeItemChange(editedItemProd.prizeItemIds)"
                      ></v-select>
                    </v-col>
                  </v-col>
                </v-container>
              </v-card-text>
  
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeProd">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="saveProd">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <!-- <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon> -->
        <v-icon
          small
          class="mr-2"
          color="red"
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
    </v-dialog>
  </div>
</template>

<script>

  import {
    getActivityAvailable, // 创建活动
    getActivity,
    deleteActivity, // 删除活动
    getPrizeItemAll, // 获取商品列表
    postPrizeTier,
    getPrizeTierActivity,
    // updatePrizeTier // 修改
    deletePrizeTier
  } from '../../../api/module/backend'

export default {
  name: 'ManageActivity',
  data: () => ({
    search: '',
    headers: [
      {
        text: '活动名称',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      { text: '活动类型', value: 'activityTypeshow' },
      { text: '抽奖渠道', value: 'availableChannels' },
      { text: '抽奖方式', value: 'lotteryDisplayshow' },
      { text: '开始时间', value: 'startTimeshow' },
      { text: '结束时间', value: 'endTimeshow' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    desserts: [],
    startTime: new Date().toISOString().substr(0, 10),
    dialog: false,
    editedIndex: -1,
    editedItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    defaultItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },

    // 
    states: [],
    activityId: '',
    dialogProd: false,
      dialogProdAdd: false,
      headersProd: [
      {
        text: '活动档次',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      { text: '活动概率', value: 'percentage' },
      { text: '活动奖品', value: 'prizeItemIds' },
      { text: '操作', value: 'actions', sortable: false },
    ],
    dessertsProd: [],
    editedIndexProd: -1,
    editedItemProd: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    defaultItemProd: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
  }),

  created () {
    this.getActivityAva()
    // this.getAct()
  },

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? '添加新档次 - 商品' : '修改新档次 - 商品'
    },
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    
    dialogProd (val) {
      val || this.closeProd()
    },
  },

  methods: {

    editItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    },

    // 获取活动列表
    getActivityAva() {
      let data = {
        StartTime: '1970-01-01',
        AvailableChannels: 'ngs,ngsplaza,alldays'
      }
      data = JSON.stringify(data)
      data = JSON.parse(data)
      getActivityAvailable(data).then(res => {
        console.log(res)
        this.desserts = res.data.data
        let D = res.data.data
        for (let i of D) {
          console.log(i)
          if (i.activityType === "SingleAttendance") {
            i.activityTypeshow = '单次签到活动'
          } else if (i.activityType === 'SequentialAttendance') {
            i.activityTypeshow = '连续签到活动'
          } else if (i.activityType === 'Lottery') {
            i.activityTypeshow = '抽奖活动'
          }
          if (i.lotteryDisplay === null || i.lotteryDisplay === '' || i.lotteryDisplay === 'None') {
            i.lotteryDisplayshow = '无'
          } else if (i.lotteryDisplay === 'Roulette') {
            i.lotteryDisplayshow = '转盘'
          } else if (i.lotteryDisplay === 'Digging') {
            i.lotteryDisplayshow = '寻宝'
          } else if (i.lotteryDisplay === 'Scratchcard') {
            i.lotteryDisplayshow = '刮刮乐'
          }
          i.startTimeshow = i.startTime.substr(0, 10)
          if (i.endTime === '' || i.endTime === null) {
            i.endTimeshow = '无'
          } else {
            i.endTimeshow = i.endTime.substr(0, 10)
          }
        }
      })
    },


    // 获取单个活动
    getAct(val) {
      // console.log(val)
      let data = {
        id: val.id
      }
      let data2 = {
        ActivityId: val.id
      }
      this.activityId = val.id
      getActivity(data).then(res => {
        console.log(res)
      })
      getPrizeTierActivity(data2).then(res => {
        console.log(res.data.data)
        this.dessertsProd = res.data.data
      })
      this.dialogProd = true
      this.getProd()
    },
    // 获取商品列表
      getProd() {
      let data4 = {
        PageIndex: 1,
        PageSize : 50
      }
      getPrizeItemAll(data4).then(res4 => {
        console.log(res4.data.data)
        let D = res4.data.data
        for (let i of D) {
          let a = {
            name: i.name,
            id: i.id
          }
          this.states.push(a)
        }
      })
    },

    saveProd () {
      if (this.editedIndexProd > -1) {
        Object.assign(this.dessertsProd[this.editedIndexProd], this.editedItemProd)
      } else {
        let a = this.editedItemProd

        let data = {
          name: a.name,
          percentage: Number(a.percentage),
          activityId: this.activityId,
          prizeItemIds: a.prizeItemIds
        }
        postPrizeTier(data).then(res => {
          console.log(res)
          this.getAll()
        })
      }
      this.closeProd()
    },

    getAll() {
        let data = {
          ActivityId : this.activityId
        }
        getPrizeTierActivity(data).then(res => {
          if (!res) {
            this.dessertsProd = []
          } else {
            let a = res.data.data
            this.dessertsProd = a
          }
        })
      },

    deleteItem (item) {
      console.log(item)
      let delData = {
        id: item.id
      }
      deletePrizeTier(delData).then(res => {
        console.log(res)
        this.getAll()
      })
    },
    closeProd () {
      this.dialogProdAdd = false
      this.$nextTick(() => {
        this.editedItemProd = Object.assign({}, this.defaultItemProd)
        this.editedIndexProd = -1
      })
    },

    // 删除活动
    delAct(val) {
      console.log(val)
      let deldata = {
        id: val.id
      }
      console.log(deldata)
      deleteActivity(deldata).then(res2 => {
        console.log(res2)
        this.getActivityAva()
      })
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
