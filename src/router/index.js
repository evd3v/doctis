import Vue from "vue"
import Router from "vue-router"
import store from "../store"

Vue.use(Router)

export default function generateRouter() {
  const routes = [
    {
      path: "/",
      name: "admin",
      component: () => import("../views/Admin.vue")
    },
    {
      path: "/auth",
      name: "auth",
      component: () => import("../views/Auth.vue")
    }
  ]

  const router = new Router({
    mode: "history",
    routes: [...routes]
  })

  router.beforeEach((to, from, next) => {
    if (!store.getters.getToken) {
      next({ name: "auth" })
    } else if (to.path !== "/") {
      next({ name: "admin" })
    } else {
      next()
    }
  })

  return router
}
