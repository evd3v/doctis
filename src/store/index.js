import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("token") || "",
    role: localStorage.getItem("role") || "",
    error: "",
    admin: {},
    patients: []
  },
  getters: {
    getError(state) {
      return state.error
    },
    getToken(state) {
      return state.token
    },
    getAdmin(state) {
      return state.admin
    },
    getPatients(state) {
      return state.patients
    }
  },
  mutations: {
    setError(state, msg) {
      state.error = msg
    },
    clearError(state) {
      state.error = ""
    },
    setAdmin(state, data) {
      state.admin = data
    },
    setPatients(state, data) {
      state.patients = data
    }
  },
  actions: {
    checkAuthToken() {},
    async authorization({ commit, dispatch }, { vm, phoneNumber, password }) {
      await axios
        .post("https://td-prod.doctis.ru:664/api/Account/Authorization", {
          phoneNumber,
          password
        })
        .then(res => {
          localStorage.setItem("token", res.data.token)
          localStorage.setItem("role", res.data.role)
          dispatch("showToast", { vm, msg: "Вход произведен успешно" })
        })
        .catch(e => {
          commit("setError", e.response.data)
          dispatch("showToast", { vm })
          commit("clearError")
        })
    },
    async fetchAdminProfile({ commit }) {
      await axios
        .get("https://td-prod.doctis.ru:664/api/Admin/AdminProfile", {
          headers: {
            authorization: `Bearer ${this.state.token}`
          }
        })
        .then(res => {
          commit("setAdmin", res.data)
        })
        .catch(e => {})
    },
    async fetchPatients({ commit }) {
      await axios
        .get("https://td-prod.doctis.ru:664/api/Admin/Patients", {
          headers: {
            authorization: `Bearer ${this.state.token}`
          }
        })
        .then(res => {
          commit("setPatients", res.data)
        })
        .catch(e => {})
    },
    showToast({}, { vm, msg }) {
      console.log(vm)
      vm.$bvToast.toast(this.state.error ? this.state.error : msg, {
        title: this.state.error ? "Ошибка" : "Успех",
        autoHideDelay: 5000,
        variant: this.state.error ? "warning" : "success"
      })
    }
  }
})
