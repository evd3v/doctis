import Vue from "vue"
import App from "./App.vue"
import router from "./router/index"
import store from "@/store"
import BootstrapVue from "bootstrap-vue"
import "./assets/styles/main.scss"
import { library } from "@fortawesome/fontawesome-svg-core"
import Vuelidate from "vuelidate"
import VueCropper from "vue-cropperjs"
import Loading from "vue-loading-overlay"
import "cropperjs/dist/cropper.css"
import "vue-loading-overlay/dist/vue-loading.css"
import {
  faLongArrowAltLeft,
  faPlus,
  faChevronDown,
  faCheck
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

library.add(faLongArrowAltLeft, faPlus, faChevronDown, faCheck)
Vue.component("font-awesome-icon", FontAwesomeIcon)
Vue.component("vue-cropper", VueCropper)

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(Vuelidate)
Vue.use(Loading)

new Vue({
  store,
  router: router(),
  render: h => h(App)
}).$mount("#app")
