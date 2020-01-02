import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: "",
    user: ""
  },
  getters: {},
  mutations: {},
  actions: {
    checkAuthToken() {},
    authorization({}, { phoneNumber, password }) {
      axios
        .post("https://td-prod.doctis.ru:664/api/Account/Authorization", {
          phoneNumber,
          password
        })
        .then(res => console.log(res))
    }
  }
})
