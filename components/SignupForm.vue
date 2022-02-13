<template>
  <div>
    <AlertError v-if="errMessage.length" :err="errMessage" />
    <v-form ref="form" v-model="valid">
      <!--   <input name="avatar" type="file" @change="currentFile($event)" />-->
      <v-text-field
        v-model="signUpData.username"
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
        v-model="signUpData.email"
        name="email"
        label="email"
        :rules="emailRules"
        required
      ></v-text-field>
      <v-text-field
        v-model="signUpData.password"
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show1 ? 'text' : 'password'"
        label="password"
        :rules="passwordRules"
        counter
        required
        autocomplete="current-password"
        @click:append="show1 = !show1"
      ></v-text-field>
      <v-text-field
        v-model="confirmPassword"
        label="confirmPassword"
        :rules="confirmPasswordRules"
        required
      ></v-text-field>
      <v-btn :disabled="!valid" @click="submit">送出</v-btn>
      <v-btn @click="clear">重填</v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      valid: true,
      show1: false,
      file: null,
      signUpData: {
        username: '',
        email: '',
        password: '',
      },
      confirmPassword: '',
      errMessage: '',
      usernameRules: [
        (v) => !!v || 'username必填',
        (v) =>
          typeof v === 'string'
            ? v.trim().split(' ')[0].length >= 4
            : false || '最少4個字',
        (v) =>
          typeof v === 'string'
            ? v.trim().split(' ')[0].length <= 25
            : false || '最多25個字',
      ],
      emailRules: [
        (v) => !!v || 'email必填',
        (v) => /.+@.+\..+/.test(v) || '無效的E-mail',
      ],
      passwordRules: [
        (v) => !!v || '密碼必填',
        (v) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(v) ||
          '最少8個字，至少一個大寫字母、一個小寫字母和一個數字',
      ],
      confirmPasswordRules: [
        (v) => !!v || '確認密碼必填',
        () =>
          this.signUpData.password === this.confirmPassword ||
          '確認密碼與密碼不一樣，請重新輸入',
      ],
    }
  },
  methods: {
    async submit() {
      try {
        const response = await this.$api.signUp(this.signUpData)
        console.log(response)
      } catch (err) {
        console.error(err.response.data.message)
        this.errMessage = err.response.data.message
      }
    },
    clear() {
      this.signUpData.email = ''
      this.signUpData.password = ''
      this.confirmPassword = ''
      this.errMessage = ''
      this.$refs.form.reset()
    },
  },
}
</script>
