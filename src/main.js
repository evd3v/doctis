import Vue from "vue"
import App from "./App.vue"
import router from "./router/index"
import store from "@/store"
import BootstrapVue from "bootstrap-vue"
import "./assets/styles/main.scss"

Vue.config.productionTip = false

Vue.use(BootstrapVue)

new Vue({
  store,
  router: router(),
  render: h => h(App)
}).$mount("#app")
