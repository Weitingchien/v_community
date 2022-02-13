<template>
  <v-form ref="form" v-model="valid">
    <v-text-field
      v-model="loginData.email"
      name="email"
      label="email"
      :rules="emailRules"
      required
      autocomplete="username"
    ></v-text-field>
    <v-text-field
      v-model="loginData.password"
      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
      :type="show1 ? 'text' : 'password'"
      label="password"
      :rules="passwordRules"
      required
      autocomplete="current-password"
      @click:append="show1 = !show1"
      @keyup.enter="submit"
    ></v-text-field>
    <v-btn :disabled="!valid" @click="submit">送出</v-btn>
    <v-btn @click="clear">清除</v-btn>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      valid: true,
      show1: false,
      loginData: {
        email: '',
        password: '',
      },
      errMessage: '',
      emailRules: [
        (v) => !!v || 'email必填',
        (v) => /.+@.+\..+/.test(v) || '無效的E-mail',
      ],
      passwordRules: [(v) => !!v || '密碼必填'],
    }
  },
  methods: {
    async submit() {
      try {
        const successfulLogin = await this.$auth.loginWith('local', {
          data: this.loginData,
        }) // login(this.loginData)
        /*         if (successfulLogin) {
          await this.$auth.setUser({
            email: this.loginData.email,
          })
        } */
        console.log(successfulLogin)
        this.$router.push('/member-community')
      } catch (err) {
        console.error(err.response)
        this.errMessage = err.response.data.message
      }
    },
    clear() {
      this.loginData.email = ''
      this.loginData.password = ''
      this.$refs.form.reset()
    },
  },
}
</script>

<style></style>
