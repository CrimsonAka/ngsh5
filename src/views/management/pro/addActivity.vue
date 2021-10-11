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
        label="活动名称"
        required
      ></v-text-field>

      <v-subheader>活动类型：</v-subheader>
      <v-row class="ml-1 mb-3">
        <v-checkbox
          v-model="activityType"
          label="抽奖活动"
          color="orange"
          value="Lottery"
          hide-details
        ></v-checkbox>
        <v-checkbox
          v-model="activityType"
          label="签到活动"
          color="orange darken-3"
          value="SingleAttendance"
          hide-details
          class="ml-5"
        ></v-checkbox>
        <v-checkbox
          v-model="activityType"
          label="连续签到活动"
          color="orange darken-6"
          value="SequentialAttendance"
          hide-details
          class="ml-5"
        ></v-checkbox>
      </v-row>

      <div v-show="this.activityType === 'Lottery'">
      <v-row class="ml-1 mb-3">
        <v-checkbox
          v-model="lotteryDisplay"
          label="转盘"
          color="orange"
          value="Roulette"
          hide-details
        ></v-checkbox>
        <v-checkbox
          v-model="lotteryDisplay"
          label="寻宝"
          color="orange darken-3"
          value="Digging"
          hide-details
          class="ml-5"
        ></v-checkbox>
        <v-checkbox
          v-model="lotteryDisplay"
          label="刮刮乐"
          color="orange darken-6"
          value="Scratchcard"
          hide-details
          class="ml-5"
        ></v-checkbox>
      </v-row>
      </div>

      <v-subheader >活动渠道：</v-subheader>
      <v-row class="ml-1 mb-3">
        <v-checkbox
          v-model="availableChannels"
          label="ngs"
          color="orange"
          value="ngs"
          hide-details
        ></v-checkbox>
        <v-checkbox
          v-model="availableChannels"
          label="ngsplaza"
          color="orange darken-3"
          value="ngsplaza"
          hide-details
          class="ml-5"
        ></v-checkbox>
        <v-checkbox
          v-model="availableChannels"
          label="alldays"
          color="orange darken-6"
          value="alldays"
          hide-details
          class="ml-5"
        ></v-checkbox>
      </v-row>

      <v-subheader >活动设置：</v-subheader>
      <v-row class="ml-1 mb-3">
        <v-text-field
          v-model="dailyLimit"
          label="活动单日抽奖上限"
          required
        ></v-text-field>
      </v-row>

      <v-subheader >时间设置：</v-subheader>
      <v-row class="ml-1 mb-3">
        <v-checkbox
          v-model="timeType"
          label="开始时间"
          color="orange"
          value="st"
          hide-details
        ></v-checkbox>
        <v-checkbox
          v-model="timeType"
          label="开始时间-结束时间"
          color="orange darken-3"
          value="st-et"
          hide-details
          class="ml-5"
        ></v-checkbox>
      </v-row>
      <v-row class="ml-1 mb-3">
      <v-col cols="12" sm="6" md="4" v-show="this.timeType === 'st' || 'st-et'">
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="startTime"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="startTime"
              label="活动开始时间"
              prepend-icon="mdi-calendar-blank"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="startTime" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.menu.save(startTime)">OK</v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" sm="6" md="4" v-show="this.timeType === 'st-et'">
        <v-menu
          ref="menu2"
          v-model="menu2"
          :close-on-content-click="false"
          :return-value.sync="endTime"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="endTime"
              label="活动结束时间"
              prepend-icon="mdi-calendar-blank"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="endTime" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu2 = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.menu2.save(endTime)">OK</v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
      </v-row>

      <!-- color -->
      <!-- <div>
        <v-checkbox>选择活动颜色</v-checkbox>
      </div> -->


      <!-- 列表 -->
      <!-- <v-data-table
        :headers="headers"
        :items="desserts"
        :sort-by="['index']"
        :sort-desc="[false, true]"
        multi-sort
        :single-expand="singleExpand"
        :expanded.sync="expanded"
        item-key="level"
        show-expand
        class="elevation-1 mb-3"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>活动奖品</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            />
            <v-spacer />
            <v-dialog v-model="dialog"  max-width="600px">
              <template v-slot:activator="{ on, attrs } ">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >添加新奖品</v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>
  
                <v-card-text>
                  <v-container>
                    <v-col>
                      <v-text-field v-model="editedItem.level" label="奖励等级"></v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field v-model="editedItem.acid" label="奖励名称"></v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field v-model="editedItem.carbs" label="概率"></v-text-field>
                    </v-col>
                    <v-col>
                      <v-file-input v-model="editedItem.fat" small-chips multiple label="图片"></v-file-input>
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
          </v-toolbar>
        </template>
        <template v-slot:item.actions = "{ item }">
          <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">More info about {{ item.level }}</td>
        </template>
      </v-data-table> -->

      <v-btn
        color="error"
        class="mr-4"
        @click="reset"
      >
        取 消
      </v-btn>
  
      <v-btn
        color="warning"
        @click="addActivity"
      >
        确 定
      </v-btn>
    </v-form>
  </div>
</template>

<script>
  import {
    postActivity, // 创建活动
  } from '../../../api/module/backend'
  export default {
    name: 'AddActivity',

    data: () => ({
      // 
      person: '添加活动',

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
      activityType: 'Lottery',
      timeType: 'st',

      startTime: new Date().toISOString().substr(0, 10),
      menu: false,
      endTime: null,
      menu2: false,
      dailyLimit: null,

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
      addActivity() {
        if (this.activityType !== 'Lottery') {
          this.lotteryDisplay = 'None'
        }
        if (this.dailyLimit === 0) {
          this.dailyLimit = null
        }
        let data = {
          name: this.name,
          // limit: 0,
          // dailyLimit: 0,
          availableChannels: this.availableChannels,
          lotteryDisplay: this.lotteryDisplay,
          activityType: this.activityType,
          startTime: this.startTime,
          endTime: this.endTime,
          dailyLimit: this.dailyLimit
        }
        console.log(data)
        postActivity(data).then(res => {
          console.log(res)
          console.log(res.data.data.id)
          let a = res.data.data
          let data = {
            id: a.id,
            name: a.name,
            availableChannels: a.availableChannels,
            lotteryDisplay: a.lotteryDisplay,
            startTime: a.startTime,
            endTime: a.endTime,
            dailyLimit: a.dailyLimit
          }
          this.$router.push({path: '/management/addPrizeTier', query: data})
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
