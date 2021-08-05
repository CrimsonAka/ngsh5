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
        :counter="10"
        :rules="nameRules"
        label="活动名称"
        required
      ></v-text-field>

      <v-row class="ml-1 mb-3">
        <v-checkbox
          v-model="ex4"
          label="转盘"
          color="orange"
          value="orange"
          hide-details
        ></v-checkbox>
        <v-checkbox
          v-model="ex4"
          label="寻宝"
          color="orange darken-3"
          value="orange darken-3"
          hide-details
          class="ml-5"
        ></v-checkbox>
        <v-checkbox
          v-model="ex4"
          label="刮刮乐"
          color="orange darken-6"
          value="orange darken-6"
          hide-details
          class="ml-5"
        ></v-checkbox>
      </v-row>

      <v-data-table
        :headers="headers"
        :items="desserts"
        :sort-by="['index']"
        :sort-desc="[false, true]"
        multi-sort
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
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.level" label="奖励等级"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.acid" label="奖励名称"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-file-input v-model="editedItem.fat" small-chips multiple label="图片"></v-file-input>
                      </v-col>
                      <!-- <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.protein" label="Protein (g)"></v-text-field>
                      </v-col> -->
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
      </v-data-table>
  
      <!-- <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="validate"
      >
        Validate
      </v-btn> -->
  
      <v-btn
        color="error"
        class="mr-4"
        @click="reset"
      >
        取 消
      </v-btn>
  
      <v-btn
        color="warning"
        @click="resetValidation"
      >
        确 定
      </v-btn>
    </v-form>
  </div>
</template>

<script>
  export default {
    name: 'AddActivity',

    data: () => ({
      // 
      person: '添加活动',

      // 获取本地数据
      userMsg: {},
      valid: true,
      name: '',
      nameRules: [
        // v => !!v || 'Name is required',
        // v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      email: '',
      emailRules: [
        // v => !!v || 'E-mail is required',
        // v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      select: null,
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ],
      checkbox: false,



      // tabledata
      dialog: false,
      headers: [
        {
          text: '奖励等级',
          align: 'start',
          // sortable: false,
          value: 'level'
        },
        { text: '奖励名称', value: 'acid' },
        { text: '图片', value: 'fat' },
        // { text: 'Carbs (g)', value: 'carbs' },
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
      },
    }),

    created() {
      // this.ifLogin()
      this.initialize()
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
            level: '二等奖',
            acid: 999,
            // fat: 9.0,
            // carbs: 37,
            // protein: 4.3,
            index: 2
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
