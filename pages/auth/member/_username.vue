<template>
  <v-card>
    <v-card-text>
      <v-flex class="mb-4">
        <v-avatar size="96" class="mr-4">
          <img src="#" alt="Avatar" />
        </v-avatar>
        <v-file-input
          :rules="rules"
          accept="image/png, image/jpeg, image/bmp"
          placeholder="Pick an avatar"
          prepend-icon="mdi-camera"
          label="Avatar"
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
      userInfoData: {
        username: '1',
        email: '',
        password: '',
        role: '',
      },
      rules: [
        (value) =>
          !value ||
          value.size < 2000000 ||
          'Avatar size should be less than 2 MB!',
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
