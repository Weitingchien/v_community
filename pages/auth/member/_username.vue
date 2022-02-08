<template>
  <v-card>
    <v-card-text>
      <v-flex class="mb-4">
        <v-avatar size="96" class="mr-4">
          <img src="#" alt="Avatar" />
        </v-avatar>
        <v-btn>Change Avatar</v-btn>
      </v-flex>
      <v-text-field
        v-model="getUserInfo.username"
        label="username"
      ></v-text-field>
      <v-text-field v-model="getUserInfo.email" label="email"></v-text-field>
      <v-text-field v-model="getUserInfo.role" label="role"></v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary"> Save Changes </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  middleware: ['isauth', 'isthatyou'],
  data() {
    return {
      userInfoData: {
        username: '',
        email: '',
        password: '',
        role: '',
      },
    }
  },
  computed: {
    getUserInfo() {
      return this.$store.getters.getUserInfo
    },
  },
}
</script>

<style></style>
