<template>
  <v-form v-model="valid">
    <v-card>
      <v-card-text>
        <v-row class="flex-column justify-center align-center mb-4">
          <v-avatar size="96" class="mr-4">
            <img :src="`data:image/png;base64,${avatar}`" alt="Avatar" />
            <v-avatar v-if="!isLoading" size="96" color="grey darken-2">
              <v-skeleton-loader
                class="mx-auto"
                type="avatar"
              ></v-skeleton-loader>
            </v-avatar>
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
          <v-progress-linear
            v-model="progress"
            color="grey lighten-3"
            height="15"
            reactive
          >
            <strong>{{ progress }} %</strong>
          </v-progress-linear>
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
  data() {
    return {
      valid: true,
      loading3: false,
      file: null,
      fileErrorMes: '',
      avatar: null,
      progress: 0,
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
    isLoading() {
      return this.$store.getters.getAvatarLoading
    },
    getAvatar() {
      return this.$localStorage.get('avatar')
    },
  },
  async mounted() {
    console.log(' 觸發 mounted ! ')
    if (this.$store.getters.isAuthenticated) {
      this.avatar = this.getAvatar
      const response = await this.$api.getUserData({
        id: this.$store.getters.getUserInfo.id,
      })
      if (response.status === 200) {
        this.$store.dispatch('handAvatarLoading', true)
      }
      this.$store.dispatch('handUpdateUserData', [
        response.data.result[0].username,
        'username',
      ])
      this.$store.dispatch('handUpdateUserData', [
        response.data.result[0].email,
        'email',
      ])
      console.log(response)
    }
  },

  methods: {
    currentFile(file) {
      this.file = file
      this.progress = 0
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
      const response = await this.$api.uploadAvatar(
        formData,
        (progressEvent) => {
          this.progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          )
        }
      )
      this.avatar = Buffer.from(response.data.result[0].avatar).toString(
        'base64'
      )
      console.log(response)
      this.$store.dispatch('handUploadAvatar', this.avatar)
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
