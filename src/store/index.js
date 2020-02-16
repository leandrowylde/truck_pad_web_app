import Vue from "vue";
import Vuex from "vuex";
import db from "../db";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drivers: [],
    successMessage: null,
    errorMessage: null
  },
  mutations: {
    CLEAN_MESSAGES(state) {
      state.successMessage = null;
      state.errorMessage = null;
    },
    SET_SUCCESS_MESSAGE(state, msg) {
      state.successMessage = msg;
    },
    SET_ERROR_MESSAGE(state, msg) {
      state.errorMessage = msg;
    },
    SET_DRIVERS(state, data) {
      state.drivers = data;
    },
    SET_DRIVER_TO_EDIT(state, data) {
      console.log("Drivers on Edit => ", state.drivers);
      state.driver_to_edit = data;
    },
    SET_ERROR(state, msg) {
      state.error = msg;
    },
    CLEAN_ERROR(state) {
      state.error = null;
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
      db.insert(drivers, (err, data) => {
        if (err != null) {
          commit("SET_ERROR_MESSAGE", "Erro ao inserir dados iniciais");
        }
      });
    },
    fetchDrivers({ commit }) {
      commit("CLEAN_MESSAGES");
      db.find({}, (err, data) => {
        if (err !== null) {
          commit("SET_ERROR_MESSAGE", "Erro ao carregar os registros");
        }
        commit("SET_DRIVERS", data);
      });
    },
    getDriver({ commit }, payload) {
      commit("CLEAN_MESSAGES");
      return new Promise((resolve, reject) => {
        db.findOne({ _id: payload }, (err, driver) => {
          if (err !== null) {
            commit(
              "SET_ERROR_MESSAGE",
              `Erro ao carregar oo registro de ID ${payload}`
            );
            reject(err);
          }
          resolve(driver);
        });
      });
    },
    updateDriver({ commit }, payload) {
      commit("CLEAN_MESSAGES");
      return new Promise((resolve, reject) => {
        db.update({ _id: payload._id }, payload, {}, (err, replaced_docs) => {
          if (err !== null) {
            commit(
              "SET_ERROR_MESSAGE",
              `Erro ao atualizar oo registro de ID ${payload._id}`
            );
            reject(err);
          }
          commit("SET_SUCCESS_MESSAGE", "Registro atualizado.");
          resolve(replaced_docs);
        });
      });
    },
    newDriver({ commit }, payload) {
      commit("CLEAN_MESSAGES");
      return new Promise((resolve, reject) => {
        db.insert(payload, (err, data) => {
          if (err !== null) {
            commit("SET_ERROR_MESSAGE", `Erro ao salvar o registro.`);
            reject(err);
          }
          commit("SET_SUCCESS_MESSAGE", "Registro inserido.");
          resolve(data);
        });
      });
    }
  },
  getters: {
    drivers: state => {
      return state.drivers;
    },
    successMessage: state => {
      return state.successMessage;
    },
    errorMessage: state => {
      return state.errorMessage;
    }
  },
  modules: {}
});
