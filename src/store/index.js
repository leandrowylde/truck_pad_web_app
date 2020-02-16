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
    UPDATE_DRIVERS_LIST(state, data) {
      let index = state.drivers.findIndex(driver => driver._id == data);
      state.drivers[index].active = false;
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
          cpf: "54460800098",
          active: true
        },
        {
          name: "Motorista 2",
          phone: "21937483647",
          birthdate: "1982-07-10",
          cnh: "99905416968",
          cnh_type: "E",
          cpf: "16386856066",
          active: true
        },
        {
          name: "Motorista 3",
          phone: "35983746754",
          birthdate: "1980-04-03",
          cnh: "58150274840",
          cnh_type: "E",
          cpf: "67022186057",
          active: true
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
          // commit("UPDATE_NEW_DRIVER_TO_LIST", data);
          commit("SET_SUCCESS_MESSAGE", "Registro inserido.");
          resolve(data);
        });
      });
    },
    removeDriver({ commit }, payload) {
      commit("CLEAN_MESSAGES");
      return new Promise((resolve, reject) => {
        db.update(
          { _id: payload },
          { $set: { active: false } },
          {},
          (err, data) => {
            if (err !== null) {
              commit("SET_ERROR_MESSAGE", "Erro ao remover registro.");
            }
            commit("UPDATE_DRIVERS_LIST", payload);
            commit(
              "SET_SUCCESS_MESSAGE",
              `Registro de ID ${payload} inativado.`
            );
          }
        );
      });
    }
  },
  getters: {
    drivers: state => {
      return state.drivers.filter(driver => driver.active);
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
