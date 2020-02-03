import Vue from "vue";
import VueRouter from "vue-router";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import Main from "../components/Main.vue";
import AddProduct from "../components/AddProduct.vue";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";

Vue.use(VueMaterial);
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
