<template>
  <div id="app">
    <v-card>
      <v-card-title>
        <v-toolbar-title>奖品管理</v-toolbar-title>
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
          <!-- <v-toolbar-title>My CRUD</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider> -->
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">更新商品</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-col>
                    <v-col cols="12" sm="6" md="8">
                      <v-text-field v-model="editedItem.name" label="商品名称"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="8">
                      <v-select
                        v-model="editedItem.prizeType"
                        :items="prizeTpyeItems"
                        label="商品类型"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="8" v-show="editedItem.prizeType === 'Coupon'">
                      <v-text-field v-model="editedItem.couponActiveCode" label="优惠券兑换码"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="8" v-show="editedItem.prizeType === 'Credit'">
                      <v-text-field v-model="editedItem.credit" label="积分"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="8">
                      <v-text-field v-model="editedItem.stock" label="库存"></v-text-field>
                    </v-col>
                  </v-col>
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
            class="mr-2"
            @click="editItem(item)"
          >
            mdi-pencil
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
  </div>
</template>

<script>
  import {
    getPrizeItemByName,
    // getPrizeItemById, 
    getPrizeItemAll,
    deletePrizeItem,
    updatePrizeItem
  } from '../../../api/module/backend'
export default {
  name: 'ActivitySearch',
  data: () => ({
    search: '',
    headers: [
      {
        text: '商品名称',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      { text: '商品类型', value: 'prizeTypeshow' },
      { text: '优惠券活动码', value: 'couponActiveCodeshow' },
      { text: '积分', value: 'creditshow' },
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
    prizeTpyeItems: ['Credit', 'Coupon', 'Physical']
  }),

  created () {
    this.getProd()
  },

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
  },

  methods: {

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
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
        console.log('更改成功123')
        console.log(this.desserts[this.editedIndex])
        let data = this.desserts[this.editedIndex]
        if (data.prizeType !== 'Credit') {
          data.credit = null
        } 
        if (data.prizeType !== 'Coupon') {
          data.couponActiveCode = null
        }
        data.stock = Number(data.stock)
        if (data.stock === 0) {
          data.stock = null
        }
        let updateData = {
          id: data.id,
          name: data.name,
          prizeType: data.prizeType,
          couponActiveCode: data.couponActiveCode,
          credit: data.credit,
          categoryName: 'other',
          brandName: 'other',
          stock: data.stock,
        }
        console.log(updateData)
        updatePrizeItem(updateData).then(res => {
          console.log(res.data)
          this.getProd()
        })
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    },



    // 获取商品列表
    getProd() {
      let data = {
        name: '积分'
      }
      getPrizeItemByName(data).then(res => {
        console.log(res)
      })

      let data4 = {
        PageIndex: 1,
        PageSize : 50
      }
      getPrizeItemAll(data4).then(res4 => {
        console.log(res4.data.data)
        this.desserts = res4.data.data
        for (let i of this.desserts) {
          console.log(i)
          if (i.prizeType === 'Credit') {
            i.prizeTypeshow = '积分商品'
          } else if (i.prizeType === 'Coupon') {
            i.prizeTypeshow = '优惠券兑换码'
          } else if (i.prizeType === 'Physical') {
            i.prizeTypeshow = '实物'
          } 
          if (i.couponActiveCode === '' || i.couponActiveCode === null) {
            i.couponActiveCodeshow = '无'
          } else {
            i.couponActiveCodeshow = i.couponActiveCode
          }
          if (i.credit === '' || i.credit === null) {
            i.creditshow = '无'
          } else {
            i.creditshow = i.credit
          }
        }
      })
    },


    // 删除商品
    delAct(val) {
      // console.log(val.id)
      let delData = {
        id: val.id
      }
      console.log(delData)
      deletePrizeItem(delData).then(res => {
        console.log(res)
        this.getProd()
      })
    },
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
