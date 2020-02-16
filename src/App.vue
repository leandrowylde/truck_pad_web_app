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
      <v-snackbar
        v-model="successSnackbar"
        color="success"
        :timeout="3000"
        bottom
        right
        >{{ successSnackbarMessage }}
        <v-btn @click="successSnackbar = false" text dark>Fechar</v-btn>
      </v-snackbar>
      <v-snackbar
        v-model="errorSnackbar"
        color="danger"
        :timeout="3000"
        bottom
        right
        >{{ errorSnackMessage }}
        <v-btn @click.prevent="errorSnackbar = false" text dark>Fechar</v-btn>
      </v-snackbar>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "App",

  data: () => ({
    successSnackbar: false,
    errorSnackbar: false,
    successSnackbarMessage: null,
    errorSnackMessage: null
  }),
  created() {
    this.$store.dispatch("seedDrivers");
  },
  computed: {
    ...mapGetters(["successMessage", "errorMessage"])
  },
  watch: {
    successMessage(newValue, oldValue) {
      if (newValue !== null) {
        this.successSnackbar = true;
        this.successSnackbarMessage = newValue;
      }
    },
    errorMessage(newValue, oldValue) {
      if (newValue !== null) {
        this.errorSnackbar = true;
        this.errorSnackMessage = newValue;
      }
    }
  }
};
</script>
