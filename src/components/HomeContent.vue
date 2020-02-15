<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <router-link to="/"
          ><v-img
            src="https://www.truckpad.com.br/uploads/2019/11/016f3cfa-truckpad-logo.svg"
            class="my-3"
            contain
            height="200"
          />
        </router-link>
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          TruckPad - O app da carga
        </h1>
      </v-col>
      <!-- <v-col class="mb-5" cols="12">
        <router-link to="/drivers"><a>Motoristas cadastrados</a></router-link>
        <br />
        <router-link to="/driver/new"><a>Novo Motorista</a></router-link>
      </v-col> -->
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "HelloWorld"
};
</script>
