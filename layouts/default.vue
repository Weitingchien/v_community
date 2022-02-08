<template>
  <v-app dark>
    <NavbarItem />
    <v-main>
      <v-container fluid>
        <v-row justify="space-around" no-gutters>
          <v-col cols="4">
            <LeftSideBar />
          </v-col>
          <v-col cols="8">
            <Nuxt />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      fixed: false,
      right: true,
      rightDrawer: false,
    }
  },
}
</script>
