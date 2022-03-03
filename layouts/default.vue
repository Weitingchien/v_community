<template>
  <v-app dark>
    <NavbarItem />
    <v-main>
      <v-container fluid>
        <v-row no-gutters>
          <v-col xs="12" sm="12" lg="2">
            <LeftSideBar class="ma-3" />
          </v-col>
          <v-col xs="12" sm="12" lg="8">
            <Nuxt class="ma-3" />
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
