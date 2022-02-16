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
        <v-col v-if="isAuthenticated === true" cols="2">
          <v-avatar size="32">
            <img :src="`data:image/png;base64,${avatar}`" alt="Avatar" />
          </v-avatar>
        </v-col>
      </v-row>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list>
        <v-list-item to="/">
          <v-list-item-content>
            <v-list-item-title>首頁</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="isAuthenticated === false" to="/login-community">
          <v-list-item-content>
            <v-list-item-title>登入</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-if="isAuthenticated === true"
          :to="{
            path: `/auth/member/${getUserInfo.username}`,
          }"
        >
          <v-list-item-content>
            <v-list-item-title>個人資料</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="isAuthenticated === true" @click="logout">
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      miniVariant: false,
      title: 'V',
      avatar: null,
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
    getAvatar() {
      return this.$localStorage.get('avatar')
    },
  },
  watch: {
    async '$store.getters.isAuthenticated'(newVal) {
      if (newVal) {
        const response = await this.$api.getAvatar({
          userid: this.$store.getters.getUserInfo.id,
        })
        this.avatar = Buffer.from(response.data.result[0].avatar).toString(
          'base64'
        )
        this.$store.dispatch('handUploadAvatar', this.avatar)
        console.log(response)
      }
    },
    async '$store.getters.getAvatar'(newVal, oldVal) {
      console.log('新值: ' + newVal, '舊值: ' + oldVal)
      if (newVal !== oldVal) {
        const response = await this.$api.getAvatar({
          userid: this.$store.getters.getUserInfo.id,
        })
        this.avatar = Buffer.from(response.data.result[0].avatar).toString(
          'base64'
        )
        this.$store.dispatch('handUploadAvatar', this.avatar)
      }
    },
  },
  mounted() {
    if (this.$store.getters.isAuthenticated) {
      this.avatar = this.getAvatar
    }
  },

  methods: {
    async logout() {
      await this.$auth.logout()
    },
  },
}
</script>

<style></style>
