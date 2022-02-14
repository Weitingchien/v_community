<template>
  <v-app dark>
    <NavbarItem />
    <v-main>
      <v-container fluid>
        <v-row no-gutters>
          <v-col cols="1">
            <LeftSideBar />
          </v-col>
          <v-spacer></v-spacer>
          <v-col>
            <Nuxt />
          </v-col>
          <v-spacer></v-spacer>
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
