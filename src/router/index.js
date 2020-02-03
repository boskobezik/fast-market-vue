import Vue from "vue";
import VueRouter from "vue-router";
import AddProduct from "../components/AddProduct.vue";
import Register from "../components/Register.vue";
import Login from "../components/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/register",
    name: "register",
    component: Register
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/addproduct",
    name: "addproduct",
    component: AddProduct
  }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

export default router;
