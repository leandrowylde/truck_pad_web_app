import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import NewDriver from "../views/NewDriver.vue";
import Drivers from "../views/Drivers.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/drivers/new",
    name: "Cadastrar Novo Motorista",
    component: NewDriver
  },
  {
    path: "/drivers",
    name: "Motoristas cadastrados",
    component: Drivers
  }
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
});

export default router;
