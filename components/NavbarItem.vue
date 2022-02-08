<template>
  <div>
    <v-app-bar class="grey darken-3">
      <v-app-bar-nav-icon v-if="isVisible" @click.stop="drawer = !drawer" />
      <!--       <v-toolbar-title v-text="title" /> -->
      <!-- <v-spacer /> -->
      <v-row v-if="!isVisible" align="center" justify="space-around">
        <v-col cols="2">
          <v-btn text block to="/">首頁</v-btn>
        </v-col>
        <v-col v-if="isAuthenticated === false" cols="2">
          <v-btn text block to="/login-community">登入</v-btn>
        </v-col>
        <v-col v-if="isAuthenticated === true" cols="2">
          <v-btn
            text
            block
            :to="{
              path: `/auth/member/${getUserInfo.username}`,
            }"
            >個人資料
          </v-btn>
        </v-col>
        <v-col v-if="isAuthenticated === true" cols="2">
          <v-btn text block @click="logout">登出</v-btn>
        </v-col>
        <v-col cols="2">
          <v-btn text block to="/signup-community">註冊</v-btn>
        </v-col>
      </v-row>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list>
        <v-list-item
          v-for="item in items"
          :key="item.to"
          :to="item.to"
          router
          exact
        >
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      miniVariant: false,
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
          to: '/signup-community',
        },
      ],
      title: 'V',
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated
    },
    getUserInfo() {
      if (!this.$store.getters.getUserInfo) {
        const defaultRoute = 'index'
        return defaultRoute
      }
      return this.$store.getters.getUserInfo
    },
    isVisible() {
      if (this.$vuetify.breakpoint.name === 'xs') {
        return true
      }
      return false
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
