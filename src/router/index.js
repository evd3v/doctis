import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)

export default function generateRouter() {
  const routes = [
    {
      path: "/auth",
      name: "auth",
      component: () => import("../views/Auth.vue")
    }
  ]

  return new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [...routes]
  })
}
