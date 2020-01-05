import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"
import router from "../router"

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
    setToken(state, token) {
      state.token = token
    },
    setRole(state, role) {
      state.role = role
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
    authorization({ commit, dispatch }, { vm, phoneNumber, password }) {
      return axios
        .post("https://td-prod.doctis.ru:664/api/Account/Authorization", {
          phoneNumber,
          password
        })
        .then(res => {
          localStorage.setItem("token", res.data.token)
          localStorage.setItem("role", res.data.role)
          commit("setToken", res.data.token)
          commit("setRole", res.data.role)
          dispatch("showToast", { vm, msg: "Вход произведен успешно" })
        })
        .catch(e => {
          commit("setError", e.response.data)
          dispatch("showToast", { vm })
          commit("clearError")
        })
    },
    async registration({ commit, dispatch }, { vm, data }) {
      await axios
        .post("https://td-prod.doctis.ru:664/api/Account/Registration", data, {
          headers: {
            Accept: "*/*"
          }
        })
        .then(() => {
          dispatch("showToast", {
            vm,
            msg: `Пользователь ${data.lastName} ${data.firstName} успешно зарегистрирован`
          })
        })
        .catch(e => {
          commit("setError", e.response.data)
          dispatch("showToast", { vm })
          commit("clearError")
        })
    },
    logout({ commit }) {
      localStorage.removeItem("token")
      localStorage.removeItem("role")
      commit("setToken", "")
      commit("setRole", "")
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
