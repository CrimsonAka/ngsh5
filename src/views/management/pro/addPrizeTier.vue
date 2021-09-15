<template>
  <div>
    <div>{{ person }}</div>
    <div>{{ activityId }}</div>
    <v-app id="inspire">
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
        <v-icon
          class="mr-2"
          @click="editItemProd(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          class="mr-2"
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </v-app>
  </div>
</template>

<script>
  import {
    getPrizeItemAll, // 获取商品列表
    postPrizeTier,
    getPrizeTierActivity,
    updatePrizeTier, // 修改
    deletePrizeTier,
    getPrizeItemByIds,
    // getPrizeItemById
  } from '../../../api/module/backend'
  export default {
    name: 'AddPrizeTier',

    data: () => ({
      // 
      person: '添加活动奖品',

      //
      activityId: '',
      activityData: {},


      // 
      states: [],
      dialogProdAdd: false,
      headersProd: [
      {
        text: '活动档次',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      { text: '活动概率', value: 'percentage' },
      { text: '活动奖品', value: 'prizeItemNames' },
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

    created() {
      // this.ifLogin()
      this.getRoute()
      this.getProd()
      this.getAll()
    },
    computed: {
      formTitle () {
        return this.editedIndexProd === -1 ? '添加新档次 - 商品' : '修改新档次 - 商品'
      },
    },

    watch: {
      dialog (val) {
        val || this.closeProd()
      },
    },

    methods: {
      // 获取所有档次奖励
      getAll() {
        let data = {
          ActivityId : this.activityId
        }
        getPrizeTierActivity(data).then(res => {
          if (!res) {
            this.dessertsProd = []
          } else {
            let a = res.data.data
            for (let i of a) {
              i.prizeItemNames = []
              // console.log(i.prizeItemIds)
              let Idsdata = {
                Ids: i.prizeItemIds.toString()
              }
              // console.log(Idsdata)
              getPrizeItemByIds(Idsdata).then(res2 => {
                let b = res2.data.data
                for (let j of b) {
                  i.prizeItemNames.push(j.name)
                }
                // console.log(i)
              })
            }
            this.dessertsProd = a
            // console.log(a)
          }
        })
      },
      // 选择变换
      prizeItemChange(val) {
        console.log(val)
      },
      // 获取商品列表
      getProd() {
      let data4 = {
        PageIndex: 1,
        PageSize : 50
      }
      getPrizeItemAll(data4).then(res4 => {
        // console.log(res4.data.data)
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

      // 获取route
      getRoute() {
        let a = this.$route
        // console.log(a.query.id)
        this.activityData = a.query
        this.activityId = a.query.id
      },
      // 创建活动
      // addActivity() {
      //   if (this.activityType !== 'Lottery') {
      //     this.lotteryDisplay = 'None'
      //   }
      //   let data = {
      //     name: this.name,
      //     // limit: 0,
      //     // dailyLimit: 0,
      //     availableChannels: this.availableChannels,
      //     lotteryDisplay: this.lotteryDisplay,
      //     activityType: this.activityType,
      //     startTime: this.startTime,
      //     endTime: this.endTime
      //   }
      //   // console.log(data)
      // },

    editItemProd (item) {
      console.log(item)
      this.editedIndexProd = this.dessertsProd.indexOf(item)
      this.editedItemProd = Object.assign({}, item)
      this.dialogProdAdd = true
    },

    deleteItem (item) {
      // console.log(item)
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

    saveProd () {
      if (this.editedIndexProd > -1) {
        Object.assign(this.dessertsProd[this.editedIndexProd], this.editedItemProd)
        let a = this.dessertsProd[this.editedIndexProd]
        console.log(a)
        updatePrizeTier(a).then(res => {
          console.log(res)
          this.getAll()
        })
        // console.log(a)
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
    }

  }
</script>
