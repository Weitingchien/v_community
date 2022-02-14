<template>
  <v-card>
    <v-card-text>
      <v-row class="flex-column justify-center align-center mb-4">
        <v-avatar size="96" class="mr-4">
          <img :src="`data:image/png;base64,${avatar}`" alt="Avatar" />
        </v-avatar>
      </v-row>
      <v-row class="justify-center align-center mb-2">
        <v-file-input
          ref="image"
          name="avatar"
          :rules="avatarRules"
          accept="image/png, image/jpeg, image/bmp"
          placeholder="Pick an avatar"
          prepend-icon="mdi-camera"
          label="Avatar"
          @change="currentFile"
        ></v-file-input>
        <v-btn
          :loading="loading3"
          :disabled="loading3"
          color="blue-grey"
          class="ma-2 white--text"
          @click="upLoadAvatar"
        >
          點擊確認上傳此大頭貼
          <v-icon right dark> mdi-cloud-upload </v-icon>
        </v-btn>
      </v-row>

      <v-text-field v-model="username" label="username"></v-text-field>
      <v-text-field v-model="email" label="email"></v-text-field>
    </v-card-text>
    <v-card-actions class="flex-column justify-center align-center">
      <v-btn class="mb-4" color="primary" @click="updateUserInfo"> 儲存 </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  middleware: ['isauth', 'isthatyou'],
  async asyncData({ store, $api }) {
    const response = await $api.getAvatar({
      userid: store.getters.getUserInfo.id,
    })
    const avatar = Buffer.from(response.data.result[0].avatar).toString(
      'base64'
    )
    store.dispatch('handUploadAvatar', avatar)
  },
  data() {
    return {
      loading3: false,
      file: null,
      userInfoData: {
        username: '',
        email: '',
        password: '',
        role: '',
      },
      avatar: null,
      avatarRules: [
        (v) =>
          !v || v.size < 2000000 || 'Avatar size should be less than 2 MB!',
      ],
    }
  },
  computed: {
    username: {
      get() {
        return this.$store.state.auth.user.username
      },
      set(value) {
        const columnType = 'username'
        this.$store.dispatch('handUpdateUserData', [value, columnType])
      },
    },
    email: {
      get() {
        return this.$store.state.auth.user.email
      },
      set(value) {
        const columnType = 'email'
        this.$store.dispatch('handUpdateUserData', [value, columnType])
      },
    },
  },
  mounted() {
    this.avatar = this.$store.getters.getAvatar
  },

  methods: {
    currentFile(file) {
      this.file = file
    },
    async upLoadAvatar() {
      const formData = new FormData()
      formData.append('avatar', this.file)
      formData.append('userid', this.$store.getters.getUserInfo.id)
      const response = await this.$api.uploadAvatar(formData)
      this.avatar = Buffer.from(response.data.result[0].avatar).toString(
        'base64'
      )
      console.log(response.data.result[0].avatar)
    },
    async updateUserInfo() {
      const response = await this.$api.updateUser({
        username: this.username,
        email: this.email,
      })
      console.log(response)
    },
  },
}
</script>

<style></style>
