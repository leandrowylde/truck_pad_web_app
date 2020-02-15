<template>
  <v-app>
    <v-app-bar app color="amber">
      <div class="d-flex align-center">
        <router-link to="/">
          <v-img
            alt="Vuetify Name"
            class="shrink mt-1 hidden-sm-and-down"
            contain
            min-width="100"
            src="https://www.truckpad.com.br/uploads/2020/02/646db7f2-truckpad-logo-negativo.svg"
            width="100"
          />
        </router-link>
      </div>

      <v-spacer></v-spacer>

      <v-btn text to="/drivers">Motoristas</v-btn>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
  created() {
    this.$store.dispatch("seedDrivers");
  }
};
</script>
