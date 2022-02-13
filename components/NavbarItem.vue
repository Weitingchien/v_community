<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item to="/">
          <v-list-item-content>
            <v-list-item-title>首頁 </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="isAuthenticated === false" to="/login-community">
          <v-list-item-content>
            <v-list-item-title>登入</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
<<<<<<< Updated upstream
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
=======
          v-if="isAuthenticated === true"
          :to="{
            path: `/auth/member/${getUserInfo.username}`,
          }"
>>>>>>> Stashed changes
        >
          <v-list-item-content>
            <v-list-item-title>個人資料</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="isAuthenticated === true" to="/" @click="logout">
          <v-list-item-content>
            <v-list-item-title>登出</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/signup-community">
          <v-list-item-content>
            <v-list-item-title>註冊</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-row align="center" justify="space-around">
        <v-col cols="2">
          <v-btn text block to="/">首頁</v-btn>
        </v-col>
        <v-col v-if="!isAuthenticated" cols="2">
          <v-btn text block to="/login-community">登入</v-btn>
        </v-col>
        <v-col v-if="isAuthenticated" cols="2">
          <v-btn text block @click="logout">登出</v-btn>
        </v-col>
        <v-col cols="2">
          <v-btn text block to="/signup-community">註冊</v-btn>
        </v-col>
      </v-row>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      miniVariant: false,
<<<<<<< Updated upstream
      items: [
        {
          icon: 'mdi-apps',
          title: '首頁',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: '登入',
          to: '/login-community',
        },
        {
          icon: 'mdi-chart-bubble',
          title: '註冊',
          to: '/register-community',
        },
      ],
=======
>>>>>>> Stashed changes
      title: 'V',
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated
    },
  },
  methods: {
    async logout() {
      await this.$auth.logout()
    },
  },
}
</script>

<style></style>
