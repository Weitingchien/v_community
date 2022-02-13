<template>
  <v-card>
    <v-card-text>
      <v-flex class="mb-4">
        <v-avatar size="96" class="mr-4">
          <img :src="`data:image/png;base64,${avatar}`" alt="Avatar" />
        </v-avatar>
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
      </v-flex>
      <v-text-field v-model="username" label="username"></v-text-field>
      <v-text-field v-model="email" label="email"></v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" @click="updateUserInfo"> Save Changes </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  middleware: ['isauth', 'isthatyou'],
  data() {
    return {
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

  methods: {
    currentFile(file) {
      console.log('觸發currentFile函式')
      console.log(file)
      this.file = file
    },
    async updateUserInfo() {
      const formData = new FormData()
      formData.append('avatar', this.file)
      formData.append('userid', this.$store.getters.getUserInfo.id)
      const responseOne = await this.$api.uploadAvatar(formData)
      this.avatar = Buffer.from(responseOne.data.result[0].avatar).toString(
        'base64'
      )
      console.log(responseOne.data.result[0].avatar)

      /*       const responseTwo = await this.$api.updateUser({
        username: this.username,
        email: this.email,
      })
      console.log(responseTwo) */
    },
  },
}
</script>

<style></style>
