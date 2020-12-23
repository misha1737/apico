import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Authentication from "../views/Authentication.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/authentication",
    name: "Authentication",
    component: Authentication,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
