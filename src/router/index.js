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
    if (localStorage.getItem("token") && to.path === "/") {
      next()
    } else if (localStorage.getItem("token")) {
      next({ path: "/" })
    } else if (to.path !== "/auth") {
      next({ path: "/auth" })
    } else {
      next()
    }
  })

  return router
}
