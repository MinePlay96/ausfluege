import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Ausflüge",
    component: Home
  }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

export default router;
