import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../components/Main.vue";
import AddProduct from "../components/AddProduct.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "main",
    component: Main
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
