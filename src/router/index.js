import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import AddProduct from "../components/AddProduct.vue";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";

Vue.use(VueMaterial);

Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "home",
    component: Home
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