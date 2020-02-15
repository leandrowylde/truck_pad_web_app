import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drivers: []
  },
  mutations: {
    SEED_DRIVERS(state, data) {
      state.drivers = data;
    }
  },
  actions: {
    seedDrivers({ commit }) {
      let drivers = [
        {
          name: "Motorista 1",
          phone: "1134637463",
          birthdate: "1990-05-05",
          cnh: "17093134349",
          cnh_type: "E",
          cpf: "54460800098"
        },
        {
          name: "Motorista 2",
          phone: "21937483647",
          birthdate: "1982-07-10",
          cnh: "99905416968",
          cnh_type: "E",
          cpf: "16386856066"
        },
        {
          name: "Motorista 3",
          phone: "35983746754",
          birthdate: "1980-04-03",
          cnh: "58150274840",
          cnh_type: "E",
          cpf: "67022186057"
        }
      ];
      commit("SEED_DRIVERS", drivers);
    }
  },
  modules: {}
});
