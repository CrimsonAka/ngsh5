<template>
  <v-app>
    <v-system-bar></v-system-bar>
    <v-app-bar
      flat
      dense
      absolute
    >
      <v-btn icon @click="backBtn">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-btn icon right>
        <v-icon>mdi-home</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>

    <v-footer>
      <v-bottom-navigation
        v-model="bottomNav"
        grow
        shift
        fixed
      >
        <v-btn value="home" @click="ngsBtn">
          <span>首页</span>
          <v-icon>mdi-home</v-icon>
        </v-btn>
  
        <v-btn value="person" @click="personBtn">
          <span>个人信息</span>
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </v-footer>

  </v-app>
</template>

<script>
  export default {
    name: 'Layout',

    data: () => ({
      // 底部栏
      bottomNav: 'home',
      // 返回键
      window: true
    }),
    methods: {
      ngsBtn() {
        this.$router.push({ path: '/home/ngs', params:{number: 1} })
        this.bottomNav = 'home'
      },
      personBtn() {
        this.$router.push({ path: '/home/person' })
        this.bottomNav = 'person'
      },
      backBtn(){
        this.$router.back()
        let route = this.$route
        // console.log(route)
        if (route.name === 'Adward') {
          this.bottomNav = 'person'
        } else if ( route.name === 'Address' ) {
          this.bottomNav = 'person'
        } else if ( route.name === 'Person' ) {
          this.bottomNav = 'home'
        } else if ( route.name === 'Ngs' ) {
          this.bottomNav = 'person'
        }
      },
    }
  }
</script>
