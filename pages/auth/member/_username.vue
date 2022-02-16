<template>
  <v-form v-model="valid">
    <v-card>
      <v-card-text>
        <v-row class="flex-column justify-center align-center mb-4">
          <v-avatar size="96" class="mr-4">
            <img :src="`data:image/png;base64,${avatar}`" alt="Avatar" />
          </v-avatar>
        </v-row>

        <v-row class="justify-center align-center mb-2">
          <client-only>
            <v-file-input
              ref="image"
              show-size
              counter
              name="avatar"
              :rules="avatarRules"
              :error-messages="fileErrorMes"
              accept="image/png, image/jpeg"
              placeholder="Pick an avatar"
              prepend-icon="mdi-camera"
              label="Avatar"
              @change="currentFile"
            ></v-file-input>
          </client-only>
          <v-btn
            :loading="loading3"
            :disabled="!valid"
            color="blue-grey"
            class="ma-2 white--text"
            @click="upLoadAvatar"
          >
            點擊確認上傳此大頭貼
            <v-icon right dark> mdi-cloud-upload </v-icon>
          </v-btn>
        </v-row>

        <v-text-field
          v-model="username"
          name="username"
          label="username"
          :rules="usernameRules"
          counter="25"
          :counter-value="
            (v) => (typeof v === 'string' ? v.trim().split(' ')[0].length : 0)
          "
          required
          autocomplete="username"
        ></v-text-field>
        <v-text-field
          v-model="email"
          name="email"
          label="email"
          :rules="emailRules"
          required
        ></v-text-field>
      </v-card-text>
      <v-card-actions class="flex-column justify-center align-center">
        <v-btn
          class="mb-4"
          color="primary"
          :disabled="!valid"
          @click="updateUserInfo"
        >
          儲存
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
export default {
  middleware: ['isauth', 'isthatyou'],
  data() {
    return {
      valid: true,
      loading3: false,
      file: null,
      fileErrorMes: '',
      userInfoData: {
        username: '',
        email: '',
        password: '',
        role: '',
      },
      emailRules: [
        (v) => !!v || 'email必填',
        (v) => /.+@.+\..+/.test(v) || '無效的E-mail',
      ],
      avatar: null,
      usernameRules: [
        (v) => !!v || 'username必填',
        (v) =>
          typeof v === 'string'
            ? v.trim().split(' ')[0].length >= 5
            : false || '最少5個字',
        (v) =>
          typeof v === 'string'
            ? v.trim().split(' ')[0].length <= 25
            : false || '最多25個字',
      ],
      avatarRules: [(v) => !v || v.size < 2000000 || '大頭貼必須小於 2 MB!'],
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
    getAvatar() {
      return this.$localStorage.get('avatar')
    },
  },
  mounted() {
    if (this.$store.getters.isAuthenticated) {
      console.log(this)
      this.avatar = this.getAvatar
    }
  },

  methods: {
    currentFile(file) {
      this.file = file
      console.log(file)
      if (file) {
        this.fileErrorMes = null
        const type = file.type.split('/')[1]
        if (type !== 'png' && type !== 'jpeg') {
          this.fileErrorMes = '檔案格式不支援'
        }
      } else {
        this.fileErrorMes = '沒有檔案'
      }
    },
    async upLoadAvatar() {
      const formData = new FormData()
      formData.append('avatar', this.file)
      formData.append('userid', this.$store.getters.getUserInfo.id)
      const response = await this.$api.uploadAvatar(formData)
      this.avatar = Buffer.from(response.data.result[0].avatar).toString(
        'base64'
      )
      this.$store.dispatch('handUploadAvatar', this.avatar)
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
