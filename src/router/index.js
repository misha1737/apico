import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Authentication from "../views/Authentication.vue";
import AddProduct from "../views/AddProduct.vue";
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
  {
    path: "/addProduct",
    name: "AddProduct",
    component: AddProduct,
  },

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
